from .base import *

# BASE_NAME and BASE_DOMAIN are intentionally unset
# They are only needed to seed data in staging and local
BASE_URL = "http://example.com"

TEST = True

DEBUG = True

SECRET_KEY = 'test'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'voterengagement_test',
    }
}

LOGGING['loggers']['backend']['level'] = 'DEBUG'
