import json
from rest_framework import status
from rest_framework.test import APIClient, APITestCase
from django.test import TestCase, Client
from django.urls import reverse

from knox.models import AuthToken

from django.contrib.auth.models import AnonymousUser, User

from ..models import TestType
from ..serializers import TestTypeSerializer

# Initialize the APIClient app
client = APIClient()

class GET_TestTypeViewTest(TestCase):
    """ Test module for GET Test Type API """

    def setUp(self):
        self.TestType1 = TestType.objects.create(test_type='TestType1')
        self.TestType2 = TestType.objects.create(test_type='TestType2')
        self.TestType3 = TestType.objects.create(test_type='TestType3')

    def test_get_all_test_types(self):
        response = self.client.get(reverse('test_type-list'))
        test_types = TestType.objects.all()
        serializer = TestTypeSerializer(test_types, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_single_valid_test_type(self):
        response = self.client.get(reverse('test_type-detail', kwargs={'pk': self.TestType1.pk}))
        test_type = TestType.objects.get(pk=self.TestType1.pk)
        serializer = TestTypeSerializer(test_type)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_single_invalid_test_type(self):
        response = self.client.get(reverse('test_type-detail', kwargs={'pk': 90123}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class CREATE_UPDATE_DELETE_TestTypeViewTest(APITestCase):
    """ Test module for POST, PUT, DELETE Test Type API """

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
        self.TestType1 = TestType.objects.create(test_type='TestType1')
        self.TestType2 = TestType.objects.create(test_type='TestType2')
        self.valid_create_payload = {
            'test_type': 'SAT_2016'
        }
        self.valid_update_payload = {
            'test_type': 'LSAT'
        }
        self.invalid_payload = {
            'test_type': ''
        }

    def test_create_valid_test_type(self):
        client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        response = client.post(
            reverse('test_type-list'),
            data=json.dumps(self.valid_create_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_invalid_test_type(self):
        client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        response = client.post(
            reverse('test_type-list'),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_valid_update_test_type(self):
        client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        response = client.patch(
            reverse('test_type-detail', kwargs={'pk': self.TestType1.pk}),
            data=json.dumps(self.valid_update_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_invalid_update_test_type(self):
        client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        response = client.patch(
            reverse('test_type-detail', kwargs={'pk': 123412341}),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_valid_test_type(self):
        client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        response = client.delete(
            reverse('test_type-detail', kwargs={'pk': self.TestType1.pk}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_invalid_test_type(self):
        client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        response = client.delete(
            reverse('test_type-detail', kwargs={'pk': 123132515}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
