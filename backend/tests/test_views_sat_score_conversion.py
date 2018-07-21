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
