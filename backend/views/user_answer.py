from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from ..models import UserAnswer
from ..serializers import UserAnswerSerializer, UserAnswerInfoSerializer


##### USER ANSWER ##############################################################

@api_view(['GET', 'DELETE', 'PUT'])
def get_delete_update_user_answer(request, pk):
    try:
        user_answer = UserAnswer.objects.get(pk=pk)
    except UserAnswer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # GET details of a single user answer
    if request.method == 'GET':
        serializer = UserAnswerInfoSerializer(user_answer)
        return Response(serializer.data)

    # DELETE a single user answer
    elif request.method == 'DELETE':
        user_answer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    # UPDATE details of a single user answer
    elif request.method == 'PUT':
        serializer = UserAnswerSerializer(user_answer, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def get_post_user_answers(request):
    # get all user answers
    if request.method == 'GET':
        user_answers = UserAnswer.objects.all()
        serializer = UserAnswerInfoSerializer(user_answers, many=True)
        return Response(serializer.data)
    # insert a new record for a user answer
    elif request.method == 'POST':
        data = {
            'user': request.data.get('user'),
            'test': request.data.get('test'),
            'encoded_answer': request.data.get('encoded_answer'),
            'encoder_string': request.data.get('encoder_string')
        }
        serializer = UserAnswerSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
