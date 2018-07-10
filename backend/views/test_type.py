from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from ..models import TestType
from ..serializers import TestTypeSerializer


##### TEST TYPE ###############################################################

@api_view(['GET', 'DELETE', 'PUT'])
def get_delete_update_test_type(request, pk):
    try:
        test_type = TestType.objects.get(pk=pk)
    except TestType.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # GET details of a single test
    if request.method == 'GET':
        serializer = TestTypeSerializer(test_type)
        return Response(serializer.data)

    # DELETE a single test
    elif request.method == 'DELETE':
        test_type.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    # UPDATE details of a single test
    elif request.method == 'PUT':
        serializer = TestTypeSerializer(test_type, data=request.data)
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def get_post_test_types(request):
    # get all tests
    if request.method == 'GET':
        test_types = TestType.objects.all()
        serializer = TestTypeSerializer(test_types, many=True)
        return Response(serializer.data)

    # insert a new record for a test
    elif request.method == 'POST':
        data = {
            'test_type': request.data.get('test_type')
        }
        serializer = TestTypeSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
