import pprint

from django.core.mail import EmailMessage

import log
from rest_framework.reverse import reverse
from sesame.utils import get_query_string


def send_login_email(user, request, *, welcome):
    assert user.email, f"User has no email: {user}"

    base = reverse('redirector', args=["login"], request=request)
    token = get_query_string(user)
    url = base + token

    message = EmailMessage(
        subject=None,
        from_email="Citizen Labs <noreply@citizenlabs.org>",
        to=[user.email],
    )
    if welcome:
        message.template_id = 'welcome-placeholder'
    else:
        message.template_id = 'greetings-placeholder'
    message.merge_global_data = {
        'LOGIN_URL': url,
    }

    log.debug(f"Sending email: {prettify(message.__dict__)}")
    count = message.send(fail_silently=False)

    return count


def prettify(data: dict):
    return "{\n " + pprint.pformat(data, indent=2)[1:-1] + ",\n}"
