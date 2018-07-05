import random
from contextlib import suppress

from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.sites.models import Site
from django.core.management.base import BaseCommand
from django.db.utils import IntegrityError

from faker import Faker

from api.elections.models import Election
from api.voters.models import Status, Voter


User = get_user_model()
fake = Faker()


def p(value):
    return value > random.random()


class Command(BaseCommand):
    help = "Generate data for automated testing and manual review"

    def add_arguments(self, parser):
        parser.add_argument(
            'emails',
            nargs='?',
            type=lambda value: value.split(','),
            default=[],
        )

    def handle(self, *, emails, **_options):  # pylint: disable=arguments-differ
        self.update_site()
        admin = self.get_or_create_superuser()
        users = [self.get_or_create_user(email) for email in emails]
        self.generate_review_data(admin, *users)

    def update_site(self):
        site = Site.objects.get(id=1)
        site.name = f"Voter Engagement {settings.BASE_NAME}"
        site.domain = settings.BASE_DOMAIN
        site.save()
        self.stdout.write(f"Updated site: {site}")

    def get_or_create_superuser(self, username="admin", password="password"):
        try:
            user = User.objects.create_superuser(
                username=username,
                email=f"{username}@{settings.BASE_DOMAIN}",
                password=password,
            )
            self.stdout.write(f"Created new superuser: {user}")
        except IntegrityError:
            user = User.objects.get(username=username)
            self.stdout.write(f"Found existing superuser: {user}")

        return user

    def get_or_create_user(self, base_email, password="password"):
        username, email_domain = base_email.split('@')

        user, created = User.objects.get_or_create(username=username)
        user.email = f"{username}+{settings.BASE_NAME}@{email_domain}"
        user.set_password(password)
        user.save()

        if created:
            self.stdout.write(f"Created new user: {user}")
        else:
            self.stdout.write(f"Update user: {user}")

        return user

    def generate_review_data(self, *_users):
        while User.objects.count() < 10:
            with suppress(IntegrityError):
                username = fake.name().replace(' ', '')
                user = User.objects.create(
                    username=username.lower() if p(0.30) else username,
                    email=fake.email(),
                    first_name=fake.first_name(),
                    last_name=fake.last_name(),
                )
                self.stdout.write(f"Created user: {user}")

        while Election.objects.count() < 5:
            with suppress(IntegrityError):
                name, date = self.fake_election()
                election = Election.objects.create(
                    name=name,
                    date=date,
                )
                self.stdout.write(f"Created election: {election}")

        while Voter.objects.count() < 50:
            with suppress(IntegrityError):
                voter = Voter.objects.create(
                    first_name=fake.first_name(),
                    last_name=fake.last_name(),
                    birth_date=fake.date(),
                    zip_code=fake.zipcode(),

                    email=fake.email(),
                )
                self.stdout.write(f"Created voter: {voter}")

        while Status.objects.count() < 50:
            with suppress(IntegrityError):
                status = Status.objects.create(
                    voter=self.random_voter(),
                    election=self.random_election(),

                    registered=True if p(0.90) else None,
                    read_sample_ballot=True if p(0.80) else None,
                    located_polling_location=True if p(0.70) else None,
                    voted=True if p(0.60) else None,
                )
                self.stdout.write(f"Created status: {status}")

    @staticmethod
    def fake_election():
        date = fake.future_date(end_date="+2y")
        kind = random.choice(["General", "Midterm", "Special"])
        return f"{date.year} {kind} Election", date

    @staticmethod
    def random_voter():
        return random.choice(Voter.objects.all())

    @staticmethod
    def random_election():
        return random.choice(Election.objects.all())
