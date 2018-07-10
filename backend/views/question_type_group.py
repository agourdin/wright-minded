from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from ..models import QuestionTypeGroup
from ..serializers import QuestionTypeGroupSerializer


##### TEST TYPE ###############################################################

@api_view(['GET', 'DELETE', 'PUT'])
def get_delete_update_question_type_group(request, pk):
    try:
        question_type_group = QuestionTypeGroup.objects.get(pk=pk)
    except QuestionTypeGroup.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # GET details of a single test
    if request.method == 'GET':
        serializer = QuestionTypeGroupSerializer(question_type_group)
        return Response(serializer.data)

    # DELETE a single test
    elif request.method == 'DELETE':
        question_type_group.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    # UPDATE details of a single test
    elif request.method == 'PUT':
        serializer = QuestionTypeGroupSerializer(question_type_group, data=request.data)
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def get_post_question_type_groups(request):
    # get all tests
    if request.method == 'GET':
        question_type_groups = QuestionTypeGroup.objects.all()
        serializer = QuestionTypeGroupSerializer(question_type_groups, many=True)
        return Response(serializer.data)

    # insert a new record for a test
    elif request.method == 'POST':
        data = {
            'question_type_group': request.data.get('question_type_group')
        }
        serializer = QuestionTypeGroupSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
