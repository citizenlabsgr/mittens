from django.conf import settings
from django.contrib.staticfiles.views import serve
from django.views.decorators.cache import never_cache
from django.shortcuts import redirect

import log


@never_cache
def index(request):
    return serve(request, 'index.html', settings.STATIC_ROOT)


def redirector(request, path):
    if request.user.is_authenticated:
        log.info(f"Authenticated from email: {request.user.email}")
    else:
        log.warning("Failed to authenticate from token")

    url = "/" + path
    log.info(f"Redirecting to: {url}")

    return redirect(url)
