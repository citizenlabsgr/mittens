import requests
import log

from api.core.helpers import prettify
from api.elections.models import Kind, Region


REGISTRATION_API = "https://4gw9vvs9j1.execute-api.us-east-2.amazonaws.com/prod/checkRegistration"
MISSING = "<missing>"


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
    log.info(f"Voter registration data: {prettify(data)}")

    status.registered = data.pop('registered')

    _find_precinct(data)
    _find_ward(data)
    _find_regions(data)


def _find_precinct(data):
    jurisdiction = data.get('jurisdiction')
    ward = data.get('ward')
    precinct = data.pop('precinct', None)

    if not (jurisdiction and ward and precinct):
        log.warning(f"Unable to build precinct: {prettify(data)}")
        return

    name = f"{jurisdiction}, Ward {ward}, Precinct {precinct}"
    _get_region('Precinct', name)


def _find_ward(data):
    jurisdiction = data.get('jurisdiction')
    ward = data.pop('ward', None)

    if not (jurisdiction and ward):
        log.warning(f"Unable to build ward: {prettify(data)}")
        return

    name = f"{jurisdiction}, Ward {ward}"
    _get_region('Ward', name)


def _find_regions(data):
    for key, value in data.items():
        kind_name = key.replace('_', ' ').strip()
        region_name = value.strip()
        if kind_name and region_name:
            _get_region(kind_name, region_name)


def _get_region(kind_name, region_name):
    kind = Kind.objects.get(name__iexact=kind_name)
    region, created = Region.objects.get_or_create(
        kind=kind,
        name=region_name,
    )
    if created:
        log.info(f"Added new region: {region}")
    if not region.verified:
        log.warning(f"Unverified region: {region}")
    return region
