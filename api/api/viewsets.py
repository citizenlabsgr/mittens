from django.shortcuts import get_object_or_404

from rest_framework import viewsets

from api.voters.models import Status

from . import serializers


class StatusViewSet(viewsets.ModelViewSet):
    queryset = Status.objects.all()
    serializer_class = serializers.StatusSerializer
    http_method_names = ['get']

    def retrieve(self, request, pk=None):
        if request.query_params.get('refresh'):
            status = get_object_or_404(Status, pk=pk)
            status.fetch_and_update_registration()

        return super().retrieve(request, pk)
