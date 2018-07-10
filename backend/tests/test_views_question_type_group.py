import json
import uuid
from rest_framework import status
from django.test import TestCase, Client
from django.urls import reverse

from ..models import QuestionTypeGroup
from ..serializers import QuestionTypeGroupSerializer

# Initialize the APIClient app
client = Client()

class GetAllQuestionTypeGroupsTest(TestCase):
    """ Test module for GET all question type groups API """

    def setUp(self):
        self.QuestionTypeGroup1 = QuestionTypeGroup.objects.create(question_type_group='QuestionTypeGroup1')
        self.QuestionTypeGroup2 = QuestionTypeGroup.objects.create(question_type_group='QuestionTypeGroup2')
        self.QuestionTypeGroup3 = QuestionTypeGroup.objects.create(question_type_group='QuestionTypeGroup3')

    def test_get_all_question_type_groups(self):
        # Get API response
        response = client.get(reverse('get_post_question_type_groups'))
        # Get data from db
        question_type_groups = QuestionTypeGroup.objects.all()
        serializer = QuestionTypeGroupSerializer(question_type_groups, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class GetSingleQuestionTypeGroupTest(TestCase):
    """ Test module for GET single question type group API """

    def setUp(self):
        self.QuestionTypeGroup1 = QuestionTypeGroup.objects.create(question_type_group='QuestionTypeGroup1')
        self.QuestionTypeGroup2 = QuestionTypeGroup.objects.create(question_type_group='QuestionTypeGroup2')
        self.QuestionTypeGroup3 = QuestionTypeGroup.objects.create(question_type_group='QuestionTypeGroup3')

    def test_get_valid_single_question_type_group(self):
        # Get API response
        response = client.get(
            reverse('get_delete_update_question_type_group', kwargs={'pk': self.QuestionTypeGroup1.pk}))
        question_type_group = QuestionTypeGroup.objects.get(pk=self.QuestionTypeGroup1.pk)
        serializer = QuestionTypeGroupSerializer(question_type_group)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_invalid_single_question_type_group(self):
        # GET API response
        response = client.get(
            reverse('get_delete_update_question_type_group', kwargs={'pk': -5}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class CreateSingleQuestionTypeGroupTest(TestCase):
    """ Test module for inserting a new question type group """

    def setUp(self):
        self.valid_payload = {
            'question_type_group': 'Information & Ideas'
        }
        self.invalid_payload = {
            'question_type_group': ''
        }

    def test_create_valid_question_type_group(self):
        response = client.post(
            reverse('get_post_question_type_groups'),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_invalid_question_type_group(self):
        response = client.post(
            reverse('get_post_question_type_groups'),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class UpdateSingleQuestionTypeGroupTest(TestCase):
    """ Test module for updating an existing test record """

    def setUp(self):
        self.QuestionTypeGroup1 = QuestionTypeGroup.objects.create(question_type_group='QuestionTypeGroup1')
        self.QuestionTypeGroup2 = QuestionTypeGroup.objects.create(question_type_group='QuestionTypeGroup2')
        self.valid_payload = {
            'question_type_group': 'Information & Ideas'
        }
        self.invalid_payload = {
            'question_type_group': ''
        }

    def test_update_valid_question_type_group(self):
        response = client.put(
            reverse('get_delete_update_question_type_group', kwargs={'pk': self.QuestionTypeGroup1.pk}),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_update_invalid_question_type_group(self):
        response = client.put(
            reverse('get_delete_update_question_type_group', kwargs={'pk': self.QuestionTypeGroup1.pk}),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class DeleteSingleQuestionTypeGroupTest(TestCase):
    """ Test module for deleting an existing test record """

    def setUp(self):
        self.QuestionTypeGroup1 = QuestionTypeGroup.objects.create(question_type_group='QuestionTypeGroup1')
        self.QuestionTypeGroup2 = QuestionTypeGroup.objects.create(question_type_group='QuestionTypeGroup2')

    def test_delete_valid_question_type_group(self):
        response = client.delete(
            reverse('get_delete_update_question_type_group', kwargs={'pk': self.QuestionTypeGroup1.pk}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_invalid_question_type_group(self):
        response = client.delete(
            reverse('get_delete_update_question_type_group', kwargs={'pk': -5}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
