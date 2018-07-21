import json
import uuid
import datetime
from rest_framework import status
from rest_framework.test import APIClient, APITestCase
from django.test import TestCase, Client
from django.urls import reverse

from knox.models import AuthToken

from django.contrib.auth.models import AnonymousUser, User

from ..models import Test, TestType
from ..serializers import TestSerializer, TestInfoSerializer

# Initialize the APIClient app
client = APIClient()

class GET_TestViewTest(TestCase):
    """ Test module for POST to User Profile API """

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
        self.TestType = TestType.objects.create(test_type='Type')
        self.Test1 = Test.objects.create(test_name='Test1', test_type=self.TestType)
        self.Test2 = Test.objects.create(test_name='Test2', test_type=self.TestType)
        self.token = AuthToken.objects.create(self.Superuser)
        self.valid_create_payload = {
            'test_name': 'SAT Practice Test #1',
            'test_type': self.TestType.pk
        }
        self.valid_update_payload = {
            'test_name': 'SAT Practice Test #2'
        }
        self.invalid_payload = {
            'test_name': None,
            'test_type': ''
        }

    def test_get_all_tests(self):
        # client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        response = self.client.get(reverse('test-list'))
        tests = Test.objects.all()
        serializer = TestInfoSerializer(tests, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_single_valid_test(self):
        # client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        response = self.client.get(reverse('test-detail', kwargs={'pk': self.Test1.pk}))
        test = Test.objects.get(pk=self.Test1.pk)
        serializer = TestInfoSerializer(test)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_single_invalid_test(self):
        # client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        response = self.client.get(reverse('test-detail', kwargs={'pk': 90123}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class CREATE_UPDATE_DELETE_TestViewTest(APITestCase):
    """ Test module for POST to User Profile API """

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
        self.TestType = TestType.objects.create(test_type='Type')
        self.Test1 = Test.objects.create(test_name='Test1', test_type=self.TestType)
        self.Test2 = Test.objects.create(test_name='Test2', test_type=self.TestType)
        self.token = AuthToken.objects.create(self.Superuser)
        self.valid_create_payload = {
            'test_name': 'SAT Practice Test #1',
            'test_type': self.TestType.pk
        }
        self.valid_update_payload = {
            'test_name': 'SAT Practice Test #2'
        }
        self.invalid_payload = {
            'test_name': None,
            'test_type': ''
        }

    def test_create_valid_test(self):
        client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        response = client.post(
            reverse('test-list'),
            data=json.dumps(self.valid_create_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_invalid_test(self):
        client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        response = client.post(
            reverse('test-list'),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_valid_update_test(self):
        client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        response = client.patch(
            reverse('test-detail', kwargs={'pk': self.Test1.pk}),
            data=json.dumps(self.valid_update_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_invalid_update_test(self):
        client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        response = client.patch(
            reverse('test-detail', kwargs={'pk': 123412341}),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_valid_test(self):
        client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        response = client.delete(
            reverse('test-detail', kwargs={'pk': self.Test1.pk}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_invalid_test(self):
        client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        response = client.delete(
            reverse('test-detail', kwargs={'pk': 123132515}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
