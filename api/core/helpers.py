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

    if welcome:
        subject = "Welcome to Voter Engagement"
    else:
        subject = "Greetings from Voter Engagement"

    message = EmailMessage(
        subject=subject,
        from_email="Citizen Labs <noreply@citizenlabs.org>",
        to=[user.email],
    )

    if welcome:
        message.template_id = 'voter-engagement-legacy-welcome'
    else:
        message.template_id = 'voter-engagement-legacy-login'

    message.merge_global_data = {
        'FIRST_NAME': user.first_name,
        'LAST_NAME': user.last_name,
        'LOGIN_URL': url,
    }

    log.debug(f"Sending email: {prettify(message.__dict__)}")
    count = message.send(fail_silently=False)

    return count


def prettify(data: dict):
    return "{\n " + pprint.pformat(data, indent=2)[1:-1] + ",\n}"
