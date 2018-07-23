from rest_framework import permissions
from rest_framework import viewsets
from rest_framework.response import Response

from knox.models import AuthToken

from ...models import ClientProfile
from ...serializers import ClientProfileSerializer, ClientProfileInfoSerializer

class ClientProfileViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAdminUser, ]

    def get_queryset(self):
        queryset = ClientProfile.objects.all()
        # TUTOR PARAM
        tutorid = self.request.query_params.get('tutorid', None)
        if tutorid is not None:
            queryset = queryset.filter(tutor=tutorid)
        # ENROLLMENT_STATUS PARAM
        status = self.request.query_params.get('status', None)
        if status is not None:
            queryset = queryset.filter(enrollment_status=status)
        return queryset



    def get_serializer_class(self):
        if self.action == 'list':
            return ClientProfileInfoSerializer
        if self.action == 'retrieve':
            return ClientProfileInfoSerializer
        return ClientProfileSerializer
