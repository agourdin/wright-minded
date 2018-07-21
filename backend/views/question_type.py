from rest_framework import permissions
from rest_framework import viewsets
from rest_framework.response import Response

from .permissions import IsAdminOrReadOnly
from ..models import QuestionType
from ..serializers import QuestionTypeSerializer

class QuestionTypeViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminOrReadOnly, ]
    queryset = QuestionType.objects.all()
    serializer_class = QuestionTypeSerializer
