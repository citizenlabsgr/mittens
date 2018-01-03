import logging

from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from api.core.helpers import send_login_email
from api.voters.models import Identity, Voter, Status
from api.voters.helpers import fetch_and_update_registration

from . import serializers


log = logging.getLogger(__name__)


class RegistrationViewSet(viewsets.ViewSet):
    serializer_class = serializers.StatusSerializer
    permission_classes = [AllowAny]

    def list(self, request):
        if request.query_params:
            status = self._get_status_from_query(request)
        elif request.user.is_authenticated:
            status = self._get_status_from_auth(request)
        else:
            status = self._get_status_from_query(request)

        serializer = self.serializer_class(status)

        return Response(serializer.data)

    @staticmethod
    def _get_status_from_auth(request):
        email = getattr(request.user, 'email', None)
        voter = get_object_or_404(Voter, email=email)
        status = Status()

        fetch_and_update_registration(voter, status)

        return status

    @staticmethod
    def _get_status_from_query(request):
        serializer = serializers.IdentitySerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data.pop('email')
        identity = Identity(**serializer.validated_data)
        status = Status()

        fetch_and_update_registration(identity, status)

        if email:
            voter, created = Voter.objects.update_or_create(
                email=email,
                defaults=serializer.validated_data,
            )
            if created:
                send_login_email(voter.user, request)
            else:
                log.warning(f"Updated exiting voter: {voter}")

        return status


class TimelineViewSet(viewsets.ModelViewSet):
    queryset = Status.objects.all()
    serializer_class = serializers.TimelineSerializer
    http_method_names = ['get']

    def retrieve(self, request, pk=None):
        if request.query_params.get('refresh'):
            status = get_object_or_404(Status, pk=pk)
            status.fetch_and_update_registration()

        return super().retrieve(request, pk)


class LoginEmailViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.LoginEmailSerializer
    permission_classes = [AllowAny]
    http_method_names = ['post']

    def create(self, request):  # pylint: disable=arguments-differ
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data['email']
        user = get_object_or_404(User, email=email)
        count = send_login_email(user, request)
        assert count == 1, f"Failed to email {email}"

        return Response({'message': f"Email sent: {email}"})
