from rest_framework import serializers

from api.voters.models import Voter, Status
from api.elections.models import Election


class IdentitySerializer(serializers.ModelSerializer):

    class Meta:
        model = Voter
        # All the fields from the 'Identity' abstract base:
        fields = ['first_name', 'last_name', 'birth_date', 'zip_code']


class StatusSerializer(serializers.ModelSerializer):

    class Meta:
        model = Status
        fields = ['registered']


class VoterSerializer(serializers.ModelSerializer):

    class Meta:
        model = Voter
        fields = ['id', 'first_name', 'last_name']


class ElectionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Election
        fields = '__all__'


class TimelineSerializer(serializers.ModelSerializer):

    class Meta:
        model = Status
        fields = '__all__'

    voter = VoterSerializer()
    election = ElectionSerializer()
