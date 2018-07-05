from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from api.core.helpers import send_login_email
from api.voters.helpers import fetch_and_update_registration
from api.voters.models import Identity, Status, Voter

from . import serializers


class VoterViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    serializer_class = serializers.VoterSerializer
    http_method_names = ['get', 'post']

    def get_queryset(self):
        if self.request.user.is_anonymous:
            return []
        return Voter.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            voter = serializer.save()

        send_login_email(voter.user, self.request, welcome=True)

        return Response(serializer.data, status=201)


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

        # TODO: We shouldn't getting email here at all
        serializer.validated_data.pop('email')

        identity = Identity(**serializer.validated_data)
        status = Status()

        fetch_and_update_registration(identity, status)

        return status


class TimelineViewSet(viewsets.ModelViewSet):
    queryset = Status.objects.all()
    serializer_class = serializers.TimelineSerializer
    http_method_names = ['get']

    def retrieve(self, request, pk=None):  # pylint: disable=arguments-differ
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
        count = send_login_email(user, request, welcome=False)
        assert count == 1, f"Failed to email {email}"

        return Response({'message': f"Email sent: {email}"})
