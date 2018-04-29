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

    # TODO: Convert this to an email template
    if welcome:
        subject = "Welcome to Voter Engagement"
    else:
        subject = "Greetings from Voter Engagement"
    body = f"Click here to log in: {url}"
    email = EmailMessage(
        subject=subject,
        body=body,
        from_email="Citizen Labs <noreply@citizenlabs.org>",
        to=[user.email],
    )

    log.debug(f"Sending email: {prettify(email.__dict__)}")
    count = email.send(fail_silently=False)

    return count


def prettify(data: dict):
    return "{\n " + pprint.pformat(data, indent=2)[1:-1] + ",\n}"
