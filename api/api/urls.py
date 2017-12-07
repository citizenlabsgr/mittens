from django.urls import path, include

from rest_framework import routers

from . import viewsets


root = routers.DefaultRouter()

root.register('registration', viewsets.RegistrationViewSet, base_name='registration')
root.register('timelines', viewsets.TimelineViewSet)
# root.register('registration', viewsets.RegistrationViewSet.as_view(), base_name='registration')

urlpatterns = [
    path('', include(root.urls)),
    # path('registration/', viewsets.RegistrationViewSet.as_view()),
    path('client/', include('rest_framework.urls')),
]
