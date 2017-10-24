from django.conf.urls import url
from django.conf.urls.static import static
from django.conf import settings

from . import views


urlpatterns = static('/compiled/',
                     document_root=settings.STATICFILES_DIRS[0]) + [
    url('^', views.index, name='index'),
]
