from django.urls import path, include

from rest_framework import routers

from . import viewsets


root = routers.DefaultRouter()

root.register('registration', viewsets.RegistrationViewSet, base_name='registration')
root.register('timelines', viewsets.TimelineViewSet)

urlpatterns = [
    path('', include(root.urls)),

    path('client/', include('rest_framework.urls')),
]
