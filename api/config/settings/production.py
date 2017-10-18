import os

import dj_database_url
# import rollbar

from .base import *

# BASE_NAME and BASE_DOMAIN are intentionally unset
# They are only needed to seed data in staging and local
BASE_URL = "https://voterengagement.com"

###############################################################################
# Core

SECRET_KEY = os.environ['SECRET_KEY']

ALLOWED_HOSTS = [
    '127.0.0.1',
    'localhost',
    '.voterengagement.com',
]

###############################################################################
# Static files

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

###############################################################################
# Database

DATABASES = {}
DATABASES['default'] = dj_database_url.config()
