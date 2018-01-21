import os

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
# Email

DEFAULT_FROM_EMAIL = f"Voter Engagement {BASE_NAME} <noreply@{BASE_DOMAIN}>"

###############################################################################
# Logging

LOGGING['handlers']['rollbar']['environment'] = os.getenv('ROLLBAR_ENVIRONMENT', 'staging')

###############################################################################
# Rollbar

ROLLBAR['environment'] = os.getenv('ROLLBAR_ENVIRONMENT', 'staging')
