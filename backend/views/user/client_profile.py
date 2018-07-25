from rest_framework import permissions
from rest_framework import viewsets
from rest_framework.response import Response

from knox.models import AuthToken

from ...utils.views import filter_queryset

from ...models import ClientProfile
from ...serializers import ClientProfileSerializer, ClientProfileInfoSerializer

class ClientProfileViewSet(viewsets.ModelViewSet):
    # permission_classes = [permissions.IsAdminUser, ]

    def get_queryset(self):
        queryset = ClientProfile.objects.all()
        query_params = self.request.query_params
        return filter_queryset(queryset, query_params)



    def get_serializer_class(self):
        if self.action == 'list':
            return ClientProfileInfoSerializer
        if self.action == 'retrieve':
            return ClientProfileInfoSerializer
        return ClientProfileSerializer
