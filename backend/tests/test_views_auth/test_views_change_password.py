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

# from ..models import QuestionType
# from ..serializers import QuestionTypeSerializer

# Initialize the APIClient app
client = APIClient()

class RegistrationTest(APITestCase):
    """ Test module for POST to login API """

    def setUp(self):
        self.User = User.objects.create_user(username='test1', email="test1@test.com", password='old_password')
        self.token = AuthToken.objects.create(self.User)
        self.valid_payload = {
            "old_password": "old_password",
            "new_password": "new_password"
        }
        self.invalid_payload = {
            "old_password": "bad_password",
            "new_password": "new_password"
        }

    def test_valid_password_change(self):
        client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        response = client.put(
            reverse('change_password'),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_invalid_registration(self):
        client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        response = client.put(
            reverse('change_password'),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
