import { apiPath, michiganElectionsApiPath } from 'infrastructure/environments/current';
import { go } from 'infrastructure/router';
import * as Cookies from 'js-cookie';

const csrfToken = Cookies.get('csrftoken');

export class API {
  // Need to set which api url we're going for
  consumerMemo: ActionCable.Cable
  defaultHeaders = {
    'Content-Type': 'application/json',
    'X-CSRFToken': csrfToken
  }

  authHeaders = {
    credentials: 'include'
  }

  constructor(public apiURL: string, public useAuth=false) { }

  fetch(method: string, url: string, body?: {}, headers = {}) {
    let request: {method: string, headers: {}, credentials?: string, body?: string} = {
      method,
      headers: Object.assign({}, this.defaultHeaders, headers),
      ...(this.useAuth && this.authHeaders)
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
        if (response.status > 299) {
          return response.json().then(e => {throw e})
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

export default new API(apiPath, true);
export const MichiganElectionsAPI = new API(michiganElectionsApiPath);
