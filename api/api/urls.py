from django.conf.urls import url, include

from rest_framework import routers

from . import viewsets


root = routers.DefaultRouter()

root.register('timeline', viewsets.StatusViewSet)

urlpatterns = [
    url('', include(root.urls)),
    url('^client/', include('rest_framework.urls')),
]
