from django.urls import path
from .views import (
    HealthCheckView,
    PitchSubmissionView,
    NewsletterSubscriberView,
    EventRegistrationView,
    AllSubmissionsView,
    ExportCsvView
)

urlpatterns = [
    path('health/', HealthCheckView.as_view(), name='health-check'),
    path('pitch/', PitchSubmissionView.as_view(), name='submit-pitch'),
    path('newsletter/', NewsletterSubscriberView.as_view(), name='subscribe-newsletter'),
    path('events/rsvp/', EventRegistrationView.as_view(), name='event-rsvp'),
    path('submissions/', AllSubmissionsView.as_view(), name='all-submissions'),
    path('submissions/export-csv/', ExportCsvView.as_view(), name='export-csv'),
]

