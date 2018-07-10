import json
import uuid
from rest_framework import status
from django.test import TestCase, Client
from django.urls import reverse

from ..models import TestType
from ..serializers import TestTypeSerializer

# Initialize the APIClient app
client = Client()

class GetAllTestTypesTest(TestCase):
    """ Test module for GET all test types API """

    def setUp(self):
        self.TestType1 = TestType.objects.create(test_type='TestType1')
        self.TestType2 = TestType.objects.create(test_type='TestType2')
        self.TestType3 = TestType.objects.create(test_type='TestType3')

    def test_get_all_test_types(self):
        # Get API response
        response = client.get(reverse('get_post_test_types'))
        # Get data from db
        test_types = TestType.objects.all()
        serializer = TestTypeSerializer(test_types, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class GetSingleTestTypeTest(TestCase):
    """ Test module for GET single test type API """

    def setUp(self):
        self.TestType1 = TestType.objects.create(test_type='TestType1')
        self.TestType2 = TestType.objects.create(test_type='TestType2')
        self.TestType3 = TestType.objects.create(test_type='TestType3')

    def test_get_valid_single_test_type(self):
        # Get API response
        response = client.get(
            reverse('get_delete_update_test_type', kwargs={'pk': self.TestType1.pk}))
        test_type = TestType.objects.get(pk=self.TestType1.pk)
        serializer = TestTypeSerializer(test_type)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_invalid_single_test_type(self):
        # GET API response
        response = client.get(
            reverse('get_delete_update_test_type', kwargs={'pk': -5}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class CreateSingleTestTestType(TestCase):
    """ Test module for inserting a new test type """

    def setUp(self):
        self.valid_payload = {
            'test_type': 'SAT_2016'
        }
        self.invalid_payload = {
            'test_type': ''
        }

    def test_create_valid_test_type(self):
        response = client.post(
            reverse('get_post_test_types'),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_invalid_test_type(self):
        response = client.post(
            reverse('get_post_test_types'),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class UpdateSingleTestTestType(TestCase):
    """ Test module for updating an existing test record """

    def setUp(self):
        self.TestType1 = TestType.objects.create(test_type='TestType1')
        self.TestType2 = TestType.objects.create(test_type='TestType2')
        self.valid_payload = {
            'test_type': 'SAT_2016'
        }
        self.invalid_payload = {
            'test_type': ''
        }

    def test_update_valid_test_type(self):
        response = client.put(
            reverse('get_delete_update_test_type', kwargs={'pk': self.TestType1.pk}),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_update_invalid_test_type(self):
        response = client.put(
            reverse('get_delete_update_test_type', kwargs={'pk': self.TestType1.pk}),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class DeleteSingleTestTestType(TestCase):
    """ Test module for deleting an existing test record """

    def setUp(self):
        self.TestType1 = TestType.objects.create(test_type='TestType1')
        self.TestType2 = TestType.objects.create(test_type='TestType2')

    def test_delete_valid_test_type(self):
        response = client.delete(
            reverse('get_delete_update_test_type', kwargs={'pk': self.TestType1.pk}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_invalid_test_type(self):
        response = client.delete(
            reverse('get_delete_update_test_type', kwargs={'pk': -5}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
