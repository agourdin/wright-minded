from rest_framework import generics
from rest_framework.response import Response

from knox.views import LogoutView

class LogoutAPI(LogoutView):
    pass
