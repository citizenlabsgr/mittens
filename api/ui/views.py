from django.conf import settings
from django.contrib.staticfiles.views import serve
from django.views.decorators.cache import never_cache


@never_cache
def index(request):
    return serve(request, 'index.html', settings.STATIC_ROOT)
