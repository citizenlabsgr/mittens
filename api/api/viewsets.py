from django.shortcuts import get_object_or_404

from rest_framework import viewsets
from rest_framework.response import Response

from api.voters.models import Identity, Status
from api.voters.helpers import fetch_and_update_registration

from . import serializers


class RegistrationViewSet(viewsets.ViewSet):
    serializer_class = serializers.StatusSerializer

    def list(self, request):
        if request.query_params:
            status = self._get_status_from_query(request.query_params)
        else:
            status = self._get_status_from_auth(request.user)

        serializer = self.serializer_class(status)

        return Response(serializer.data)

    @staticmethod
    def _get_status_from_query(params):
        serializer = serializers.IdentitySerializer(data=params)
        serializer.is_valid(raise_exception=True)

        identity = Identity(**serializer.validated_data)
        status = Status()

        fetch_and_update_registration(identity, status)

        return status

    @staticmethod
    def _get_status_from_auth(user):
        return get_object_or_404(Status, voter__email=user.email)


class TimelineViewSet(viewsets.ModelViewSet):
    queryset = Status.objects.all()
    serializer_class = serializers.TimelineSerializer
    http_method_names = ['get']

    def retrieve(self, request, pk=None):
        if request.query_params.get('refresh'):
            status = get_object_or_404(Status, pk=pk)
            status.fetch_and_update_registration()

        return super().retrieve(request, pk)
