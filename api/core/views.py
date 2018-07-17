from django.conf import settings
from django.contrib.auth import login
from django.contrib.staticfiles.views import serve
from django.shortcuts import redirect
from django.views.decorators.cache import never_cache

import log

from api.voters.models import Voter


@never_cache
def index(request):
    return serve(request, 'index.html', settings.STATIC_ROOT)


def redirector(request, path):
    handle_test_login(request)

    if request.user.is_authenticated:
        log.info(f"Authenticated from email: {request.user.email}")
        Voter.objects.confirm_email(user=request.user)
        if 'unsubscribe' in request.GET:
            log.info(f"Unsubscribing: {request.user.email}")
            Voter.objects.unsubscribe_email(user=request.user)
    else:
        log.warning("Failed to authenticate from token")

    url = "/" + path
    log.info(f"Redirecting to: {url}")

    return redirect(url)


def handle_test_login(request):
    if settings.DEBUG and request.GET.get('url_auth_token') == 'test':
        voter = Voter.objects.exclude(user=None).first()
        log.warn(f"Authenticating as test: {voter.email}")
        login(request, voter.user, backend='django.contrib.auth.backends.ModelBackend')
