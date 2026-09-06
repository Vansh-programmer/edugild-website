from django.db import models
from django.core.exceptions import ValidationError

def validate_avantika_email(value: str):
    """Ensure email ends with @avantika.edu.in"""
    if not value.lower().endswith('@avantika.edu.in'):
        raise ValidationError('Only official Avantika University email addresses (@avantika.edu.in) are permitted.')

class PitchSubmission(models.Model):
    founder_name = models.CharField(max_length=255)
    email = models.EmailField()
    startup_name = models.CharField(max_length=255)
    sector = models.CharField(max_length=120)
    one_line_pitch = models.TextField()
    ref_id = models.CharField(max_length=64, unique=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.startup_name} ({self.founder_name}) - {self.ref_id}"

class NewsletterSubscriber(models.Model):
    email = models.EmailField(unique=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.email

class EventRegistration(models.Model):
    event_id = models.CharField(max_length=120, db_index=True)
    event_title = models.CharField(max_length=255)
    participant_name = models.CharField(max_length=255)
    avantika_email = models.EmailField(validators=[validate_avantika_email], db_index=True)
    enrollment_id = models.CharField(max_length=64, blank=True, null=True)
    department_year = models.CharField(max_length=120, blank=True, null=True)
    team_size = models.PositiveSmallIntegerField(default=1)
    synced_to_sheet = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.participant_name} ({self.avantika_email}) - {self.event_title}"

