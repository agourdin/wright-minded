from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from ..models import Section
from ..serializers import SectionSerializer


##### SECTION ##################################################################

@api_view(['GET', 'DELETE', 'PUT'])
def get_delete_update_section(request, pk):
    try:
        section = Section.objects.get(pk=pk)
    except Section.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # GET details of a single test
    if request.method == 'GET':
        serializer = SectionSerializer(section)
        return Response(serializer.data)

    # DELETE a single test
    elif request.method == 'DELETE':
        section.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    # UPDATE details of a single test
    elif request.method == 'PUT':
        serializer = SectionSerializer(section, data=request.data)
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def get_post_sections(request):
    # get all tests
    if request.method == 'GET':
        sections = Section.objects.all()
        serializer = SectionSerializer(sections, many=True)
        return Response(serializer.data)

    # insert a new record for a test
    elif request.method == 'POST':
        data = {
            'section_name': request.data.get('section_name')
        }
        serializer = SectionSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
