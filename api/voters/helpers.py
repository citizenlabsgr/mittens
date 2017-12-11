import logging

import requests


REGISTRATION_API = "https://4gw9vvs9j1.execute-api.us-east-2.amazonaws.com/prod/checkRegistration"


def fetch_and_update_registration(voter, status):
    payload = {
        'firstName': voter.first_name,
        'lastName': voter.last_name,
        'birthMonth': voter.birth_month,
        'birthYear': voter.birth_year,
        'zip': voter.zip_code,
    }

    response = requests.get(REGISTRATION_API, params=payload)
    assert response.status_code == 200, response

    data = response.json()
    logging.info(f"Voter registration data: {data}")
    status.registered = data['registered']
