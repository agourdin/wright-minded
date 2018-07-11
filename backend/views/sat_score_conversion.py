from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework import mixins

from ..models import SATScoreConversion
from ..serializers import SATScoreConversionSerializer


##### SAT SCORE CONVERSION #####################################################

class SATScoreConversionList(generics.ListAPIView):
    serializer_class = SATScoreConversionSerializer

    def get_queryset(self):
        queryset = SATScoreConversion.objects.all()
        testid = self.request.query_params.get('testid', None)
        if testid is not None:
            queryset = queryset.filter(test=testid)
        return queryset

# class SATScoreConversionRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
#     serializer_class = SATScoreConversionSerializer
#     queryset = SATScoreConversion.objects.all()

# @api_view(['GET', 'DELETE', 'PUT'])
# def get_delete_update_sat_score_conversion(request, pk):
#     try:
#         sat_score_conversion = SATScoreConversion.objects.get(pk=pk)
#     except SATScoreConversion.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)
#
#     # GET details of a single test
#     if request.method == 'GET':
#         serializer = SATScoreConversionSerializer(sat_score_conversion)
#         return Response(serializer.data)
#
#     # DELETE a single test
#     elif request.method == 'DELETE':
#         sat_score_conversion.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)
#
#     # UPDATE details of a single test
#     elif request.method == 'PUT':
#         serializer = SATScoreConversionSerializer(sat_score_conversion, data=request.data)
#         if serializer.is_valid():
#             return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#
# @api_view(['GET', 'POST'])
# def get_post_sat_score_conversions(request):
#     # get all tests
#     if request.method == 'GET':
#         sat_score_conversions = SATScoreConversion.objects.all()
#         serializer = SATScoreConversionSerializer(sat_score_conversions, many=True)
#         return Response(serializer.data)
#
#     # insert a new record for a test
#     elif request.method == 'POST':
#         data = {
#             'test': request.data.get('test'),
#             'num_correct': request.data.get('num_correct'),
#             'math_score': request.data.get('math_score'),
#             'reading_score': request.data.get('reading_score'),
#             'writing_score': request.data.get('writing_score')
#         }
#         serializer = SATScoreConversionSerializer(data=data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
