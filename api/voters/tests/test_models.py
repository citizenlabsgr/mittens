# pylint: disable=unused-variable,unused-argument,expression-not-assigned

from django.forms.models import model_to_dict

import pytest
from expecter import expect
import arrow

from api.elections.models import Election

from .. import models


@pytest.fixture
def info():
    return models.Identity(
        first_name="John",
        last_name="Doe",
        birth_date=arrow.get("1985-06-19"),
    )


@pytest.fixture
def voter(info):
    return models.Voter(
        email="john@example.com",
        **model_to_dict(info),
    )


@pytest.fixture
def status(voter):
    return models.Status(
        voter=voter,
        election=Election(name="Sample Election"),
    )


def describe_registration_info():

    def describe_birth_month():

        def is_parsed_from_date(info):
            expect(info.birth_month) == "June"

    def describe_birth_year():

        def is_parsed_from_date(info):
            expect(info.birth_year) == 1985


def describe_voter():

    def describe_str():

        def is_based_on_name(voter):
            expect(str(voter)) == "John Doe"


def describe_status():

    def describe_str():

        def is_based_on_voter_and_election(status):
            expect(str(status)) == "Sample Election: John Doe"
