import json
import uuid
from rest_framework import status
from rest_framework.test import force_authenticate
from rest_framework.test import APIClient
from rest_framework.test import APITestCase
from django.test import TestCase, Client
from django.urls import reverse

from django.contrib.auth.models import AnonymousUser, User

# from ..models import QuestionType
# from ..serializers import QuestionTypeSerializer

# Initialize the APIClient app
client = APIClient()

class UserLoginTest(APITestCase):
    """ Test module for POST to login API """

    def setUp(self):
        self.User1 = User.objects.create_user(username="test1", email="test1@test.com", password="testtesttest123")
        self.valid_payload = {
            "username": "test1",
            "password": "testtesttest123"
        }
        self.invalid_payload = {
            "username": "poop",
            "password": "testtesttest123"
        }

    def test_valid_user_login(self):
        response = client.post(
            reverse('post_login'),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_invalid_user_login(self):
        response = client.post(
            reverse('post_login'),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
