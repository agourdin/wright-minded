from rest_framework import permissions
from rest_framework import viewsets
from rest_framework.response import Response

from knox.models import AuthToken

from ..permissions import UserProfilePermissions
from ...models import UserProfile
from ...serializers import UserProfileSerializer, UserProfileInfoSerializer

class UserProfileViewSet(viewsets.ModelViewSet):
    permission_classes = [UserProfilePermissions, ]
    # permission_classes = [permissions.AllowAny,]

    def get_queryset(self):
        queryset = UserProfile.objects.all()
        userid = self.request.query_params.get('userid', None)
        if userid is not None:
            print(queryset)
            queryset = queryset.filter(user=userid)
        return queryset

    def get_serializer_class(self):
        if self.action == 'list':
            return UserProfileInfoSerializer
        if self.action == 'retrieve':
            return UserProfileInfoSerializer(many=False)
        return UserProfileSerializer
