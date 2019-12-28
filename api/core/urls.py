from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth import logout
from django.urls import path, re_path

from . import views


urlpatterns = static('/compiled/', document_root=settings.BUILD_ROOT) + [
    path('go/<path:path>', views.redirector, name='redirector'),
    path('logout', logout, {'next_page': '/'}),
    path('logout/', logout, {'next_page': '/'}),
    re_path('^', views.index, name='index'),
]
