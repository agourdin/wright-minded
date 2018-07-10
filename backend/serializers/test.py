from rest_framework import serializers
from drf_writable_nested import WritableNestedModelSerializer

from ..models import (
    Test,
    TestType,
    Section,
    Question,
    QuestionType,
    QuestionTypeGroup,
    UserAnswer,
    SATScoreConversion
)



### SECTION ####################################################################

class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = ('id', 'section_name')


### Question ###################################################################

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = (
            'test',
            'section_num',
            'section_name',
            'question_num',
            'question_type',
            'input_type',
            'answer'
        )

class QuestionTypeGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionTypeGroup
        fields = (
            'id',
            'question_type_group',
        )

class QuestionTypeInfoSerializer(serializers.ModelSerializer):
    question_type_group = QuestionTypeGroupSerializer(many=False)
    class Meta:
        model = QuestionType
        fields = (
            'id',
            'question_type',
            'question_type_group',
        )

class QuestionTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionType
        fields = (
            'id',
            'question_type',
            'question_type_group',
        )

# OLD WORKING VERSION
# class QuestionTypeSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = QuestionType
#         fields = (
#             'id',
#             'question_type',
#         )

class QuestionInfoSerializer(serializers.ModelSerializer):
    section_name = serializers.StringRelatedField(many=False)
    question_type = QuestionTypeInfoSerializer(many=False)

    class Meta:
        model = Question
        fields = (
            'id',
            'section_num',
            'section_name',
            'question_num',
            'question_type',
            'input_type',
            'num_inputs',
            'answer'
        )

class QuestionAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = [
            'answer'
        ]


### TEST TYPE ##################################################################

class TestTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestType
        fields = (
            'id',
            'test_type'
        )


### TEST #######################################################################

class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = (
            'id',
            'test_name',
            'test_type',
            'created_at',
            'updated_at'
        )

class TestInfoSerializer(serializers.ModelSerializer):
    test_type = TestTypeSerializer(many=False)
    questions = QuestionInfoSerializer(many=True, source='question_set')

    class Meta:
        model = Test
        fields = (
            'id',
            'test_name',
            'test_type',
            'created_at',
            'updated_at',
            'questions'
        )

class TestAnswersSerializer(serializers.ModelSerializer):
    test_type = TestTypeSerializer(many=False)
    answers = QuestionAnswerSerializer(many=True, source='question_set')
    class Meta:
        model = Test
        fields = (
            'id',
            'test_name',
            'test_type',
            'answers'
        )

class AvailableTestsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = (
            'id',
            'test_name',
            'test_type'
        )




### USER ANSWER ################################################################

class UserAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAnswer
        fields = (
            'id',
            'user',
            'test',
            'encoded_answer',
            'encoder_string'
        )

class UserAnswerInfoSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(many=False)
    test = serializers.StringRelatedField(many=False)

    class Meta:
        model = UserAnswer
        fields = (
            'id',
            'user',
            'test',
            'encoded_answer',
            'encoder_string'
        )


### SAT SCORE CONVERSION #######################################################

class SATScoreConversionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SATScoreConversion
        fields = (
            'id',
            'test',
            'num_correct',
            'math_score',
            'reading_score',
            'writing_score'
        )
