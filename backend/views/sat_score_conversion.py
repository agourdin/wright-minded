from rest_framework import generics
from rest_framework import mixins

from .permissions import IsAdminOrReadOnly
from ..models import SATScoreConversion
from ..serializers import SATScoreConversionSerializer


class SATScoreConversionList(generics.ListAPIView):
    permission_classes = (IsAdminOrReadOnly, )
    serializer_class = SATScoreConversionSerializer

    def get_queryset(self):
        queryset = SATScoreConversion.objects.all()
        testid = self.request.query_params.get('testid', None)
        if testid is not None:
            queryset = queryset.filter(test=testid)
        return queryset
