from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics

from ..models import Test
from ..serializers import TestSerializer, TestAnswersSerializer


#### TEST ANSWER ###############################################################

@api_view(['GET', 'DELETE', 'PUT'])
def get_test_answer(request, pk):
    try:
        test = Test.objects.get(pk=pk)
    except Test.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # GET details of a single test
    if request.method == 'GET':
        serializer = TestAnswersSerializer(test)
        return Response(serializer.data)

    # DELETE a single test
    elif request.method == 'DELETE':
        return Response(status=status.HTTP_400_BAD_REQUEST)

    # UPDATE details of a single test
    elif request.method == 'PUT':
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def get_test_answers(request):
    # get all tests
    if request.method == 'GET':
        tests = Test.objects.all()
        serializer = TestAnswersSerializer(tests, many=True)
        return Response(serializer.data)
    # insert a new record for a test
    elif request.method == 'POST':
        return Response(status=status.HTTP_400_BAD_REQUEST)

class GetTestAnswers(generics.ListAPIView):
    serializer_class = TestSerializer

    def get_queryset(self):
        queryset = Test.objects.all()
        queryset = queryset.filter(question__answer)
        return queryset


class GetTestAnswer(generics.RetrieveAPIView):
    serializer_class = TestSerializer

    def get_queryset(self):
        queryset = Test.objects.all()
        queryset = queryset.filter(question__answer)
        return queryset
