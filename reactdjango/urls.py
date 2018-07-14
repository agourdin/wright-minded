"""reactdjango URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
  https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
  1. Add an import:  from my_app import views
  2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
  1. Add an import:  from other_app.views import Home
  2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
  1. Import the include() function: from django.urls import include, path
  2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path, include
from django.views.generic import TemplateView
from django.contrib.auth.views import (password_reset,
                                        password_reset_done,
                                        password_reset_confirm,
                                        password_reset_complete)

urlpatterns = [
  path('admin/', admin.site.urls),
  path('api/', include('backend.urls')),
  path('rest-auth/', include('rest_auth.urls')),
  re_path(
    r'^contrib/password_reset/$',
    view=password_reset,
    name='password_reset'),
  re_path(
    r'^contrib/password_reset/done/$',
    view=password_reset_done,
    name='password_reset_done'),
  re_path(
    r'^reset/(?P<uidb64>[0-9A-Za-z_\-]+)'
          r'/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
    view=password_reset_confirm,
    name='password_reset_confirm'),
  re_path(
    r'^contrib/reset/done/$',
    view=password_reset_complete,
    name='password_reset_complete'),
  re_path('.*', TemplateView.as_view(template_name='index.html')),
]
