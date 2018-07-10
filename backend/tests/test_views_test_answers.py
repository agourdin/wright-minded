import json
import uuid
from rest_framework import status
from django.test import TestCase, Client
from django.urls import reverse

from ..models import Test, TestType
from ..serializers import TestAnswersSerializer

# Initialize the APIClient app
client = Client()

class GetAllTestAnswersTest(TestCase):
    """ Test module for GET all tests API """

    def setUp(self):
        self.TestType1 = TestType.objects.create(test_type='Type1')
        self.TestType2 = TestType.objects.create(test_type='Type2')
        self.Test1 = Test.objects.create(test_name='Test1', test_type=self.TestType1)
        self.Test2 = Test.objects.create(test_name='Test2', test_type=self.TestType2)
        self.Test3 = Test.objects.create(test_name='Test3', test_type=self.TestType2)

    def test_get_all_test_answers(self):
        # Get API response
        response = client.get(reverse('get_test_answers'))
        # Get data from db
        tests = Test.objects.all()
        serializer = TestAnswersSerializer(tests, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class GetSingleTestAnswerTest(TestCase):
    """ Test module for GET single test API """

    def setUp(self):
        self.TestType1 = TestType.objects.create(test_type='Type1')
        self.TestType2 = TestType.objects.create(test_type='Type2')
        self.Test1 = Test.objects.create(test_name='Test1', test_type=self.TestType1)
        self.Test2 = Test.objects.create(test_name='Test2', test_type=self.TestType2)

    def test_get_valid_single_test_answer(self):
        # Get API response
        response = client.get(
            reverse('get_test_answer', kwargs={'pk': self.Test1.pk}))
        test = Test.objects.get(pk=self.Test1.pk)
        serializer = TestAnswersSerializer(test)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_invalid_single_test_answer(self):
        # GET API response
        response = client.get(
            reverse('get_test_answer', kwargs={'pk': 30}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


# class CreateSingleTestAnswersTest(TestCase):
#     """ Test module for blocking POST to test answer API """
#
#     def setUp(self):
#         self.invalid_payload = {
#             'test_name': None,
#             'test_type': '',
#             'questions': []
#         }
#
#     def test_cannot_create_test_answer(self):
#         response = client.post(
#             reverse('get_test_answers'),
#             data=json.dumps(self.invalid_payload),
#             content_type='application/json'
#         )
#         self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
#
#
# class UpdateSingleTestTest(TestCase):
#     """ Test module for blocking PUT to test answer API """
#
#     def setUp(self):
#         self.valid_payload = {
#             'test_name': None,
#             'test_type': ''
#             'questions': []
#         }
#
#     def test_cannot_update_test_answer(self):
#         response = client.put(
#             reverse('get_test_answer', kwargs={'pk': 1}),
#             data=json.dumps(self.valid_payload),
#             content_type='application/json'
#         )
#         self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
#
#
# class DeleteSingleTestTest(TestCase):
#     """ Test module for blocking DELETE to test answer API """
#
#     def setUp(self):
#         self.TestType1 = TestType.objects.create(test_type='Type1')
#         self.TestType2 = TestType.objects.create(test_type='Type2')
#         self.Test1 = Test.objects.create(test_name='Test1', test_type=self.TestType1)
#         self.Test2 = Test.objects.create(test_name='Test2', test_type=self.TestType2)
#
#     def test_delete_valid_test(self):
#         response = client.delete(
#             reverse('get_delete_update_test', kwargs={'pk': self.Test1.pk}))
#         self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
#
#     def test_delete_invalid_test(self):
#         response = client.delete(
#             reverse('get_delete_update_test', kwargs={'pk': 30}))
#         self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
