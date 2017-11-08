from django.db import models

from api.elections.models import Region, Election


class Proposal(models.Model):

    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)

    election = models.ForeignKey(Election)
    regions = models.ManyToManyField(Region)

    def __str__(self):
        return self.name


class Party(models.Model):

    class Meta:
        verbose_name_plural = "Parties"

    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Candidate(models.Model):

    name = models.CharField(max_length=100)
    party = models.ForeignKey(Party, blank=True, null=True)
    website = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.name


class Position(models.Model):

    name = models.CharField(max_length=200)

    election = models.ForeignKey(Election)
    region = models.ForeignKey(Region)

    candidates = models.ManyToManyField(Candidate, blank=True)
    seats = models.PositiveIntegerField(default=1)

    def __str__(self):
        return self.name
