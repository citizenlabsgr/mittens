import os

import bugsnag
import dj_database_url

from .base import *


BASE_NAME = BASE_DOMAIN = "localhost"
BASE_URL = f"http://{BASE_DOMAIN}:8000"

###############################################################################
# Core

DEBUG = True

SECRET_KEY = 'dev'

INSTALLED_APPS += ['django_extensions']

###############################################################################
# Logging

LOGGING['loggers']['api']['level'] = os.getenv('LOG_LEVEL', 'INFO')

###############################################################################
# Databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'voterengagement_dev',
    },
    'remote': dj_database_url.config(),
}

###############################################################################
# Authentication

AUTH_PASSWORD_VALIDATORS = []

###############################################################################
# Email

if not os.getenv('MANDRILL_API_KEY'):
    EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

###############################################################################
# Bugsnag

bugsnag.configure(release_stage='local')
