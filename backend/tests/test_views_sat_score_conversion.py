import json
import uuid
from rest_framework import status
from django.test import TestCase, Client
from django.urls import reverse

from ..models import SATScoreConversion, Test, TestType
from ..serializers import SATScoreConversionSerializer

# Initialize the APIClient app
client = Client()

class GetAllSATScoreConversionsTest(TestCase):
    """ Test module for GET all SAT score conversions API """

    def setUp(self):
        self.TestType1 = TestType.objects.create(test_type='Type1')
        self.Test1 = Test.objects.create(test_name='Test1', test_type=self.TestType1)
        self.Test2 = Test.objects.create(test_name='Test2', test_type=self.TestType1)
        self.SATScoreConversion1 = SATScoreConversion.objects.create(
            test=self.Test1,
            num_correct=0,
            math_score=200,
            reading_score=10,
            writing_score=10
        )
        self.SATScoreConversion2 = SATScoreConversion.objects.create(
            test=self.Test2,
            num_correct=1,
            math_score=200,
            reading_score=10,
            writing_score=10
        )
        self.SATScoreConversion3 = SATScoreConversion.objects.create(
            test=self.Test1,
            num_correct=2,
            math_score=210,
            reading_score=10,
            writing_score=10
        )

    def test_get_all_sat_score_conversions(self):
        # Get API response
        response = client.get(reverse('get_post_sat_score_conversions'))
        # Get data from db
        sat_score_conversions = SATScoreConversion.objects.all()
        serializer = SATScoreConversionSerializer(sat_score_conversions, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class GetSingleSATScoreConversionTest(TestCase):
    """ Test module for GET single SAT score conversion API """

    def setUp(self):
        self.TestType1 = TestType.objects.create(test_type='Type1')
        self.Test1 = Test.objects.create(test_name='Test1', test_type=self.TestType1)
        self.Test2 = Test.objects.create(test_name='Test2', test_type=self.TestType1)
        self.SATScoreConversion1 = SATScoreConversion.objects.create(
            test=self.Test1,
            num_correct=0,
            math_score=200,
            reading_score=10,
            writing_score=10
        )
        self.SATScoreConversion2 = SATScoreConversion.objects.create(
            test=self.Test2,
            num_correct=1,
            math_score=200,
            reading_score=10,
            writing_score=10
        )
        self.SATScoreConversion3 = SATScoreConversion.objects.create(
            test=self.Test1,
            num_correct=2,
            math_score=210,
            reading_score=10,
            writing_score=10
        )
    def test_get_valid_single_sat_score_conversion(self):
        # Get API response
        response = client.get(
            reverse('get_delete_update_sat_score_conversion', kwargs={'pk': self.SATScoreConversion1.pk}))
        sat_conversion_chart = SATScoreConversion.objects.get(pk=self.SATScoreConversion1.pk)
        serializer = SATScoreConversionSerializer(sat_conversion_chart)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_invalid_single_sat_score_conversion(self):
        # GET API response
        response = client.get(
            reverse('get_delete_update_sat_score_conversion', kwargs={'pk': -5}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class CreateSingleSATScoreConversionTest(TestCase):
    """ Test module for inserting a new SAT score conversion """

    def setUp(self):
        self.TestType1 = TestType.objects.create(test_type='Type1')
        self.Test1 = Test.objects.create(test_name='Test1', test_type=self.TestType1)
        self.Test2 = Test.objects.create(test_name='Test2', test_type=self.TestType1)
        self.valid_payload = {
            'test': self.Test1.pk,
            'num_correct': 0,
            'math_score': 200,
            'reading_score': 10,
            'writing_score': 10,
        }
        self.invalid_payload = {
            'test': -5,
            'num_correct': 1,
            'math_score': 200,
            'reading_score': 10,
            'writing_score': 10,
        }

    def test_create_valid_sat_score_conversion(self):
        response = client.post(
            reverse('get_post_sat_score_conversions'),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_invalid_sat_score_conversion(self):
        response = client.post(
            reverse('get_post_sat_score_conversions'),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class UpdateSingleSATScoreConversionTest(TestCase):
    """ Test module for updating an existing SAT score conversion record """

    def setUp(self):
        self.TestType1 = TestType.objects.create(test_type='Type1')
        self.Test1 = Test.objects.create(test_name='Test1', test_type=self.TestType1)
        self.Test2 = Test.objects.create(test_name='Test2', test_type=self.TestType1)
        self.SATScoreConversion1 = SATScoreConversion.objects.create(
            test=self.Test1,
            num_correct=0,
            math_score=200,
            reading_score=10,
            writing_score=10
        )
        self.SATScoreConversion2 = SATScoreConversion.objects.create(
            test=self.Test2,
            num_correct=1,
            math_score=200,
            reading_score=10,
            writing_score=10
        )
        self.valid_payload = {
            'test': self.Test1.pk,
            'num_correct': 0,
            'math_score': 200,
            'reading_score': 10,
            'writing_score': 10,
        }
        self.invalid_payload = {
            'test': -5,
            'num_correct': 1,
            'math_score': 200,
            'reading_score': 10,
            'writing_score': 10,
        }

    def test_update_valid_sat_score_conversion(self):
        response = client.put(
            reverse('get_delete_update_sat_score_conversion', kwargs={'pk': self.SATScoreConversion1.pk}),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_update_invalid_sat_score_conversion(self):
        response = client.put(
            reverse('get_delete_update_sat_score_conversion', kwargs={'pk': self.SATScoreConversion1.pk}),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class DeleteSingleSATScoreConversionTest(TestCase):
    """ Test module for deleting an existing SAT score conversion """

    def setUp(self):
        self.TestType1 = TestType.objects.create(test_type='Type1')
        self.Test1 = Test.objects.create(test_name='Test1', test_type=self.TestType1)
        self.Test2 = Test.objects.create(test_name='Test2', test_type=self.TestType1)
        self.SATScoreConversion1 = SATScoreConversion.objects.create(
            test=self.Test1,
            num_correct=0,
            math_score=200,
            reading_score=10,
            writing_score=10
        )
        self.SATScoreConversion2 = SATScoreConversion.objects.create(
            test=self.Test2,
            num_correct=1,
            math_score=200,
            reading_score=10,
            writing_score=10
        )

    def test_delete_valid_sat_score_conversion(self):
        response = client.delete(
            reverse('get_delete_update_sat_score_conversion', kwargs={'pk': self.SATScoreConversion1.pk}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_invalid_sat_score_conversion(self):
        response = client.delete(
            reverse('get_delete_update_sat_score_conversion', kwargs={'pk': -5}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
