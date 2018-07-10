import json
import uuid
from rest_framework import status
from django.test import TestCase, Client
from django.urls import reverse

from ..models import Section
from ..serializers import SectionSerializer

# Initialize the APIClient app
client = Client()

class GetAllSectionsTest(TestCase):
    """ Test module for GET all test types API """

    def setUp(self):
        self.Section1 = Section.objects.create(section_name='Section1')
        self.Section2 = Section.objects.create(section_name='Section2')
        self.Section3 = Section.objects.create(section_name='Section3')

    def test_get_all_sections(self):
        # Get API response
        response = client.get(reverse('get_post_sections'))
        # Get data from db
        sections = Section.objects.all()
        serializer = SectionSerializer(sections, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class GetSingleSectionTest(TestCase):
    """ Test module for GET single test type API """

    def setUp(self):
        self.Section1 = Section.objects.create(section_name='Section1')
        self.Section2 = Section.objects.create(section_name='Section2')
        self.Section3 = Section.objects.create(section_name='Section3')

    def test_get_valid_single_section(self):
        # Get API response
        response = client.get(
            reverse('get_delete_update_section', kwargs={'pk': self.Section1.pk}))
        section = Section.objects.get(pk=self.Section1.pk)
        serializer = SectionSerializer(section)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_invalid_single_section(self):
        # GET API response
        response = client.get(
            reverse('get_delete_update_section', kwargs={'pk': -5}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class CreateSingleSectionTest(TestCase):
    """ Test module for inserting a new test type """

    def setUp(self):
        self.valid_payload = {
            'section_name': 'SAT_2016'
        }
        self.invalid_payload = {
            'section_name': ''
        }

    def test_create_valid_section(self):
        response = client.post(
            reverse('get_post_sections'),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_invalid_section(self):
        response = client.post(
            reverse('get_post_sections'),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class UpdateSingleSectionTest(TestCase):
    """ Test module for updating an existing test record """

    def setUp(self):
        self.Section1 = Section.objects.create(section_name='Section1')
        self.Section2 = Section.objects.create(section_name='Section2')
        self.valid_payload = {
            'section_name': 'SAT_2016'
        }
        self.invalid_payload = {
            'section_name': ''
        }

    def test_update_valid_section(self):
        response = client.put(
            reverse('get_delete_update_section', kwargs={'pk': self.Section1.pk}),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_update_invalid_section(self):
        response = client.put(
            reverse('get_delete_update_section', kwargs={'pk': self.Section1.pk}),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class DeleteSingleSectionTest(TestCase):
    """ Test module for deleting an existing test record """

    def setUp(self):
        self.Section1 = Section.objects.create(section_name='Section1')
        self.Section2 = Section.objects.create(section_name='Section2')

    def test_delete_valid_section(self):
        response = client.delete(
            reverse('get_delete_update_section', kwargs={'pk': self.Section1.pk}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_invalid_section(self):
        response = client.delete(
            reverse('get_delete_update_section', kwargs={'pk': -5}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
