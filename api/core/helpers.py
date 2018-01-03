import pprint
import logging

from django.core.mail import EmailMessage

from rest_framework.reverse import reverse
from sesame.utils import get_query_string


log = logging.getLogger(__name__)


def send_login_email(user, request):
    assert user.email, f"User has no email: {user}"

    base = reverse('redirector', args=["api/registration"], request=request)
    token = get_query_string(user)
    url = base + token

    email = EmailMessage(
        subject="Welcome to Voter Engagement",
        body=f"Click me: {url}",
        from_email="Voter Engagement <noreply@vote.citizenlabs.org>",
        to=[user.email],
    )

    log.debug(f"Sending email: {prettify(email.__dict__)}")
    count = email.send(fail_silently=False)

    return count


def prettify(data: dict):
    return "{\n " + pprint.pformat(data, indent=2)[1:-1] + ",\n}"
