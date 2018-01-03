# pylint: disable=unused-variable,unused-argument,expression-not-assigned

import pytest
from expecter import expect

from .. import models


@pytest.fixture
def region():
    return models.Region(
        kind=models.Kind(name="City"),
        name="Grand Rapids",
    )


def describe_region():

    def describe_str():

        def it_includes_kind(region):
            expect(str(region)) == "City: Grand Rapids"
