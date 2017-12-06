import { merge } from 'lodash';
import { apiPath } from 'environments/current';
import { go } from 'router';

class API {
  // Need to set which api url we're going for
  apiURL = apiPath
  consumerMemo: ActionCable.Cable
  defaultHeaders = {
    'Content-Type': 'application/json'
  }

  fetch(method: string, url: string, body?: {}, headers = {}) {
    let request: {method: string, headers: {}, credentials: string, body?: string} = { 
      method,
      headers: Object.assign({}, this.defaultHeaders, headers),
      credentials: 'include'
    };

    if (method != 'GET' && body) {
      request.body = JSON.stringify(body);
    }
    return (fetch as any)(this.apiURL + url, request);
  }

  authFetch(method: string, url: string, body?: {}): Promise<any> {
    return this.fetch(method, url, body)
      .then((response: Response) => {
        if (response.status === 401) {
          go('/login');
          return { errors: ["Not a valid email/password combination. Please try again."] };
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
    return this.authFetch('POST', url, data);
  }

  put(url: string, data: {}) {
    return this.authFetch('PUT', url, data);
  }

  delete(url: string) {
    return this.authFetch('DELETE', url);
  }
}

export default new API();
