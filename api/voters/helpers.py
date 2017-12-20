import pprint
import logging

import requests

from api.elections.models import County, City, Ward


REGISTRATION_API = "https://4gw9vvs9j1.execute-api.us-east-2.amazonaws.com/prod/checkRegistration"


log = logging.getLogger(__name__)


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
    formatted_data = pprint.pformat(data)
    log.info(f"Voter registration data:\n{formatted_data}")

    _find_county(data)
    _find_city(data)
    _find_ward(data)

    status.registered = data['registered']


def _find_county(data):
    value = data['county']
    name = value.replace(" County", "")
    try:
        County.objects.get(name=name)
    except County.DoesNotExist:
        log.error(f"No such county: {name} ({value})")


def _find_city(data):
    value = data['jurisdiction']
    name = value.replace("City of ", "")
    try:
        City.objects.get(name=name)
    except City.DoesNotExist:
        log.error(f"No such city: {name} ({value})")


def _find_ward(data):
    value = data['ward']
    name = value
    try:
        Ward.objects.get(name=name)
    except Ward.DoesNotExist:
        log.error(f"No such ward: {name} ({value})")
