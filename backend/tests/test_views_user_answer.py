import json
import uuid
from rest_framework import status
from django.contrib.auth.models import AnonymousUser, User
from django.test import TestCase, Client
from django.urls import reverse

from ..models import Test, TestType, UserAnswer
from ..serializers import UserAnswerSerializer, UserAnswerInfoSerializer

# Initialize the APIClient app
client = Client()

class GetAllUserAnswersTest(TestCase):
    """ Test module for GET all user answers API """

    def setUp(self):
        self.TestType1 = TestType.objects.create(test_type='Type1')
        self.TestType2 = TestType.objects.create(test_type='Type2')
        self.Test1 = Test.objects.create(test_name='Test1', test_type=self.TestType1)
        self.Test2 = Test.objects.create(test_name='Test2', test_type=self.TestType2)
        self.User1 = User.objects.create()
        self.UserAnswer1 = UserAnswer.objects.create(
            user=self.User1,
            test=self.Test1,
            answer='A/!*B/!*C/!*D/!*B/!*C/!*D/!*D/!*B')
        self.UserAnswer2 = UserAnswer.objects.create(
            user=self.User1,
            test=self.Test2,
            answer='A/!*B/!*C/!*D/!*B/!*C/!*D/!*D/!*B')

    def test_get_all_user_answers(self):
        # Get API response
        response = client.get(reverse('get_post_user_answers'))
        # Get data from db
        user_answers = UserAnswer.objects.all()
        serializer = UserAnswerInfoSerializer(user_answers, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class GetSingleUserAnswerTest(TestCase):
    """ Test module for GET single user answer API """

    def setUp(self):
        self.TestType1 = TestType.objects.create(test_type='Type1')
        self.TestType2 = TestType.objects.create(test_type='Type2')
        self.Test1 = Test.objects.create(test_name='Test1', test_type=self.TestType1)
        self.Test2 = Test.objects.create(test_name='Test2', test_type=self.TestType2)
        self.User1 = User.objects.create()
        self.UserAnswer1 = UserAnswer.objects.create(
            user=self.User1,
            test=self.Test1,
            answer='A/!*B/!*C/!*D/!*B/!*C/!*D/!*D/!*B')
        self.UserAnswer2 = UserAnswer.objects.create(
            user=self.User1,
            test=self.Test2,
            answer='A/!*B/!*C/!*D/!*B/!*C/!*D/!*D/!*B')

    def test_get_valid_single_user_answer(self):
        # Get API response
        response = client.get(
            reverse('get_delete_update_user_answer', kwargs={'pk': self.UserAnswer1.pk}))
        user_answer = UserAnswer.objects.get(pk=self.UserAnswer1.pk)
        serializer = UserAnswerInfoSerializer(user_answer)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_invalid_single_user_answer(self):
        # GET API response
        response = client.get(
            reverse('get_delete_update_user_answer', kwargs={'pk': 30}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class CreateSingleUserAnswerTest(TestCase):
    """ Test module for inserting a new user answer """

    def setUp(self):
        self.TestType1 = TestType.objects.create(test_type='Type1')
        self.TestType2 = TestType.objects.create(test_type='Type2')
        self.Test1 = Test.objects.create(test_name='Test1', test_type=self.TestType1)
        self.Test2 = Test.objects.create(test_name='Test2', test_type=self.TestType2)
        self.User1 = User.objects.create()
        self.valid_payload = {
            'user': self.User1.pk,
            'test': self.Test1.pk,
            'answer': 'A/!*B/!*C/!*D/!*B/!*C/!*D/!*D/!*B'
        }
        self.invalid_payload = {
            'user': self.User1.pk,
            'test': 40,
            'answer': 'A/!*B/!*C/!*D/!*B/!*C/!*D/!*D/!*B'
        }

    def test_create_valid_user_answer(self):
        response = client.post(
            reverse('get_post_user_answers'),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_invalid_user_answer(self):
        response = client.post(
            reverse('get_post_user_answers'),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class UpdateSingleUserAnswerTest(TestCase):
    """ Test module for updating an existing user answer record """

    def setUp(self):
        self.TestType1 = TestType.objects.create(test_type='Type1')
        self.TestType2 = TestType.objects.create(test_type='Type2')
        self.Test1 = Test.objects.create(test_name='Test1', test_type=self.TestType1)
        self.Test2 = Test.objects.create(test_name='Test2', test_type=self.TestType2)
        self.User1 = User.objects.create()
        self.UserAnswer1 = UserAnswer.objects.create(
            user=self.User1,
            test=self.Test1,
            answer='A/!*B/!*C/!*D/!*B/!*C/!*D/!*D/!*B')
        self.UserAnswer2 = UserAnswer.objects.create(
            user=self.User1,
            test=self.Test2,
            answer='A/!*B/!*C/!*D/!*B/!*C/!*D/!*D/!*B')
        self.valid_payload = {
            'user': self.User1.pk,
            'test': self.Test1.pk,
            'answer': 'A/!*B/!*C/!*D/!*B/!*C/!*D/!*D/!*B'
        }
        self.invalid_payload = {
            'user': self.User1.pk,
            'test': 40,
            'answer': 'A/!*B/!*C/!*D/!*B/!*C/!*D/!*D/!*B'
        }

    def test_update_valid_user_answer(self):
        response = client.put(
            reverse('get_delete_update_user_answer', kwargs={'pk': self.UserAnswer1.pk}),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_update_invalid_user_answer(self):
        response = client.put(
            reverse('get_delete_update_user_answer', kwargs={'pk': self.UserAnswer1.pk}),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class DeleteSingleUserAnswerTest(TestCase):
    """ Test module for deleting an existing user answer record """

    def setUp(self):
        self.TestType1 = TestType.objects.create(test_type='Type1')
        self.TestType2 = TestType.objects.create(test_type='Type2')
        self.Test1 = Test.objects.create(test_name='Test1', test_type=self.TestType1)
        self.Test2 = Test.objects.create(test_name='Test2', test_type=self.TestType2)
        self.User1 = User.objects.create()
        self.UserAnswer1 = UserAnswer.objects.create(
            user=self.User1,
            test=self.Test1,
            answer='A/!*B/!*C/!*D/!*B/!*C/!*D/!*D/!*B')
        self.UserAnswer2 = UserAnswer.objects.create(
            user=self.User1,
            test=self.Test2,
            answer='A/!*B/!*C/!*D/!*B/!*C/!*D/!*D/!*B')

    def test_delete_valid_user_answer(self):
        response = client.delete(
            reverse('get_delete_update_user_answer', kwargs={'pk': self.UserAnswer1.pk}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_invalid_user_answer(self):
        response = client.delete(
            reverse('get_delete_update_user_answer', kwargs={'pk': 30}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
