import { observable, computed, action } from 'mobx';
import { VoterService, IncomingRegistrationJSON, IncomingVoterJSON } from './voter-service';
import { spyOnUser } from 'infrastructure/fullstory/fullstory';
import { camelCaseObject } from '../helpers';

export class Voter {
  @observable firstName: string
  @observable lastName: string
  @observable birthDate: Date
  @observable zipCode: string
  @observable registered: boolean
  @observable email: string
  @observable signedUp: boolean = false;
  @observable votedBefore: boolean;
  static currentUserStore: CurrentUserStore;

  @action
  static reset() {
    this.currentUserStore = new CurrentUserStore();
  }

  @action
  static fetchMe() {
    // If we've already fetched current user, don't refetch.
    if (this.currentUserStore.fetched) return Promise.resolve(this.currentUser);
    return VoterService.me().then(json => {
      this.currentUser.updateFromFetch(json);
      this.currentUser.signedUp = true;
      // Two requests here until the API stores registration status in db
      return this.currentUser.checkRegistration().then(() => {
        this.currentUserStore.fetched = true;
        this.currentUser.registerSpy();
        return this.currentUser;
      })
    })
  }

  @action
  checkRegistration() {
    return VoterService.checkRegistration(this.firstName, this.lastName, this.birthDateAsString(), this.zipCode).then(
      result => {
        this.registered = result.registered;
        Voter.currentUserStore.fetched = true;
        return this.registered;
      }
    );
  }

  signUp() {
    return VoterService.signUp(this.email, this.firstName, this.lastName, this.birthDateAsString(), this.zipCode).then(
      result => {
        this.signedUp = true;
        this.registerSpy();
        this.updateFromFetch(result);
        return this.registered;
      }
    );
  }

  birthDateAsString() {
    if (!this.birthDate) return "";
    return this.birthDate.toISOString().slice(0, 10);
  }

  @computed
  static get currentUser() {
    return this.currentUserStore.currentUser;
  }

  @action
  updateFromFetch(json: IncomingVoterJSON) {
    Object.assign(this, camelCaseObject(json));
    if (json.birth_date) {
      this.birthDate = new Date(json.birth_date);
    }
  }

  @action
  registerSpy() {
    spyOnUser(this.email, { displayName: `${this.firstName} ${this.lastName}`, email: this.email });
  }

  registrationInputData() {
    var options = { year: 'numeric', month: 'short', day: 'numeric' };
    return `${this.firstName} ${this.lastName}
Born: ${this.birthDate.toLocaleString("en-us", options)}
Zip: ${this.zipCode}`;
  }
}

// Mobx interacts poorly with static variables, so we store our statics as
// instance variables in a singleton.
class CurrentUserStore {
  @observable fetched = false;
  @observable currentUser = new Voter();
}

Voter.reset();
