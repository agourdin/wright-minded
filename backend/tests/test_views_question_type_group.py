import json
from rest_framework import status
from rest_framework.test import APIClient, APITestCase
from django.test import TestCase, Client
from django.urls import reverse

from knox.models import AuthToken

from django.contrib.auth.models import AnonymousUser, User

from ..models import QuestionTypeGroup
from ..serializers import QuestionTypeGroupSerializer

# Initialize the APIClient app
client = APIClient()

class GET_QuestionTypeGroupViewTest(TestCase):
    """ Test module for GET Question Type Group API """

    def setUp(self):
        self.QuestionTypeGroup1 = QuestionTypeGroup.objects.create(question_type_group='qtg1')
        self.QuestionTypeGroup2 = QuestionTypeGroup.objects.create(question_type_group='qtg2')
        self.valid_create_payload = {
            'question_type_group': 'qtg50'
        }
        self.valid_update_payload = {
            'question_type_group': 'qtg51'
        }
        self.invalid_payload = {
            'blah': 'blahblahblah'
        }

    def test_get_all_question_type_groups(self):
        response = self.client.get(reverse('question_type_group-list'))
        question_type_groups = QuestionTypeGroup.objects.all()
        serializer = QuestionTypeGroupSerializer(question_type_groups, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_single_valid_question_type_group(self):
        response = self.client.get(reverse('question_type_group-detail', kwargs={'pk': self.QuestionTypeGroup1.pk}))
        question_type_group = QuestionTypeGroup.objects.get(pk=self.QuestionTypeGroup1.pk)
        serializer = QuestionTypeGroupSerializer(question_type_group)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_single_invalid_question_type_group(self):
        response = self.client.get(reverse('question_type_group-detail', kwargs={'pk': 90123}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class CREATE_UPDATE_DELETE_QuestionTypeGroupViewTest(APITestCase):
    """ Test module for POST, PUT, DELETE Question Type Group API """

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
        self.QuestionTypeGroup1 = QuestionTypeGroup.objects.create(question_type_group='qtg1')
        self.QuestionTypeGroup2 = QuestionTypeGroup.objects.create(question_type_group='qtg2')
        self.valid_create_payload = {
            'question_type_group': 'qtg50'
        }
        self.valid_update_payload = {
            'question_type_group': 'qtg51'
        }
        self.invalid_payload = {
            'blah': 'blahblahblah'
        }

    def test_create_valid_question_type_group(self):
        client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        response = client.post(
            reverse('question_type_group-list'),
            data=json.dumps(self.valid_create_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_invalid_question_type_group(self):
        client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        response = client.post(
            reverse('question_type_group-list'),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_valid_update_question_type_group(self):
        client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        response = client.patch(
            reverse('question_type_group-detail', kwargs={'pk': self.QuestionTypeGroup1.pk}),
            data=json.dumps(self.valid_update_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_invalid_update_question_type_group(self):
        client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        response = client.patch(
            reverse('question_type_group-detail', kwargs={'pk': 123412341}),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_valid_question_type_group(self):
        client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        response = client.delete(
            reverse('question_type_group-detail', kwargs={'pk': self.QuestionTypeGroup1.pk}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_invalid_question_type_group(self):
        client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        response = client.delete(
            reverse('question_type_group-detail', kwargs={'pk': 123132515}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
