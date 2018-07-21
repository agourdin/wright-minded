from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework import status

from .permissions import UserAnswerPermissions

from ..models import UserAnswer
from ..serializers import UserAnswerSerializer, UserAnswerInfoSerializer

class UserAnswerViewSet(viewsets.ModelViewSet):
    permission_classes = [UserAnswerPermissions, ]

    def get_serializer_class(self):
        if self.action == 'list':
            return UserAnswerInfoSerializer
        if self.action == 'retrieve':
            return UserAnswerInfoSerializer
        return UserAnswerSerializer

    def get_queryset(self):
        queryset = UserAnswer.objects.all()
        userid = self.request.query_params.get('userid', None)
        if userid is not None:
            queryset = queryset.filter(user=userid)
        return queryset
