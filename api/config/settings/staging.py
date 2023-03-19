import os

import bugsnag

from .production import *


BASE_NAME = os.environ['HEROKU_APP_NAME']
BASE_DOMAIN = f"{BASE_NAME}.herokuapp.com"
BASE_URL = f"https://{BASE_DOMAIN}"

###############################################################################
# Core

ALLOWED_HOSTS += [
    '.herokuapp.com',
]

###############################################################################
# Bugsnag

bugsnag.configure(release_stage='staging')

###############################################################################
# Ballot Buddies

PROVISION_VOTER_API = "https://staging-app.michiganelections.io/api/provision-voter/"
PROVISION_VOTER_REFERRER = "SmFjZUJyb3duaW5nNDk1MDM"
