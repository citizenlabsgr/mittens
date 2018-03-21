import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { Voter } from './voter';
import { VoterService, IncomingVoterJSON, IncomingRegistrationJSON } from './voter-service';


const mockVoter: IncomingVoterJSON = {
  id: 56,
  first_name: "Susan",
  last_name: "Anthony",
  birth_date: "1820-02-15",
  zip_code: "49506",
  email: "susan@suffrage.org"
}

const mockRegistration: IncomingRegistrationJSON = {
  registered: true
}

describe("Voter", () => {
  beforeEach(() => Voter.reset());

  describe("checkRegistration", () => {
    beforeEach(() => {
      const voter = Voter.currentUser;
      voter.firstName = "Susan";
      voter.lastName = "Anthony";
      voter.birthDate = new Date();
      voter.zipCode = "12345";
    })

    it("Sets voter.registered to be true if the API says they're registered", () => {
      expect(2);
      const voter = Voter.currentUser;
      expect(voter.registered).toBeFalsy();
      VoterService.checkRegistration = jest.fn().mockImplementationOnce(() => Promise.resolve({registered: true}));
      return voter.checkRegistration().then(() => {
        expect(voter.registered).toBe(true);
      });
    });

    it("Sets voter.registered to be false if the API says they're unregistered", () => {
      expect(2);
      const voter = Voter.currentUser;
      expect(voter.registered).toBeFalsy();
      VoterService.checkRegistration = jest.fn().mockImplementationOnce(() => Promise.resolve({registered: false}));
      return voter.checkRegistration().then(() => {
        expect(voter.registered).toBe(false);
      });
    });
  });

  describe("signUp", () => {
    beforeEach(() => {
      const voter = Voter.currentUser;
      voter.firstName = "Susan";
      voter.lastName = "Anthony";
      voter.birthDate = new Date();
      voter.zipCode = "12345";
    })

    it("Calls the voter service to sign up", () => {
      expect(2);
      const voter = Voter.currentUser;
      expect(voter.signedUp).toBe(false);
      return voter.signUp().then(() => {
        expect(voter.signedUp).toBe(true);
      });
    });
  });

  describe("signUp", () => {
    it("Calls the voter service to retrieve logged-in user", () => {
      expect(2);
      expect(Voter.currentUser.signedUp).toBe(false);
      return Voter.fetchMe().then(
        (me) => {
          expect(me.firstName).toBe("Susan")
        }
      )
    });
  })

  describe("birthDateAsString", () => {
    it("Returns an ISO date without time or timezone", () => {
      const voter = Voter.currentUser;
      voter.birthDate = new Date("1820-03-15");
      expect(voter.birthDateAsString()).toBe("1820-03-15");
    });
  })

  describe("updateFromFetch", () => {
    it("Assigns incoming data to the voter, switching from snake_case to camelCase", () => {
      const voter = Voter.currentUser;
      voter.firstName = "Susan"
      voter.updateFromFetch({
        id: 56,
        first_name: "Sue",
        last_name: "Anthony",
        birth_date: "1820-02-15",
        zip_code: "49506",
        email: "susan@suffrage.org"
      })
      expect(voter.firstName).toBe("Sue");
    });
  })
});
