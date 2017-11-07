import dj_database_url

from .base import *

BASE_NAME = BASE_DOMAIN = "localhost"
BASE_URL = f"http://{BASE_DOMAIN}:8000"

DEBUG = True

SECRET_KEY = 'dev'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'voterengagement_dev',
    },
    'remote': dj_database_url.config(),
}

AUTH_PASSWORD_VALIDATORS = []

DEFAULT_FROM_EMAIL = f"Voter Engagement {BASE_NAME} <noreply@{BASE_DOMAIN}>"
