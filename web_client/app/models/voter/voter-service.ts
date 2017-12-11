import API from 'api/api';

export interface IncomingRegistrationJSON {
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
}