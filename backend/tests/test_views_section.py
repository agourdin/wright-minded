import json
from rest_framework import status
from rest_framework.test import APIClient, APITestCase
from django.test import TestCase, Client
from django.urls import reverse

from knox.models import AuthToken

from django.contrib.auth.models import AnonymousUser, User

from ..models import Section
from ..serializers import SectionSerializer

# Initialize the APIClient app
client = APIClient()

class GET_SectionViewTest(TestCase):
    """ Test module for GET Section API """

    def setUp(self):
        self.Section1 = Section.objects.create(section_name='Section1')
        self.Section2 = Section.objects.create(section_name='Section2')
        self.Section3 = Section.objects.create(section_name='Section3')

    def test_get_all_question_type_groups(self):
        response = self.client.get(reverse('section-list'))
        sections = Section.objects.all()
        serializer = SectionSerializer(sections, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_single_valid_section(self):
        response = self.client.get(reverse('section-detail', kwargs={'pk': self.Section1.pk}))
        section = Section.objects.get(pk=self.Section1.pk)
        serializer = SectionSerializer(section)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_single_invalid_section(self):
        response = self.client.get(reverse('section-detail', kwargs={'pk': 90123}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class CREATE_UPDATE_DELETE_SectionViewTest(APITestCase):
    """ Test module for POST, PUT, DELETE Section API """

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
        self.token = AuthToken.objects.create(self.Superuser)
        self.Section1 = Section.objects.create(section_name='Section1')
        self.Section2 = Section.objects.create(section_name='Section2')
        self.valid_create_payload = {
            'section_name': 'Reading'
        }
        self.valid_update_payload = {
            'section_name': 'Writing'
        }
        self.invalid_payload = {
            'section_name': ''
        }

    def test_create_valid_section(self):
        client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        response = client.post(
            reverse('section-list'),
            data=json.dumps(self.valid_create_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_invalid_section(self):
        client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        response = client.post(
            reverse('section-list'),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_valid_update_section(self):
        client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        response = client.patch(
            reverse('section-detail', kwargs={'pk': self.Section1.pk}),
            data=json.dumps(self.valid_update_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_invalid_update_section(self):
        client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        response = client.patch(
            reverse('section-detail', kwargs={'pk': 123412341}),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_valid_section(self):
        client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        response = client.delete(
            reverse('section-detail', kwargs={'pk': self.Section1.pk}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_invalid_section(self):
        client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        response = client.delete(
            reverse('section-detail', kwargs={'pk': 123132515}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
