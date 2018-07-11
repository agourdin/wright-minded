from django.urls import path, re_path, include
from django.views.generic import TemplateView
from rest_framework import routers

from . import views

urlpatterns = [


    # AURTHORIZATION
    path('v0.1/auth', include('knox.urls')),
    path('v0.1/auth/', include('knox.urls')),

    # REGISTER
    path(
        'v0.1/auth/register',
        views.RegistrationAPI.as_view(),
        name='post_registration'),

    # LOGIN
    path(
        'v0.1/auth/login',
        views.LoginAPI.as_view(),
        name='post_login'),

    # LOGOUT
    path(
        'v0.1/auth/logout',
        views.LogoutAPI.as_view(),
        name='post_logout'),

    # USER
    path(
        'v0.1/auth/user',
        views.UserAPI.as_view(),
        name='get_user'),


    # TESTS
    ### NOTE: URLs must be in this order.
    path(
        'v0.1/tests/',
        views.get_post_tests,
        name='get_post_tests'),
    path(
        'v0.1/tests/available/',
        views.get_available_tests,
        name='get_available_tests'),
    path(
        'v0.1/tests/<pk>/',
        views.get_delete_update_test,
        name='get_delete_update_test'),

    # TEST ANSWERS
    path(
        'v0.1/test_answers/',
        views.get_test_answers,
        name='get_test_answers'),
    path(
        'v0.1/test_answers/<pk>/',
        views.get_test_answer,
        name='get_test_answer'),

    # TEST TYPE
    path(
        'v0.1/test_types/',
        views.get_post_test_types,
        name='get_post_test_types'),
    path(
        'v0.1/test_types/<pk>/',
        views.get_delete_update_test_type,
        name='get_delete_update_test_type'),

    # SECTION
    path(
        'v0.1/sections/',
        views.get_post_sections,
        name='get_post_sections'),
    path(
        'v0.1/sections/<pk>/',
        views.get_delete_update_section,
        name='get_delete_update_section'),

    # QUESTION TYPE GROUP
    path(
        'v0.1/question_type_groups/',
        views.get_post_question_type_groups,
        name='get_post_question_type_groups'),
    path(
        'v0.1/question_type_groups/<pk>/',
        views.get_delete_update_question_type_group,
        name='get_delete_update_question_type_group'),

    # QUESTION TYPE
    path(
        'v0.1/question_types/',
        views.get_post_question_types,
        name='get_post_question_types'),
    path(
        'v0.1/question_types/<pk>/',
        views.get_delete_update_question_type,
        name='get_delete_update_question_type'),

    # QUESTION
    path(
        'v0.1/questions/',
        views.get_post_questions,
        name='get_post_questions'),
    path(
        'v0.1/questions/<pk>/',
        views.get_delete_update_question,
        name='get_delete_update_question'),

    # USER ANSWER
    path(
        'v0.1/user_answers/',
        views.get_post_user_answers,
        name='get_post_user_answers'),
    path(
        'v0.1/user_answers/<pk>/',
        views.get_delete_update_user_answer,
        name='get_delete_update_user_answer'),

    # SAT SCORE CONVERSION
    path(
        'v0.1/sat_score_conversions',
        views.SATScoreConversionList.as_view(),
        name='get_post_sat_score_conversions'),

]
