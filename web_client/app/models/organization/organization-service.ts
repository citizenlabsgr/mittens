import API from 'api/api';

export interface IncomingOrganizationJSON {
  name: string
  plan: string
  id: string
  permissions: string[]
}

export const OrganizationService = new class {
  create(name: string, plan: string, token: string): Promise<IncomingOrganizationJSON> {
    return API.post('organizations', { name: name, plan: plan, stripe_token: token });
  }

  list(): Promise<IncomingOrganizationJSON[]> {
    return API.get('organizations').then(json => json.organizations);
  }

  get(id: string): Promise<IncomingOrganizationJSON> {
    return API.get(`organizations/${id}`);
  }
}()