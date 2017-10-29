from django.conf import settings
from django.contrib.staticfiles.views import serve


def index(request):
    return serve(request, 'index.html', settings.STATIC_ROOT)
