from rest_framework import generics
from rest_framework import permissions
from rest_framework import viewsets
from rest_framework.response import Response

from knox.models import AuthToken

from ...models import ClientProfile
from ...serializers import ClientProfileSerializer

class ClientProfileViewSet(viewsets.ModelViewSet):
    # permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = ClientProfileSerializer
    queryset = ClientProfile.objects.all()
