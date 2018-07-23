import uuid
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# Standard profile information for all users
class UserProfile(models.Model):
    """
    User Profile Model
    Defines the attributes of a user profile.
    """
    USER_TYPES = (
        ('admin', 'admin'),
        ('tutor', 'tutor'),
        ('client', 'client'),
        ('public', 'public')
    )
    user = models.OneToOneField(User, primary_key=True, on_delete=models.CASCADE)
    user_type = models.CharField(max_length=25, choices=USER_TYPES, default='public')
    city = models.CharField(max_length=150, blank=True, null=True)
    state = models.CharField(max_length=150, blank=True, null=True)
    country = models.CharField(max_length=150, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.first_name + self.user.last_name

    class Meta:
        db_table = 'user_profiles'

# Automatically create a user profile when a new user is created
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)
# Save the user profile for a user when the user instance is saved
@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.userprofile.save()


# Profile information for clients
class ClientProfile(models.Model):
    """
    Client Profile Model
    Defines the attributes of a client profile.
    """
    client = models.OneToOneField(User, primary_key=True, on_delete=models.CASCADE)
    tutor = models.ForeignKey(User, related_name='tutor', on_delete=models.CASCADE)
    client_type = models.CharField(max_length=50)
    enrollment_status = models.CharField(max_length=50)
    pay_rate = models.IntegerField()
    purchased_hours = models.IntegerField()
    delivered_hours = models.IntegerField()
    focus_area_1 = models.CharField(max_length=150, blank=True, null=True)
    focus_area_2 = models.CharField(max_length=150, blank=True, null=True)
    focus_area_3 = models.CharField(max_length=150, blank=True, null=True)
    address = models.CharField(max_length=150, blank=True, null=True)
    city = models.CharField(max_length=150, blank=True, null=True)
    state = models.CharField(max_length=150, blank=True, null=True)
    zip = models.IntegerField(blank=True, null=True)
    country = models.CharField(max_length=150, blank=True, null=True)
    client_phone = models.CharField(max_length=25, blank=True, null=True)
    parent_phone = models.CharField(max_length=25, blank=True, null=True)
    parent_email = models.EmailField(blank=True, null=True)
    SAT_diagnostic_score = models.IntegerField(blank=True, null=True)
    SAT_diagnostic_reading_writing = models.IntegerField(blank=True, null=True)
    SAT_diagnostic_math = models.IntegerField(blank=True, null=True)
    SAT_diagnostic_essay = models.CharField(max_length=25, blank=True, null=True)
    SAT_best_practice = models.IntegerField(blank=True, null=True)
    SAT_best_practice_reading_writing = models.IntegerField(blank=True, null=True)
    SAT_best_practice_math = models.IntegerField(blank=True, null=True)
    SAT_best_practice_essay = models.CharField(max_length=25, blank=True, null=True)
    SAT_best_official = models.IntegerField(blank=True, null=True)
    SAT_best_official_reading_writing = models.IntegerField(blank=True, null=True)
    SAT_best_official_math = models.IntegerField(blank=True, null=True)
    SAT_best_official_essay = models.CharField(max_length=25, blank=True, null=True)
    LSAT_diagnostic_score = models.IntegerField(blank=True, null=True)
    LSAT_best_practice = models.IntegerField(blank=True, null=True)
    LSAT_best_official = models.IntegerField(blank=True, null=True)
    ACT_diagnostic_score = models.IntegerField(blank=True, null=True)
    ACT_best_practice = models.IntegerField(blank=True, null=True)
    ACT_best_official = models.IntegerField(blank=True, null=True)
    colleges_accepted = models.TextField(blank=True, null=True)
    college_matriculated = models.TextField(blank=True, null=True)
    scholarship_awarded = models.TextField(blank=True, null=True)
    law_schools_accepted = models.TextField(blank=True, null=True)
    law_school_matriculated = models.TextField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)

    class Meta:
        db_table = 'client_profiles'
