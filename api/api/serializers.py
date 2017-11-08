from rest_framework import serializers

from api.voters.models import Voter, Status
from api.elections.models import Election


class VoterSerializer(serializers.ModelSerializer):

    class Meta:
        model = Voter
        fields = ['id', 'first_name', 'last_name']


class ElectionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Election
        fields = '__all__'


class StatusSerializer(serializers.ModelSerializer):

    class Meta:
        model = Status
        fields = '__all__'

    voter = VoterSerializer()
    election = ElectionSerializer()
