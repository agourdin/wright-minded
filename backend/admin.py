from django.contrib import admin
from import_export.admin import ImportExportModelAdmin

from django.contrib.auth.models import User

from .models import (
    Test,
    TestType,
    Section,
    Question,
    QuestionType,
    QuestionTypeGroup,
    UserAnswer,
    SATScoreConversion,
    ClientProfile
)

@admin.register(ClientProfile)
class ClientProfileAdmin(ImportExportModelAdmin):
    list_display = (
        'client',
        'tutor',
        'client_type',
        'enrollment_status',
        'pay_rate',
        'purchased_hours',
        'delivered_hours',
        'focus_area_1',
        'client_phone',
        'parent_phone',
        'parent_email',
        'updated_at'
    )
    list_select_related = ('client',)
    list_filter = (
        'client',
        'tutor',
        'client_type',
        'enrollment_status'
    )
    search_fields = (
        'client',
        'tutor',
        'client_type',
        'enrollment_status'
        )

    # def name(self, instance):
    #     return str(instance.user.first_name) + ' ' + str(instance.user.last_name)



@admin.register(Test)
class TestAdmin(ImportExportModelAdmin):
    list_display = (
        'id',
        'test_name',
        'test_type'
    )
    search_fields = ('test_name', 'test_type', )

@admin.register(TestType)
class TestTypeAdmin(ImportExportModelAdmin):
    list_display = (
        'id',
        'test_type'
    )
    search_fields = ['test_type', ]

@admin.register(Section)
class SectionAdmin(ImportExportModelAdmin):
    list_display = (
        'id',
        'section_name'
    )
    search_fields = ['section_name', ]

@admin.register(Question)
class QuestionAdmin(ImportExportModelAdmin):
    list_display = (
        'id',
        'test',
        'section_num',
        'section_name',
        'question_num',
        'question_type',
        'input_type',
        'num_inputs',
        'answer'
    )
    list_filter = ('test', 'section_name', 'input_type', 'question_type', )

@admin.register(QuestionTypeGroup)
class QuestionTypeGroupAdmin(ImportExportModelAdmin):
    list_display = (
        'id',
        'question_type_group'
    )
    search_fields = ['question_type_group', ]

@admin.register(QuestionType)
class QuestionTypeAdmin(ImportExportModelAdmin):
    list_display = (
        'id',
        'question_type',
        'question_type_group'
    )
    search_fields = ['question_type', ]

@admin.register(UserAnswer)
class UserAnswerAdmin(ImportExportModelAdmin):
    list_display = (
        'id',
        'user',
        'test',
        'answer_short',
        'created_at',
    )
    search_fields = ('user', 'test', )

@admin.register(SATScoreConversion)
class SATScoreConversionAdmin(ImportExportModelAdmin):
    list_display = (
        'id',
        'test',
        'num_correct',
        'math_score',
        'reading_score',
        'writing_score'
    )
    search_fields = ('test', )
