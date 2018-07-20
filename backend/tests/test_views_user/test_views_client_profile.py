import json
import uuid
import datetime
from rest_framework import status
from rest_framework.test import force_authenticate
from rest_framework.test import APIClient
from rest_framework.test import APITestCase
from django.test import TestCase, Client
from django.urls import reverse

from knox.models import AuthToken

from django.contrib.auth.models import AnonymousUser, User

from ...models import ClientProfile
from ...serializers import ClientProfileSerializer, UserSerializer

# Initialize the APIClient app
client = APIClient()

class ClientProfileAPIViewTest(APITestCase):
    """ Test module for POST to User Profile API """

    def setUp(self):
        self.User = User.objects.create_user(
            username='test1',
            email="test1@test.com",
            password='old_password',
            first_name='Test',
            last_name='McTestson')
        self.User2 = User.objects.create_user(
            username='test2',
            email="test2@test.com",
            password='old_password',
            first_name='Test',
            last_name='McTestson')
        self.Tutor = User.objects.create_user(
            username='tutor',
            email='tutor@tutor.com',
            password='tutor_pass',
            first_name='Tutes',
            last_name='Magoo'
        )
        self.ClientProfile = ClientProfile.objects.create(
            id = self.User,
            tutor = self.Tutor,
            client_type = 'SAT',
            enrollment_status = 'active',
            pay_rate = 150,
            purchased_hours = 24,
            delivered_hours = 4,
            focus_area_1 = 'May SAT',
            focus_area_2 = 'August SAT',
            focus_area_3 = 'College Counseling',
            address = '123 Fake St',
            city = 'San Francisco',
            state = 'CA',
            zip = 12345,
            country = 'USA',
            client_phone = '(415) 293-5396',
            parent_phone = '(415) 456-9892',
            parent_email = 'parent@email.com',
            SAT_diagnostic_score = 1050,
            SAT_diagnostic_reading_writing = 580,
            SAT_diagnostic_math = 470,
            SAT_diagnostic_essay = '1-1-1',
            SAT_best_practice = 1200,
            SAT_best_practice_reading_writing = 600,
            SAT_best_practice_math = 600,
            SAT_best_practice_essay = '1-2-3',
            SAT_best_official = 1400,
            SAT_best_official_reading_writing = 700,
            SAT_best_official_math = 700,
            SAT_best_official_essay = '3-4-3',
            LSAT_diagnostic_score = 75,
            LSAT_best_practice = 80,
            LSAT_best_official = 95,
            ACT_diagnostic_score = 24,
            ACT_best_practice = 30,
            ACT_best_official = 36,
            colleges_accepted = 'Stanford, MIT',
            college_matriculated = 'Stanford',
            scholarship_awarded = '$5400',
            law_schools_accepted = 'Yale, Harvard',
            law_school_matriculated = 'Yale'
        )
        self.token = AuthToken.objects.create(self.User)
        self.valid_create_payload = {
            "id": self.User2.pk,
            "tutor": self.Tutor.pk,
            "client_type": "SAT",
            "enrollment_status": "active",
            "pay_rate": 150,
            "purchased_hours": 25,
            "delivered_hours": 0,
            "focus_area_1": "June SAT",
            "focus_area_2": "August SAT",
            "focus_area_3": "College Counseling",
            "address": "123 Real Street",
            "city": "San Francisco",
            "state": "CA",
            "zip": 94501,
            "country": "USA",
            "client_phone": "(917) 123-4567",
            "parent_phone": "(917) 456-1789",
            "parent_email": "parent@email.com",
            "SAT_diagnostic_score": 1050,
            "SAT_diagnostic_reading_writing": 580,
            "SAT_diagnostic_math": 470,
            "SAT_diagnostic_essay": '',
            "SAT_best_practice": 0,
            "SAT_best_practice_reading_writing": 0,
            "SAT_best_practice_math": 0,
            "SAT_best_practice_essay": '',
            "SAT_best_official": 0,
            "SAT_best_official_reading_writing": 0,
            "SAT_best_official_math": 0,
            "SAT_best_official_essay": '',
            "LSAT_diagnostic_score": 0,
            "LSAT_best_practice": 0,
            "LSAT_best_official": 0,
            "ACT_diagnostic_score": 0,
            "ACT_best_practice": 0,
            "ACT_best_official": 0,
            "colleges_accepted": "",
            "college_matriculated": "",
            "scholarship_awarded": "",
            "law_schools_accepted": "",
            "law_school_matriculated": "",
            "notes": ""
        }
        self.valid_update_payload = {
            "user": self.User.pk,
            "SAT_best_practice": 1050,
            "SAT_best_practice_reading_writing": 580,
            "SAT_best_practice_math": 470,
            "SAT_best_practice_essay": "3-4-3"
        }
        self.invalid_payload = {
            "blahblah": "blah"
        }

    def test_get_all_client_profiles(self):
        client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        response = client.get(reverse('client_profile-list'))
        client_profiles = ClientProfile.objects.all()
        serializer = ClientProfileSerializer(client_profiles, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_single_valid_client_profile(self):
        client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        response = client.get(reverse('client_profile-detail', kwargs={'pk': self.User.pk}))
        client_profile = ClientProfile.objects.get(pk=self.User.pk)
        serializer = ClientProfileSerializer(client_profile)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_single_invalid_client_profile(self):
        client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        response = client.get(reverse('client_profile-detail', kwargs={'pk': 90123}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_create_valid_client_profile(self):
        client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        response = client.post(
            reverse('client_profile-list'),
            data=json.dumps(self.valid_create_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_invalid_client_profile(self):
        client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        response = client.post(
            reverse('client_profile-list'),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_valid_update_client_profile(self):
        client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        response = client.patch(
            reverse('client_profile-detail', kwargs={'pk': self.User.pk}),
            data=json.dumps(self.valid_update_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_invalid_update_client_profile(self):
        client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        response = client.patch(
            reverse('client_profile-detail', kwargs={'pk': 123412341}),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_valid_client_profile(self):
        client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        response = client.delete(
            reverse('client_profile-detail', kwargs={'pk': self.User.pk}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_invalid_client_profile(self):
        client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        response = client.delete(
            reverse('client_profile-detail', kwargs={'pk': 123132515}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
