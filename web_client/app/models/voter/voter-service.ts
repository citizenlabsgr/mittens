import API from 'api/api';

export interface IncomingRegistrationJSON {
  registered: boolean
}

export interface IncomingVoterJSON {
  id: number,
  first_name: string,
  last_name: string,
  birth_date: string,
  zip_code: string,
  email: string
  registered: boolean
}

export const VoterService = new class {
  checkRegistration(
      firstName: string,
      lastName: string,
      birthDate: string,
      zip: string): Promise<IncomingRegistrationJSON> {
    return API.get(`registration/?first_name=${firstName}&last_name=${lastName}&birth_date=${birthDate}&zip_code=${zip}`);
  }

  signUp(
    email: string,
    firstName: string,
    lastName: string,
    birthDate: string,
    zip: string): Promise<IncomingVoterJSON> {
    return API.post('voters/', {
      email: email,
      first_name: firstName,
      last_name: lastName,
      birth_date: birthDate,
      zip_code: zip,
    });
  }

  me(): Promise<IncomingVoterJSON> {
    return API.get('voters/');
  }
}
