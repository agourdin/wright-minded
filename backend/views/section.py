from rest_framework import permissions
from rest_framework import viewsets
from rest_framework.response import Response

from .permissions import IsAdminOrReadOnly
from ..models import Section
from ..serializers import SectionSerializer

class SectionViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminOrReadOnly, ]
    queryset = Section.objects.all()
    serializer_class = SectionSerializer
