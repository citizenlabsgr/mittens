import os

CONFIG_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROJECT_ROOT = os.path.dirname(os.path.dirname(CONFIG_ROOT))

###############################################################################
# Core

INSTALLED_APPS = [
    'grappelli',

    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'whitenoise.runserver_nostatic',
    'django.contrib.staticfiles',
    'django.contrib.postgres',
    'django.contrib.sites',

    'api.api',
    'api.ballots',
    'api.core',
    'api.elections',
    'api.voters',

    'rest_framework',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'sesame.middleware.AuthenticationMiddleware',
    'rollbar.contrib.django.middleware.RollbarNotifierMiddleware',
]

ROOT_URLCONF = 'api.config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': ['templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
            ],
            'string_if_invalid': "(missing: %s)",
        },
    },
]

WSGI_APPLICATION = 'api.config.wsgi.application'

SITE_ID = 1

###############################################################################
# Internationalization

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'US/Michigan'

USE_I18N = True

USE_L10N = True

USE_TZ = True

###############################################################################
# Static files

STATIC_URL = '/static/'

STATIC_ROOT = os.path.join(PROJECT_ROOT, 'staticfiles')
BUILD_ROOT = os.path.join(PROJECT_ROOT, 'web_client', 'build')

STATICFILES_DIRS = [BUILD_ROOT]

###############################################################################
# Logging

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,

    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': 'INFO',
        },
        'api': {
            'handlers': ['console'],
            'level': 'INFO',
        },
    },

    'handlers': {
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'simple',
        },
    },

    'formatters': {
        'simple': {
            'format': '%(levelname)s: %(name)s: %(message)s'
        },
    },
}

###############################################################################
# Authentication

AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
    'sesame.backends.ModelBackend',
]

###############################################################################
# Email

EMAIL_HOST = 'smtp.sendgrid.net'
EMAIL_HOST_USER = os.getenv('SENDGRID_USERNAME')
EMAIL_HOST_PASSWORD = os.getenv('SENDGRID_PASSWORD')
EMAIL_PORT = 587
EMAIL_USE_TLS = True

###############################################################################
# Grappelli

GRAPPELLI_ADMIN_TITLE = "Voter Engagement Administration"

###############################################################################
# Django REST Framework

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_PAGINATION_CLASS':
        'rest_framework.pagination.LimitOffsetPagination',
}
