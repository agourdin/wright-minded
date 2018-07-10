import uuid
from django.db import models
from django.contrib.auth.models import User
from django.template.defaultfilters import truncatechars


class TestType(models.Model):
    """
    Test Type Model
    Defines the attributes of a test type.
    """
    test_type = models.CharField(max_length=20, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.test_type

    class Meta:
        db_table = 'test_types'


class Test(models.Model):
    """
    Test Model
    Defines the attributes of a test.
    """
    # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    test_name = models.CharField(max_length=140, unique=True)
    test_type = models.ForeignKey(TestType, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.test_name

    class Meta:
        db_table = 'tests'
        ordering = ['id', 'test_name']


class Section(models.Model):
    """
    Section Model
    Defines the attributes of a section.
    """
    section_name = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.section_name

    class Meta:
        db_table = 'sections'


class QuestionTypeGroup(models.Model):
    """
    Question Type Group Model
    Defines the attributes of a question type group.
    """
    question_type_group = models.CharField(max_length=140, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.question_type_group

    class Meta:
        db_table = 'question_type_groups'


class QuestionType(models.Model):
    """
    Question Type Model
    Defines the attributes of a question type.
    """
    question_type = models.CharField(max_length=140)
    question_type_group = models.ForeignKey(QuestionTypeGroup, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.question_type) + ' (' + str(self.question_type_group) + ')'

    class Meta:
        db_table = 'question_types'
        ordering = ['question_type', 'question_type_group']
        unique_together = ('question_type', 'question_type_group')


class Question(models.Model):
    """
    Question Model
    Defines the attributes of a question.
    """
    INPUT_TYPES = (
        ('bubble', 'Bubble'),
        ('gridin', 'Grid-In')
    )
    test = models.ForeignKey(Test, on_delete=models.CASCADE)
    section_num = models.IntegerField(blank=True, null=True)
    section_name = models.ForeignKey(
        Section, blank=True, null=True, on_delete=models.CASCADE)
    question_num = models.IntegerField()
    question_type = models.ForeignKey(
        QuestionType, blank=True, null=True, on_delete=models.CASCADE)
    input_type = models.CharField(
        max_length=20, choices=INPUT_TYPES, default='bubble')
    num_inputs = models.IntegerField(default=4)
    answer = models.CharField(max_length=250)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.test) + ': ' + str(self.section_name) + ' ' + str(self.question_num)

    class Meta:
        db_table = 'questions'
        ordering = ['test', 'section_num', 'question_num']
        unique_together = ('section_num', 'question_num')


class UserAnswer(models.Model):
    """
    User Answer Model
    Defines the attributes of a user answer.
    """
    user = models.ForeignKey(User, blank=True, null=True, on_delete=models.CASCADE)
    test = models.ForeignKey(Test, on_delete=models.CASCADE)
    encoded_answer = models.TextField()
    encoder_string = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def encoded_answer_short(self):
        return truncatechars(self.encoded_answer, 100)

    def __str__(self):
        return str(self.test) + ': ' + str(self.user)

    class Meta:
        db_table = 'user_answers'


class SATScoreConversion(models.Model):
    """
    SAT Score Conversion Model
    Defines the attributes of an SAT score conversion.
    """
    test = models.ForeignKey(Test, on_delete=models.CASCADE)
    num_correct = models.IntegerField()
    math_score = models.IntegerField(blank=True, null=True)
    reading_score = models.IntegerField(blank=True, null=True)
    writing_score = models.IntegerField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.test) + ' - Number Correct: ' + str(self.num_correct)

    class Meta:
        db_table = 'sat_score_conversions'
        ordering = ['test', 'num_correct']
        unique_together = ('test', 'num_correct')
