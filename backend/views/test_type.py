from rest_framework import permissions
from rest_framework import viewsets
from rest_framework.response import Response

from .permissions import IsAdminOrReadOnly
from ..models import TestType
from ..serializers import TestTypeSerializer

class TestTypeViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminOrReadOnly, ]
    queryset = TestType.objects.all()
    serializer_class = TestTypeSerializer
