from django.core.mail import EmailMessage
from django.core.management.base import BaseCommand

from api.core.helpers import get_unsubscribe_url, prettify
from api.voters.models import Voter


class Command(BaseCommand):
    help = "Send reminder emails for an upcoming election"

    # TODO: Require an election ID to continue
    def add_arguments(self, parser):
        parser.add_argument(
            '--dry-run',
            action='store_true',
        )

    def handle(self, *, dry_run, **_):  # pylint: disable=arguments-differ
        site_url = "https://vote.citizenlabs.org"

        for voter in Voter.objects.filter_approved_emails():

            message = EmailMessage(
                # TODO: Use the election name from the database
                subject="Reminder to Vote",
                from_email="Citizen Labs <noreply@citizenlabs.org>",
                to=[voter.user.email],
            )
            message.template_id = 'voter-engagement-election_reminder'
            message.merge_global_data = {
                # TODO: Use the election information from the database
                'FIRST_NAME': voter.user.first_name,
                'LAST_NAME': voter.user.last_name,
                'SITE_URL': site_url,
                'UNSUBSCRIBE_URL': site_url + get_unsubscribe_url(None, voter.user),
                'ABOUT_URL': 'https://citizenlabs.org/about/',
            }

            if dry_run:
                self.stdout.write(prettify(message.__dict__))
            else:
                message.send(fail_silently=False)
