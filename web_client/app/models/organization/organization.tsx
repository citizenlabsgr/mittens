import { observable, computed, action } from 'mobx';
import { OrganizationService, IncomingOrganizationJSON } from './organization-service';
import { camelCaseObject } from '../helpers';
import { Store } from 'models/store/store';


export class Organization {
  static store = new Store(Organization)
  id: string
  @observable name: string
  @observable plan: string
  @observable permissions: string[]

  static get index() {
    return this.store.index();
  }

  static create(name: string, plan: string, token: string) {
    return OrganizationService.create(name, plan, token).then(
      json => Organization.store.upsert(json)
    );
  }

  static list() {
    return OrganizationService.list().then(jsons => {
      return Organization.store.upsertList(jsons);
    });
  }

  static fetch(id: string) {
    return OrganizationService.get(id).then(json => this.store.upsert(json));
  }

  static get(id: string) {
    return this.store.get(id)
  }

  constructor(json: IncomingOrganizationJSON) {
    this.updateFromFetch(json);
  }

  @action
  updateFromFetch(json: IncomingOrganizationJSON) {
    Object.assign(this, camelCaseObject(json));
  }

  may_i(action: string) {
    return this.permissions.indexOf(action) >= 0;
  }
}
