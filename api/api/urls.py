from django.conf.urls import url, include

from rest_framework import routers


root = routers.DefaultRouter()


urlpatterns = [
    url('', include(root.urls)),

]
