import os

from .production import *


BASE_NAME = os.environ['HEROKU_APP_NAME']
BASE_DOMAIN = f"{BASE_NAME}.herokuapp.com"
BASE_URL = f"https://{BASE_DOMAIN}"

ALLOWED_HOSTS += [
    '.herokuapp.com',
]

DEFAULT_FROM_EMAIL = f"Voter Engagement {BASE_NAME} <noreply@{BASE_DOMAIN}>"

ROLLBAR['environment'] = os.getenv('ROLLBAR_ENVIRONMENT', 'staging')
LOGGING['handlers']['rollbar']['environment'] = os.getenv('ROLLBAR_ENVIRONMENT', 'staging')
