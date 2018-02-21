from django.urls import path, include

from rest_framework import routers

from . import viewsets


root = routers.DefaultRouter()

root.register('voters', viewsets.VoterViewSet, 'voters')

root.register('registration', viewsets.RegistrationViewSet, base_name='registration')
root.register('timelines', viewsets.TimelineViewSet, base_name='timelines')

root.register('login-email', viewsets.LoginEmailViewSet, base_name='login-email')

urlpatterns = [
    path('', include(root.urls)),

    path('client/', include('rest_framework.urls')),
]
