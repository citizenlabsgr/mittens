from django.urls import include, path

from rest_framework import routers

from . import viewsets


root = routers.DefaultRouter()

root.register('voters', viewsets.VoterViewSet, 'voters')

root.register('registration', viewsets.RegistrationViewSet, basename='registration')
root.register('timelines', viewsets.TimelineViewSet, basename='timelines')

root.register('login-email', viewsets.LoginEmailViewSet, basename='login-email')

urlpatterns = [
    path('', include(root.urls)),

    path('client/', include('rest_framework.urls')),
]
