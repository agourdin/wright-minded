import json
from rest_framework import status
from rest_framework.test import APIClient, APITestCase
from django.test import TestCase, Client
from django.urls import reverse

from knox.models import AuthToken

from django.contrib.auth.models import AnonymousUser, User

from ..models import UserAnswer, Test, TestType
from ..serializers import UserAnswerSerializer, UserAnswerInfoSerializer

# Initialize the APIClient app
client = APIClient()

class POST_UserAnswerViewTest(TestCase):
    """ Test module for POST User Answer API """

    def setUp(self):
        self.TestType1 = TestType.objects.create(test_type='Type1')
        self.TestType2 = TestType.objects.create(test_type='Type2')
        self.Test1 = Test.objects.create(test_name='Test1', test_type=self.TestType1)
        self.Test2 = Test.objects.create(test_name='Test2', test_type=self.TestType2)
        self.User1 = User.objects.create()
        self.valid_payload_with_user = {
            'user': self.User1.pk,
            'test': self.Test1.pk,
            'answer': 'A/!*B/!*C/!*D/!*B/!*C/!*D/!*D/!*B'
        }
        self.valid_payload_without_user = {
            'user': None,
            'test': self.Test1.pk,
            'answer': 'A/!*B/!*C/!*D/!*B/!*C/!*D/!*D/!*B'
        }
        self.invalid_payload = {
            'user': self.User1.pk,
            'test': 40,
            'answer': 'A/!*B/!*C/!*D/!*B/!*C/!*D/!*D/!*B'
        }

    def test_create_valid_user_answer_with_user(self):
        response = self.client.post(
            reverse('user_answer-list'),
            data=json.dumps(self.valid_payload_with_user),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_valid_user_answer_without_user(self):
        response = self.client.post(
            reverse('user_answer-list'),
            data=json.dumps(self.valid_payload_without_user),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_invalid_user_answer(self):
        response = self.client.post(
            reverse('user_answer-list'),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class GET_UPDATE_DELETE_UserAnswerViewTest(APITestCase):
    """ Test module for GET, PUT, DELETE Question Type Group API """

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
        self.user_token = AuthToken.objects.create(self.User)
        self.superuser_token = AuthToken.objects.create(self.Superuser)
        self.TestType1 = TestType.objects.create(test_type='Type1')
        self.TestType2 = TestType.objects.create(test_type='Type2')
        self.Test1 = Test.objects.create(test_name='Test1', test_type=self.TestType1)
        self.Test2 = Test.objects.create(test_name='Test2', test_type=self.TestType2)
        self.User2 = User.objects.create()
        self.UserAnswer1 = UserAnswer.objects.create(
            user=self.User,
            test=self.Test1,
            answer='A/!*B/!*C/!*D/!*B/!*C/!*D/!*D/!*B')
        self.UserAnswer2 = UserAnswer.objects.create(
            user=self.User,
            test=self.Test1,
            answer='A/!*B/!*C/!*D/!*B/!*C/!*D/!*D/!*B')
        self.UserAnswer3 = UserAnswer.objects.create(
            user=self.User2,
            test=self.Test2,
            answer='A/!*B/!*C/!*D/!*B/!*C/!*D/!*D/!*B')
        self.valid_update_payload = {
            'test': self.Test2.pk,
            'answer': 'A/!*B/!*C/!*D/!*B/!*C/!*D/!*D/!*B'
        }
        self.invalid_payload = {
            'user': self.User.pk,
            'test': 40,
            'answer': 'A/!*B/!*C/!*D/!*B/!*C/!*D/!*D/!*B'
        }

    def test_get_all_user_answers_as_admin(self):
        client.credentials(HTTP_AUTHORIZATION='Token ' + self.superuser_token)
        response = client.get(reverse('user_answer-list'))
        user_answers = UserAnswer.objects.all()
        serializer = UserAnswerInfoSerializer(user_answers, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_single_valid_user_answer_as_admin(self):
        client.credentials(HTTP_AUTHORIZATION='Token ' + self.superuser_token)
        response = client.get(reverse('user_answer-detail', kwargs={'pk': self.UserAnswer1.pk}))
        user_answer = UserAnswer.objects.get(pk=self.UserAnswer1.pk)
        serializer = UserAnswerInfoSerializer(user_answer)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_own_user_answers_as_user(self):
        client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token)
        response = client.get(reverse('user_answers_with_param') + '?userid=' + str(self.User.pk))
        user_answers = UserAnswer.objects.all().filter(user=self.User.pk)
        serializer = UserAnswerInfoSerializer(user_answers, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_other_user_answers_as_user(self):
        client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token)
        response = client.get(reverse('user_answers_with_param') + '?userid=' + str(self.User2.pk))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_get_all_user_answers_as_user(self):
        client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token)
        response = client.get(reverse('user_answer-list'))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_get_single_user_answer_as_user(self):
        client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token)
        response = client.get(reverse('user_answer-detail', kwargs={'pk': self.UserAnswer1.pk}))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_get_single_invalid_user_answer(self):
        client.credentials(HTTP_AUTHORIZATION='Token ' + self.superuser_token)
        response = client.get(reverse('user_answer-detail', kwargs={'pk': 90123}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_valid_update_user_answer(self):
        client.credentials(HTTP_AUTHORIZATION='Token ' + self.superuser_token)
        response = client.patch(
            reverse('user_answer-detail', kwargs={'pk': self.UserAnswer1.pk}),
            data=json.dumps(self.valid_update_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_invalid_update_question_type_group(self):
        client.credentials(HTTP_AUTHORIZATION='Token ' + self.superuser_token)
        response = client.patch(
            reverse('user_answer-detail', kwargs={'pk': 123412341}),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_valid_question_type_group(self):
        client.credentials(HTTP_AUTHORIZATION='Token ' + self.superuser_token)
        response = client.delete(
            reverse('user_answer-detail', kwargs={'pk': self.UserAnswer1.pk}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_invalid_question_type_group(self):
        client.credentials(HTTP_AUTHORIZATION='Token ' + self.superuser_token)
        response = client.delete(
            reverse('user_answer-detail', kwargs={'pk': 123132515}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
