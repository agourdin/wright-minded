import json
import uuid
from rest_framework import status
from rest_framework.test import force_authenticate
from rest_framework.test import APIClient
from rest_framework.test import APITestCase
from django.test import TestCase, Client
from django.urls import reverse

from knox.models import AuthToken

from django.contrib.auth.models import AnonymousUser, User

from ...serializers import UserSerializer

# Initialize the APIClient app
client = APIClient()

class UserAPIViewTest(APITestCase):
    """ Test module for POST to API """

    def setUp(self):
        self.User = User.objects.create_user(
            username='test1',
            email="test1@test.com",
            password='old_password',
            first_name='Test',
            last_name='McTestson')
        self.token = AuthToken.objects.create(self.User)
        self.valid_payload = {
            "first_name": "Best",
            "new_password": "new_password"
        }
        self.invalid_payload = {
            "blahblah": "blah"
        }

    def test_get_valid_user(self):
        client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        response = client.get(reverse('get_update_user'))
        user = User.objects.get(pk=self.User.pk)
        serializer = UserSerializer(user)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_invalid_user(self):
        response = client.get(reverse('get_update_user'))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_valid_update_user(self):
        client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        response = client.patch(
            reverse('get_update_user'),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_invalid_update_user(self):
        client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        response = client.put(
            reverse('get_update_user'),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
