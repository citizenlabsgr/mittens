import os

CONFIG_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROJECT_ROOT = os.path.dirname(os.path.dirname(CONFIG_ROOT))

###############################################################################
# Core

INSTALLED_APPS = [
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
    'api.core',
    'api.ui',

    # 'allauth',
    # 'allauth.account',
    'rest_framework',
    # 'rest_framework.authtoken',
    # 'rest_auth',
    # 'rest_auth.registration',
    # 'rest_framework_swagger',
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
    'formatters': {
        'simple': {
            'format': '%(levelname)s: %(message)s'
        },
    },
    'handlers': {
        'console': {
            'level': 'INFO',
            'class': 'logging.StreamHandler',
            'formatter': 'simple',
        },
    },
    'loggers': {
        'django': {
            'handlers':['console'],
            'level':'DEBUG',
        },
        'api': {
            'handlers': ['console'],
            'level': 'DEBUG',
        },
    }
}

###############################################################################
# Django REST Framework

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_PAGINATION_CLASS':
        'rest_framework.pagination.LimitOffsetPagination',
}
