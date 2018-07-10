import json
import uuid
from rest_framework import status
from django.test import TestCase, Client
from django.urls import reverse

from ..models import Test, TestType
from ..serializers import AvailableTestsSerializer

# Initialize the APIClient app
client = Client()

class GetAllAvailableTestsTest(TestCase):
    """ Test module for GET all tests API """

    def setUp(self):
        self.TestType1 = TestType.objects.create(test_type='Type1')
        self.TestType2 = TestType.objects.create(test_type='Type2')
        self.Test1 = Test.objects.create(test_name='Test1', test_type=self.TestType1)
        self.Test2 = Test.objects.create(test_name='Test2', test_type=self.TestType2)
        self.Test3 = Test.objects.create(test_name='Test3', test_type=self.TestType2)

    def test_get_all_available_tests(self):
        # Get API response
        response = client.get(reverse('get_available_tests'))
        # Get data from db
        tests = Test.objects.all()
        serializer = AvailableTestsSerializer(tests, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class CreateAvailbleTestsTest(TestCase):
    """ Test module for blocking POST to available tests API """

    def setUp(self):
        self.valid_payload = [
            {
                "id": 1,
                "test_name": "SAT Practice Test #1",
                "test_type": 1
            },
            {
                "id": 2,
                "test_name": "SAT Practice Test #2",
                "test_type": 1
            },
            {
                "id": 3,
                "test_name": "SAT Practice Test #3",
                "test_type": 1
            }
        ]

    def test_cannot_create_test_answer(self):
        response = client.post(
            reverse('get_available_tests'),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
