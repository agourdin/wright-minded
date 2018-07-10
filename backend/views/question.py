from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from ..models import Question, QuestionType
from ..serializers import QuestionSerializer, QuestionInfoSerializer, QuestionTypeSerializer


##### QUESTION #################################################################

@api_view(['GET', 'DELETE', 'PUT'])
def get_delete_update_question(request, pk):
    try:
        question = Question.objects.get(pk=pk)
    except Question.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # GET details of a single question
    if request.method == 'GET':
        serializer = QuestionInfoSerializer(question)
        return Response(serializer.data)

    # DELETE a single question
    elif request.method == 'DELETE':
        question.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    # UPDATE details of a single question
    elif request.method == 'PUT':
        serializer = QuestionSerializer(question, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def get_post_questions(request):
    # get all questions
    if request.method == 'GET':
        questions = Question.objects.all()
        serializer = QuestionInfoSerializer(questions, many=True)
        return Response(serializer.data)
    # insert a new record for a question
    elif request.method == 'POST':
        data = {
            'test': request.data.get('test'),
            'section_num': request.data.get('section_num'),
            'section_name': request.data.get('section_name'),
            'question_num': request.data.get('question_num'),
            'question_type': request.data.get('question_type'),
            'input_type': request.data.get('input_type'),
            'answer': request.data.get('answer')
        }
        serializer = QuestionSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
