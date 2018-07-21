from rest_framework import permissions
from rest_framework import viewsets
from rest_framework.response import Response

from .permissions import IsAdminOrReadOnly
from ..models import QuestionTypeGroup
from ..serializers import QuestionTypeGroupSerializer

class QuestionTypeGroupViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminOrReadOnly, ]
    queryset = QuestionTypeGroup.objects.all()
    serializer_class = QuestionTypeGroupSerializer
