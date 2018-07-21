import json
from rest_framework import status
from rest_framework.test import APIClient, APITestCase
from django.test import TestCase, Client
from django.urls import reverse

from knox.models import AuthToken

from django.contrib.auth.models import AnonymousUser, User

from ..models import Question, QuestionType, QuestionTypeGroup, Section, Test, TestType
from ..serializers import QuestionSerializer, QuestionInfoSerializer

# Initialize the APIClient app
client = APIClient()

class GET_QuestionViewTest(TestCase):
    """ Test module for GET Question API """

    def setUp(self):
        self.TestType = TestType.objects.create(test_type='Type')
        self.Section = Section.objects.create(section_name='Section')
        self.Test = Test.objects.create(test_name='Test', test_type=self.TestType)
        self.QuestionTypeGroup = QuestionTypeGroup.objects.create(question_type_group='QuestionTypeGroup')
        self.QuestionType = QuestionType.objects.create(question_type='QuestionType', question_type_group=self.QuestionTypeGroup)
        self.Question1 = Question.objects.create(
            test = self.Test,
            section_num = 1,
            section_name = self.Section,
            question_num = 1,
            question_type = self.QuestionType,
            input_type = 'bubble',
            answer = 'A'
        )
        self.Question2 = Question.objects.create(
            test = self.Test,
            section_num = 1,
            section_name = self.Section,
            question_num = 2,
            question_type = self.QuestionType,
            input_type = 'gridin',
            answer = 12
        )
        self.Question3 = Question.objects.create(
            test = self.Test,
            section_num = 1,
            section_name = self.Section,
            question_num = 3,
            question_type = self.QuestionType,
            input_type = 'gridin',
            answer = '11/.'
        )

    def test_get_all_questions(self):
        response = self.client.get(reverse('question-list'))
        questions = Question.objects.all()
        serializer = QuestionInfoSerializer(questions, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_single_valid_question(self):
        response = self.client.get(reverse('question-detail', kwargs={'pk': self.Question1.pk}))
        question = Question.objects.get(pk=self.Question1.pk)
        serializer = QuestionInfoSerializer(question)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_single_invalid_question(self):
        response = self.client.get(reverse('question-detail', kwargs={'pk': 90123}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class CREATE_UPDATE_DELETE_QuestionViewTest(APITestCase):
    """ Test module for POST, PUT, DELETE Question API """

    def setUp(self):
        self.User = User.objects.create_user(
            username='test1',
            email="test1@test.com",
            password='old_password',
            first_name='Test',
            last_name='McTestson')
        self.Superuser = User.objects.create_superuser(
            username='test2',
            email="test2@test.com",
            password='old_password',
            first_name='Test',
            last_name='McTestson')
        self.token = AuthToken.objects.create(self.Superuser)
        self.TestType = TestType.objects.create(test_type='Type')
        self.Section = Section.objects.create(section_name='Section')
        self.Test = Test.objects.create(test_name='Test', test_type=self.TestType)
        self.QuestionTypeGroup = QuestionTypeGroup.objects.create(question_type_group='QuestionTypeGroup')
        self.QuestionType = QuestionType.objects.create(question_type='QuestionType', question_type_group=self.QuestionTypeGroup)
        self.Question1 = Question.objects.create(
            test = self.Test,
            section_num = 1,
            section_name = self.Section,
            question_num = 1,
            question_type = self.QuestionType,
            input_type = 'bubble',
            answer = 'A'
        )
        self.Question2 = Question.objects.create(
            test = self.Test,
            section_num = 1,
            section_name = self.Section,
            question_num = 2,
            question_type = self.QuestionType,
            input_type = 'gridin',
            answer = 12
        )
        self.Question3 = Question.objects.create(
            test = self.Test,
            section_num = 1,
            section_name = self.Section,
            question_num = 3,
            question_type = self.QuestionType,
            input_type = 'gridin',
            answer = '11/.'
        )

        self.valid_create_payload = {
            'test': self.Test.pk,
            'section_num': 1,
            'section_name': self.Section.pk,
            'question_num': 56,
            'question_type': self.QuestionType.pk,
            'input_type': 'bubble',
            'answer': 'A'
        }
        self.valid_update_payload = {
            'section_num': 2,
            'section_name': self.Section.pk,
            'question_num': 1,
            'question_type': self.QuestionType.pk,
            'input_type': 'gridin',
            'answer': '1245'
        }
        self.invalid_payload = {
            'farts': '',
            'section_num': 1,
            'answer': 'A'
        }

    def test_create_valid_question(self):
        client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        response = client.post(
            reverse('question-list'),
            data=json.dumps(self.valid_create_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_invalid_question(self):
        client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        response = client.post(
            reverse('question-list'),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_valid_update_question(self):
        client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        response = client.patch(
            reverse('question-detail', kwargs={'pk': self.Question1.pk}),
            data=json.dumps(self.valid_update_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_invalid_update_question(self):
        client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        response = client.patch(
            reverse('question-detail', kwargs={'pk': 123412341}),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_valid_question(self):
        client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        response = client.delete(
            reverse('question-detail', kwargs={'pk': self.Question1.pk}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_invalid_question(self):
        client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        response = client.delete(
            reverse('question-detail', kwargs={'pk': 123132515}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
