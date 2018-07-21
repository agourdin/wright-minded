from django.urls import path, re_path, include
from django.views.generic import TemplateView
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register(r'v0.1/client_profiles', views.ClientProfileViewSet, base_name='client_profile')
router.register(r'v0.1/tests', views.TestViewSet, base_name='test')
router.register(r'v0.1/question_type_groups', views.QuestionTypeGroupViewSet, base_name='question_type_group')
router.register(r'v0.1/question_types', views.QuestionTypeViewSet, base_name='question_type')
router.register(r'v0.1/questions', views.QuestionViewSet, base_name='question')
router.register(r'v0.1/sections', views.SectionViewSet, base_name='section')
router.register(r'v0.1/test_types', views.TestTypeViewSet, base_name='test_type')
router.register(r'v0.1/user_answers', views.UserAnswerViewSet, base_name='user_answer')

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

    # CHANGE PASSWORD
    path(
        'v0.1/auth/change_password',
        views.ChangePasswordView.as_view(),
        name='change_password'
    ),

    # USER
    path(
        'v0.1/auth/user',
        views.UserAPI.as_view(),
        name='get_update_user'),

    # CLIENT PROFILES WITH PARAM
    path(
        'v0.1/client_profiles',
        views.ClientProfileViewSet.as_view({'get': 'list'}),
        name='client_profile_with_param'),

    # GET AVAILABLE TESTS
    path(
        'v0.1/tests/available/',
        views.get_available_tests,
        name='get_available_tests'),


    # USER ANSWER
    path(
        'v0.1/user_answers',
        views.UserAnswerViewSet.as_view({'get': 'list'}),
        name='user_answers_with_param'),

    # SAT SCORE CONVERSION
    path(
        'v0.1/sat_score_conversions',
        views.SATScoreConversionList.as_view(),
        name='get_post_sat_score_conversions'),

]

urlpatterns += router.urls
