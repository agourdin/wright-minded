from rest_framework.decorators import api_view
from rest_framework import permissions
from rest_framework import viewsets
from rest_framework.response import Response

from .permissions import IsAdminOrReadOnly
from ..models import Question
from ..serializers import QuestionSerializer, QuestionInfoSerializer

class QuestionViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminOrReadOnly, ]
    queryset = Question.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return QuestionInfoSerializer
        if self.action == 'retrieve':
            return QuestionInfoSerializer
        return QuestionSerializer
