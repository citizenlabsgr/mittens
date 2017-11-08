# pylint: disable=unused-variable,unused-argument,expression-not-assigned

import pytest
from expecter import expect

from .. import models


@pytest.fixture
def region_county():
    return models.Region(
        county=models.County(name="Kent"),
    )


@pytest.fixture
def region_city():
    return models.Region(
        city=models.City(name="Grand Rapids")
    )


@pytest.fixture
def region_ward():
    return models.Region(
        city=models.City(name="Grand Rapids"),
        ward=models.Ward(name="3"),
    )


def describe_region():

    def describe_str():

        def when_county(region_county):
            expect(str(region_county)) == "Kent County"

        def when_city(region_city):
            expect(str(region_city)) == "Grand Rapids"

        def when_ward(region_ward):
            expect(str(region_ward)) == "Grand Rapids - Ward 3"
