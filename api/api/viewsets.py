from rest_framework import viewsets

from api.voters.models import Status

from . import serializers


class StatusViewSet(viewsets.ModelViewSet):
    queryset = Status.objects.all()
    serializer_class = serializers.StatusSerializer
    http_method_names = ['get']
