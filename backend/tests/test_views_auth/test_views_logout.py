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

class UserLogoutTest(APITestCase):
    """ Test module for POST to logout API """

    def setUp(self):
        self.User1 = User.objects.create_user(username="test1", email="test1@test.com", password="testtesttest123")
        self.token1 = AuthToken.objects.create(self.User1)
        self.valid_payload = {}
        self.invalid_payload = {
            "username": "poop",
            "password": "testtesttest123"
        }

    def test_valid_user_login(self):
        client.credentials(HTTP_AUTHORIZATION='Token ' + self.token1)
        response = client.post(
            reverse('post_logout'),
            "",
            # data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_invalid_user_login(self):
        response = client.post(
            reverse('post_logout'),
            "",
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
