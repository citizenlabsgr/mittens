import API from 'api/api';

export interface IncomingRegistrationJSON {
  registered: boolean
}

export const VoterService = new class {
  checkRegistration(firstName: string, lastName: string, birthMonth: string, birthYear: string, zip: string): Promise<IncomingRegistrationJSON> {
    return fetch(
      'https://4gw9vvs9j1.execute-api.us-east-2.amazonaws.com/prod/checkRegistration' + 
      `?firstName=${firstName}&lastName=${lastName}&birthMonth=${birthMonth}&birthYear=${birthYear}&zip=${zip}`, { method: 'GET' }
    ).then(response => response.json()).then((response: { errors?: any }) => {
      if (response.errors)
        throw response.errors;
      console.log(response);
      return response as IncomingRegistrationJSON;
    });
  }
}()