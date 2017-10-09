import { IncomingOrganizationJSON } from '../organization-service';

export const OrganizationService = new class {
  create(name: string, plan: string, token: string) {
    return new Promise<IncomingOrganizationJSON>((resolve) => {
      resolve({ name, plan, id: '5', permissions: ["view"] });
    });
  }

  list() {
    return new Promise<IncomingOrganizationJSON[]>((resolve) => {
      resolve([{ name: 'CLIMATUM', plan: 'team', id: '5', permissions: ["view"] }]);
    });
  }
}()