import json
import uuid
from rest_framework import status
from django.test import TestCase, Client
from django.urls import reverse

from ..models import QuestionType, QuestionTypeGroup
from ..serializers import QuestionTypeSerializer, QuestionTypeInfoSerializer

# Initialize the APIClient app
client = Client()

class GetAllQuestionTypesTest(TestCase):
    """ Test module for GET all test types API """

    def setUp(self):
        self.QuestionTypeGroup1 = QuestionTypeGroup.objects.create(question_type_group='QuestionTypeGroup1')
        self.QuestionType1 = QuestionType.objects.create(question_type='QuestionType1', question_type_group=self.QuestionTypeGroup1)
        self.QuestionType2 = QuestionType.objects.create(question_type='QuestionType2', question_type_group=self.QuestionTypeGroup1)
        self.QuestionType3 = QuestionType.objects.create(question_type='QuestionType3', question_type_group=self.QuestionTypeGroup1)

    def test_get_all_question_types(self):
        # Get API response
        response = client.get(reverse('get_post_question_types'))
        # Get data from db
        test_types = QuestionType.objects.all()
        serializer = QuestionTypeInfoSerializer(test_types, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class GetSingleQuestionTypeTest(TestCase):
    """ Test module for GET single test type API """

    def setUp(self):
        self.QuestionTypeGroup1 = QuestionTypeGroup.objects.create(question_type_group='QuestionTypeGroup1')
        self.QuestionType1 = QuestionType.objects.create(question_type='QuestionType1', question_type_group=self.QuestionTypeGroup1)
        self.QuestionType2 = QuestionType.objects.create(question_type='QuestionType2', question_type_group=self.QuestionTypeGroup1)
        self.QuestionType3 = QuestionType.objects.create(question_type='QuestionType3', question_type_group=self.QuestionTypeGroup1)

    def test_get_valid_single_question_type(self):
        # Get API response
        response = client.get(
            reverse('get_delete_update_question_type', kwargs={'pk': self.QuestionType1.pk}))
        test_type = QuestionType.objects.get(pk=self.QuestionType1.pk)
        serializer = QuestionTypeInfoSerializer(test_type)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_invalid_single_question_type(self):
        # GET API response
        response = client.get(
            reverse('get_delete_update_question_type', kwargs={'pk': -5}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class CreateSingleTestQuestionType(TestCase):
    """ Test module for inserting a new test type """

    def setUp(self):
        self.QuestionTypeGroup1 = QuestionTypeGroup.objects.create(question_type_group='QuestionTypeGroup1')
        self.valid_payload = {
            'question_type': 'Understanding Question Types',
            'question_type_group': self.QuestionTypeGroup1.pk
        }
        self.QuestionType1 = QuestionType.objects.create(question_type='QuestionType1', question_type_group=self.QuestionTypeGroup1)
        self.invalid_payload = {
            'question_type': 'QuestionType1'
        }

    def test_create_valid_question_type(self):
        response = client.post(
            reverse('get_post_question_types'),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_invalid_question_type(self):
        response = client.post(
            reverse('get_post_question_types'),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class UpdateSingleTestQuestionType(TestCase):
    """ Test module for updating an existing test record """

    def setUp(self):
        self.QuestionTypeGroup1 = QuestionTypeGroup.objects.create(question_type_group='QuestionTypeGroup1')
        self.QuestionType1 = QuestionType.objects.create(question_type='QuestionType1', question_type_group=self.QuestionTypeGroup1)
        self.QuestionType2 = QuestionType.objects.create(question_type='QuestionType2', question_type_group=self.QuestionTypeGroup1)
        self.valid_payload = {
            'question_type': 'Understanding Question Types',
            'question_type_group': self.QuestionTypeGroup1.pk
        }
        self.invalid_payload = {
            'question_type': ''
        }

    def test_update_valid_question_type(self):
        response = client.put(
            reverse('get_delete_update_question_type', kwargs={'pk': self.QuestionType1.pk}),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_update_invalid_question_type(self):
        response = client.put(
            reverse('get_delete_update_question_type', kwargs={'pk': self.QuestionType1.pk}),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class DeleteSingleTestQuestionType(TestCase):
    """ Test module for deleting an existing test record """

    def setUp(self):
        self.QuestionTypeGroup1 = QuestionTypeGroup.objects.create(question_type_group='QuestionTypeGroup1')
        self.QuestionType1 = QuestionType.objects.create(question_type='QuestionType1', question_type_group=self.QuestionTypeGroup1)
        self.QuestionType2 = QuestionType.objects.create(question_type='QuestionType2', question_type_group=self.QuestionTypeGroup1)

    def test_delete_valid_question_type(self):
        response = client.delete(
            reverse('get_delete_update_question_type', kwargs={'pk': self.QuestionType1.pk}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_invalid_question_type(self):
        response = client.delete(
            reverse('get_delete_update_question_type', kwargs={'pk': -5}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
