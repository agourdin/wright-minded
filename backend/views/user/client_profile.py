from rest_framework import generics
from rest_framework import permissions
from rest_framework import viewsets
from rest_framework.response import Response

from knox.models import AuthToken

from ...models import ClientProfile
from ...serializers import ClientProfileSerializer, ClientProfileInfoSerializer

class ClientProfileViewSet(viewsets.ModelViewSet):
    # permission_classes = [permissions.IsAuthenticated, ]
    # serializer_class = ClientProfileSerializer
    queryset = ClientProfile.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return ClientProfileInfoSerializer
        if self.action == 'retrieve':
            return ClientProfileInfoSerializer
        return ClientProfileSerializer
