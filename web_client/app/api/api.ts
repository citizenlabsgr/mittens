import { merge } from 'lodash';
import { apiPath } from 'environments/current';
import { go } from 'router';
import * as ActionCable from 'actioncable';
import { cablePath } from 'environments/current';
const uuid = require('uuid/v4') as () => string;

class API {
  // Need to set which api url we're going for
  apiURL = apiPath
  consumerMemo: ActionCable.Cable
  defaultHeaders = {
    'Content-Type': 'application/json'
  }
  memoAuthHeaders: {
    uid: string,
    client: string
    'access-token': string
    expiry: string
  }

  constructor() {
    this.loadAuthHeaders();
  }

  // If true, you're already logged in, go ahead and make requests.
  loggedIn() {
    let expiry = this.memoAuthHeaders ? this.memoAuthHeaders.expiry : "0";
    const loggedIn = expiry && parseInt(expiry) > Date.now() / 1000;
    return loggedIn;
  }

  fetch(method: string, url: string, body?: {}, headers = {}) {
    let request: RequestInit = {
      method,
      headers: merge({}, this.defaultHeaders, headers)
    };
    if (method != 'GET' && body) {
      request.body = JSON.stringify(body);
    }
    return fetch(this.apiURL + url, request);
  }

  authFetch(method: string, url: string, body?: {}): Promise<any> {
    return this.fetch(method, url, body, this.getAuthHeaders())
      .then((response: Response) => {
        if (response.status === 401) {
          this.forgetAuthHeaders();
          go('/login');
          return { errors: ["Not a valid email/password combination. Please try again."] };
        } else {
          this.storeAuthHeaders(response.headers);
        }
        if (response.status === 204) {
          return Promise.resolve({});
        }
        return response.json();
      }).then((response: { errors?: any }) => {
        if (response.errors)
          throw response.errors;
        return response;
      })
  }

  get(url: string) {
    return this.authFetch('GET', url);
  }

  post(url: string, data: {}) {
    data['stream_id'] = this.streamId;
    return this.authFetch('POST', url, data);
  }

  put(url: string, data: {}) {
    data['stream_id'] = this.streamId;
    return this.authFetch('PUT', url, data);
  }

  delete(url: string) {
    return this.authFetch('DELETE', url);
  }

  // Login is treated specially because the request is unauthorized
  // but the response has auth headers.
  login(email: string, password: string) {
    return this.authFetch('POST', 'auth/sign_in.json', {
      email: email,
      password: password
    })
  }

  // need method for logout
  logout() {
    this.authFetch('DELETE', 'auth/sign_out.json');
    this.forgetAuthHeaders();
  }

  // need method for storing/replacing current headers.
  storeAuthHeaders(headers: Headers) {
    if (!headers.get('access-token')) return;
    if (!this.memoAuthHeaders) {
      this.loadAuthHeaders();
    }
    if (parseInt(this.memoAuthHeaders.expiry) <
      parseInt(localStorage.getItem('keplerExpiry'))) return;

    this.memoAuthHeaders = {
      uid: headers.get('uid'),
      client: headers.get('client'),
      'access-token': headers.get('access-token'),
      expiry: headers.get('expiry')
    }

    this.setCableUrl();
    this.longStoreAuthHeaders();
  }

  loadAuthHeaders() {
    try {
      this.memoAuthHeaders = {
        uid: localStorage.getItem('keplerUid'),
        client: localStorage.getItem('keplerClient'),
        'access-token': localStorage.getItem('keplerToken'),
        expiry: localStorage.getItem('keplerExpiry')
      }
    } catch (e) {
      console.warn("Unable to load auth data from localStorage.");
    }
  }

  longStoreAuthHeaders() {
    try {
      localStorage.setItem('keplerUid', this.memoAuthHeaders.uid);
      localStorage.setItem('keplerClient', this.memoAuthHeaders.client);
      localStorage.setItem('keplerToken', this.memoAuthHeaders['access-token']);
      localStorage.setItem('keplerExpiry', this.memoAuthHeaders.expiry);
    } catch (e) {
      console.warn("Not storing auth data in localStorage.");
    }
  }

  forgetAuthHeaders() {
    this.memoAuthHeaders = null;
    localStorage.removeItem('keplerUid');
    localStorage.removeItem('keplerClient');
    localStorage.removeItem('keplerToken');
    localStorage.removeItem('keplerExpiry');
  }

  getAuthHeaders() {
    return merge({}, this.defaultHeaders, this.memoAuthHeaders ? {
      'uid': this.memoAuthHeaders['uid'],
      'client': this.memoAuthHeaders['client'],
      'access-token': this.memoAuthHeaders['access-token'],
    } : {});
  }

  // Actioncable stuff; if grows to more than 4 methods, move elsewhere

  // UUID this window of this browser, so that we can safely ignore streaming
  // updates that *we* caused, and so already know about.
  streamId = uuid();

  // There's only one consumer per browser window, though there might be many
  // subscriptions.
  get consumer() {
    if (!this.consumerMemo) {
      this.consumerMemo = ActionCable.createConsumer("");
      this.setCableUrl();
    }
    return this.consumerMemo;
  }

  setCableUrl() {
    if (!this.memoAuthHeaders) return;
    const url = cablePath + `?uid=${this.memoAuthHeaders.uid}&client_id=${this.memoAuthHeaders.client}&token=${this.memoAuthHeaders['access-token']}`;
    this.consumer['url'] = url;
  }

  subscribe(props: any, handlers: ActionCable.CreateMixin) {
    return this.consumer.subscriptions.create(props, handlers);
  }
}

export default new API();
