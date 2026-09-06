from django.contrib import admin
from .models import PitchSubmission, NewsletterSubscriber, EventRegistration

@admin.register(PitchSubmission)
class PitchSubmissionAdmin(admin.ModelAdmin):
    list_display = ('ref_id', 'startup_name', 'founder_name', 'email', 'sector', 'created_at')
    search_fields = ('ref_id', 'startup_name', 'founder_name', 'email')
    list_filter = ('sector', 'created_at')
    readonly_fields = ('ref_id', 'created_at')

@admin.register(NewsletterSubscriber)
class NewsletterSubscriberAdmin(admin.ModelAdmin):
    list_display = ('email', 'created_at', 'is_active')
    search_fields = ('email',)
    list_filter = ('is_active', 'created_at')

@admin.register(EventRegistration)
class EventRegistrationAdmin(admin.ModelAdmin):
    list_display = ('participant_name', 'avantika_email', 'event_title', 'enrollment_id', 'department_year', 'team_size', 'synced_to_sheet', 'created_at')
    search_fields = ('participant_name', 'avantika_email', 'enrollment_id', 'event_title')
    list_filter = ('event_id', 'synced_to_sheet', 'created_at')
    readonly_fields = ('created_at',)

