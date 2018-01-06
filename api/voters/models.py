from django.db import models
from django.contrib.auth.models import User

import arrow

from api.elections.models import Region, Election

from . import helpers


class Identity(models.Model):
    """Data needed to determine MI voter registration status."""

    class Meta:
        abstract = True

    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    birth_date = models.DateField()
    zip_code = models.CharField(max_length=10)

    @property
    def birth_month(self):
        locale = arrow.locales.get_locale('en')
        return locale.month_name(self.birth_date.month)

    @property
    def birth_year(self):
        return self.birth_date.year


class Voter(Identity):

    email = models.EmailField(unique=True)
    user = models.OneToOneField(User, blank=True, null=True,
                                on_delete=models.CASCADE)
    regions = models.ManyToManyField(Region, blank=True)

    def __str__(self):
        return self.name

    @property
    def name(self):
        return f"{self.first_name} {self.last_name}"

    def update_user(self):
        self.user, created = User.objects.get_or_create(email=self.email)
        if created:
            self.user.username = self.email
            self.user.set_unusable_password()
        self.user.first_name = self.first_name
        self.user.last_name = self.last_name
        self.user.save()

    def save(self, *args, **kwargs):  # pylint: disable=arguments-differ
        self.update_user()
        super().save(*args, **kwargs)


class Status(models.Model):

    class Meta:
        verbose_name_plural = "statuses"

    voter = models.ForeignKey(Voter, on_delete=models.CASCADE)
    election = models.ForeignKey(Election, on_delete=models.CASCADE)

    registered = models.NullBooleanField()
    read_sample_ballot = models.NullBooleanField()
    located_polling_location = models.NullBooleanField()
    voted = models.NullBooleanField()

    def __str__(self):
        return f"{self.election}: {self.voter}"

    @property
    def progress(self):
        return [
            ("Registered", self.registered),
            ("Read Sample Ballot", self.read_sample_ballot),
            ("Located Polling Location", self.located_polling_location),
            ("Voted", self.voted),
        ]

    def fetch_and_update_registration(self):
        helpers.fetch_and_update_registration(self.voter, self)
        self.save()
