from django.db import models

import arrow

from api.elections.models import Election


class RegistrationInfo(models.Model):
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


class Voter(RegistrationInfo):

    email = models.EmailField()

    def __str__(self):
        return self.name

    @property
    def name(self):
        return f"{self.first_name} {self.last_name}"


class Status(models.Model):

    class Meta:
        verbose_name_plural = "Statuses"

    voter = models.ForeignKey(Voter)
    election = models.ForeignKey(Election)

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
