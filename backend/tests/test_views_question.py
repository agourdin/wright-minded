import json
import uuid
from rest_framework import status
from django.contrib.auth.models import AnonymousUser, User
from django.test import TestCase, Client
from django.urls import reverse

from ..models import Test, TestType, Section, Question, QuestionType, QuestionTypeGroup
from ..serializers import QuestionSerializer, QuestionInfoSerializer

# Initialize the APIClient app
client = Client()

class GetAllQuestionsTest(TestCase):
    """ Test module for GET all tests API """

    def setUp(self):
        self.TestType1 = TestType.objects.create(test_type='Type1')
        self.TestType2 = TestType.objects.create(test_type='Type2')
        self.Section1 = Section.objects.create(section_name='Section1')
        self.Section2 = Section.objects.create(section_name='Section2')
        self.Section3 = Section.objects.create(section_name='Section3')
        self.Test1 = Test.objects.create(test_name='Test1', test_type=self.TestType1)
        self.Test2 = Test.objects.create(test_name='Test2', test_type=self.TestType2)
        self.Test3 = Test.objects.create(test_name='Test3', test_type=self.TestType2)
        self.QuestionTypeGroup1 = QuestionTypeGroup.objects.create(question_type_group='QuestionTypeGroup1')
        self.QuestionType1 = QuestionType.objects.create(question_type='QuestionType1', question_type_group=self.QuestionTypeGroup1)
        self.QuestionType2 = QuestionType.objects.create(question_type='QuestionType2', question_type_group=self.QuestionTypeGroup1)
        self.Question1 = Question.objects.create(
            test = self.Test1,
            section_num = 1,
            section_name = self.Section1,
            question_num = 1,
            question_type = self.QuestionType1,
            input_type = 'bubble',
            answer = 'A'
        )
        self.Question2 = Question.objects.create(
            test = self.Test2,
            section_num = 1,
            section_name = self.Section2,
            question_num = 2,
            question_type = self.QuestionType2,
            input_type = 'gridin',
            answer = 12
        )
        self.Question3 = Question.objects.create(
            test = self.Test1,
            section_num = 1,
            section_name = self.Section3,
            question_num = 3,
            question_type = self.QuestionType1,
            input_type = 'gridin',
            answer = '11/.'
        )

    def test_get_all_questions(self):
        # Get API response
        response = client.get(reverse('get_post_questions'))
        # Get data from db
        questions = Question.objects.all()
        serializer = QuestionInfoSerializer(questions, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class GetSingleQuestionTest(TestCase):
    """ Test module for GET single test API """

    def setUp(self):
        self.TestType1 = TestType.objects.create(test_type='Type1')
        self.TestType2 = TestType.objects.create(test_type='Type2')
        self.Section1 = Section.objects.create(section_name='Section1')
        self.Section2 = Section.objects.create(section_name='Section2')
        self.Test1 = Test.objects.create(test_name='Test1', test_type=self.TestType1)
        self.Test2 = Test.objects.create(test_name='Test2', test_type=self.TestType2)
        self.QuestionTypeGroup1 = QuestionTypeGroup.objects.create(question_type_group='QuestionTypeGroup1')
        self.QuestionType1 = QuestionType.objects.create(question_type='QuestionType1', question_type_group=self.QuestionTypeGroup1)
        self.QuestionType2 = QuestionType.objects.create(question_type='QuestionType2', question_type_group=self.QuestionTypeGroup1)
        self.Question1 = Question.objects.create(
            test = self.Test1,
            section_num = 1,
            section_name = self.Section1,
            question_num = 1,
            question_type = self.QuestionType1,
            input_type = 'bubble',
            answer = 'A'
        )
        self.Question2 = Question.objects.create(
            test = self.Test2,
            section_num = 1,
            section_name = self.Section2,
            question_num = 2,
            question_type = self.QuestionType2,
            input_type = 'gridin',
            answer = 12
        )

    def test_get_valid_single_question(self):
        # Get API response
        response = client.get(
            reverse('get_delete_update_question', kwargs={'pk': self.Question1.pk}))
        question = Question.objects.get(pk=self.Question1.pk)
        serializer = QuestionInfoSerializer(question)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_invalid_single_question(self):
        # GET API response
        response = client.get(
            reverse('get_delete_update_question', kwargs={'pk': 30}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class CreateSingleQuestionTest(TestCase):
    """ Test module for inserting a new test """

    def setUp(self):
        self.TestType1 = TestType.objects.create(test_type='Type1')
        self.TestType2 = TestType.objects.create(test_type='Type2')
        self.Section1 = Section.objects.create(section_name='Section1')
        self.Section2 = Section.objects.create(section_name='Section2')
        self.Test1 = Test.objects.create(test_name='Test1', test_type=self.TestType1)
        self.Test2 = Test.objects.create(test_name='Test2', test_type=self.TestType2)
        self.QuestionTypeGroup1 = QuestionTypeGroup.objects.create(question_type_group='QuestionTypeGroup1')
        self.QuestionType1 = QuestionType.objects.create(question_type='QuestionType1', question_type_group=self.QuestionTypeGroup1)
        self.QuestionType2 = QuestionType.objects.create(question_type='QuestionType2', question_type_group=self.QuestionTypeGroup1)
        self.valid_payload = {
            'test': self.Test1.pk,
            'section_num': 1,
            'section_name': self.Section1.pk,
            'question_num': 1,
            'question_type': self.QuestionType1.pk,
            'input_type': 'bubble',
            'answer': 'A'
        }
        self.invalid_payload = {
            'test': '',
            'section_num': 1,
            'section_name': self.Section1.pk,
            'question_num': 1,
            'question_type': self.QuestionType1.pk,
            'input_type': 'bubble',
            'answer': 'A'
        }

    def test_create_valid_question(self):
        response = client.post(
            reverse('get_post_questions'),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_invalid_question(self):
        response = client.post(
            reverse('get_post_questions'),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class UpdateSingleQuestionTest(TestCase):
    """ Test module for updating an existing test record """

    def setUp(self):
        self.TestType1 = TestType.objects.create(test_type='Type1')
        self.TestType2 = TestType.objects.create(test_type='Type2')
        self.Section1 = Section.objects.create(section_name='Section1')
        self.Section2 = Section.objects.create(section_name='Section2')
        self.Test1 = Test.objects.create(test_name='Test1', test_type=self.TestType1)
        self.Test2 = Test.objects.create(test_name='Test2', test_type=self.TestType2)
        self.QuestionTypeGroup1 = QuestionTypeGroup.objects.create(question_type_group='QuestionTypeGroup1')
        self.QuestionType1 = QuestionType.objects.create(question_type='QuestionType1', question_type_group=self.QuestionTypeGroup1)
        self.QuestionType2 = QuestionType.objects.create(question_type='QuestionType2', question_type_group=self.QuestionTypeGroup1)
        self.Question1 = Question.objects.create(
            test = self.Test1,
            section_num = 1,
            section_name = self.Section1,
            question_num = 1,
            question_type = self.QuestionType1,
            input_type = 'bubble',
            answer = 'A'
        )
        self.Question2 = Question.objects.create(
            test = self.Test2,
            section_num = 1,
            section_name = self.Section2,
            question_num = 2,
            question_type = self.QuestionType2,
            input_type = 'gridin',
            answer = 12
        )
        self.valid_payload = {
            'test': self.Test1.pk,
            'section_num': 2,
            'section_name': self.Section1.pk,
            'question_num': 3,
            'question_type': self.QuestionType2.pk,
            'input_type': 'gridin',
            'answer': 'A'
        }
        self.invalid_payload = {
            'test': 35,
            'section_num': 1,
            'section_name': self.Section1.pk,
            'question_num': 1,
            'question_type': self.QuestionType1.pk,
            'input_type': 'bubble',
            'answer': 'A'
        }

    def test_update_valid_question(self):
        response = client.put(
            reverse('get_delete_update_question', kwargs={'pk': self.Question1.pk}),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_update_invalid_question(self):
        response = client.put(
            reverse('get_delete_update_question', kwargs={'pk': self.Question1.pk}),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class DeleteSingleQuestionTest(TestCase):
    """ Test module for deleting an existing test record """

    def setUp(self):
        self.TestType1 = TestType.objects.create(test_type='Type1')
        self.TestType2 = TestType.objects.create(test_type='Type2')
        self.Section1 = Section.objects.create(section_name='Section1')
        self.Section2 = Section.objects.create(section_name='Section2')
        self.Test1 = Test.objects.create(test_name='Test1', test_type=self.TestType1)
        self.Test2 = Test.objects.create(test_name='Test2', test_type=self.TestType2)
        self.QuestionTypeGroup1 = QuestionTypeGroup.objects.create(question_type_group='QuestionTypeGroup1')
        self.QuestionType1 = QuestionType.objects.create(question_type='QuestionType1', question_type_group=self.QuestionTypeGroup1)
        self.QuestionType2 = QuestionType.objects.create(question_type='QuestionType2', question_type_group=self.QuestionTypeGroup1)
        self.Question1 = Question.objects.create(
            test = self.Test1,
            section_num = 1,
            section_name = self.Section1,
            question_num = 1,
            question_type = self.QuestionType1,
            input_type = 'bubble',
            answer = 'A'
        )
        self.Question2 = Question.objects.create(
            test = self.Test2,
            section_num = 1,
            section_name = self.Section2,
            question_num = 2,
            question_type = self.QuestionType2,
            input_type = 'gridin',
            answer = 12
        )

    def test_delete_valid_question(self):
        response = client.delete(
            reverse('get_delete_update_question', kwargs={'pk': self.Question1.pk}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_invalid_question(self):
        response = client.delete(
            reverse('get_delete_update_question', kwargs={'pk': 30}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
