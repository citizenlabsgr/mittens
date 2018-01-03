from django.urls import path, re_path
from django.conf.urls.static import static
from django.conf import settings

from . import views


urlpatterns = static('/compiled/', document_root=settings.BUILD_ROOT) + [
    path('go/<path:path>', views.redirector, name='redirector'),
    re_path('^', views.index, name='index'),
]
