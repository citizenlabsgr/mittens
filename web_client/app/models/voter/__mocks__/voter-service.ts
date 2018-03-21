import { IncomingRegistrationJSON, IncomingVoterJSON } from '../voter-service';


const mockVoter: IncomingVoterJSON = {
  id: 56,
  first_name: "Susan",
  last_name: "Anthony",
  birth_date: "1820-02-15",
  zip_code: "49506",
  email: "susan@suffrage.org",
  registered: true
}

export const VoterService = new class {
  checkRegistration(
      firstName: string,
      lastName: string,
      birthDate: string,
      zip: string): Promise<IncomingRegistrationJSON> {
    return Promise.resolve({ registered: true })
  }

  signUp(
    email: string,
    firstName: string,
    lastName: string,
    birthDate: string,
    zip: string): Promise<IncomingVoterJSON> {
    return Promise.resolve(mockVoter);
  }

  me(): Promise<IncomingVoterJSON> {
    return Promise.resolve(mockVoter);
  }
}
