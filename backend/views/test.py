from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from ..models import Test, TestType
from ..serializers import TestSerializer, TestInfoSerializer, TestTypeSerializer, AvailableTestsSerializer


##### TEST ####################################################################

@api_view(['GET', 'DELETE', 'PUT'])
def get_delete_update_test(request, pk):
    try:
        test = Test.objects.get(pk=pk)
    except Test.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # GET details of a single test
    if request.method == 'GET':
        serializer = TestInfoSerializer(test)
        return Response(serializer.data)

    # DELETE a single test
    elif request.method == 'DELETE':
        test.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    # UPDATE details of a single test
    elif request.method == 'PUT':
        serializer = TestSerializer(test, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def get_post_tests(request):
    # get all tests
    if request.method == 'GET':
        tests = Test.objects.all()
        serializer = TestInfoSerializer(tests, many=True)
        return Response(serializer.data)
    # insert a new record for a test
    elif request.method == 'POST':
        data = {
            'test_name': request.data.get('test_name'),
            'test_type': request.data.get('test_type')
        }
        serializer = TestSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def get_available_tests(request):
    if request.method == 'GET':
        tests = Test.objects.all()
        serializer = AvailableTestsSerializer(tests, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        return Response(status=status.HTTP_400_BAD_REQUEST)


# ##### TEST ANSWER ##############################################################
#
# @api_view(['GET'])
# def get_test_answer(request, pk):
#     try:
#         test = Test.objects.get(pk=pk)
#     except Test.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)
#
#     # GET details of a single test
#     if request.method == 'GET':
#         serializer = TestInfoSerializer(test)
#         return Response(serializer.data)
#
#
# @api_view(['GET'])
# def get_post_tests(request):
#     # get all tests
#     if request.method == 'GET':
#         tests = Test.objects.all()
#         serializer = TestInfoSerializer(tests, many=True)
#         return Response(serializer.data)
#     # insert a new record for a test
#     elif request.method == 'POST':
#         data = {
#             'test_name': request.data.get('test_name'),
#             'test_type': request.data.get('test_type')
#         }
#         serializer = TestSerializer(data=data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
