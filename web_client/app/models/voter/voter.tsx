import { observable, computed, action } from 'mobx';
import { VoterService, IncomingRegistrationJSON } from './voter-service';

export class Voter {
  @observable registered: boolean

  @action
  checkRegistration(firstName: string, lastName: string, birthMonth: string, birthYear: string, zip: string) {
    return VoterService.checkRegistration(firstName, lastName, birthMonth, birthYear, zip).then(
      result => Object.assign(this, result)
    );
  }
}
