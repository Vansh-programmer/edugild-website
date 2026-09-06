import random
from rest_framework import serializers
from .models import PitchSubmission, NewsletterSubscriber, EventRegistration

class PitchSubmissionSerializer(serializers.ModelSerializer):
    founderName = serializers.CharField(source='founder_name')
    startupName = serializers.CharField(source='startup_name')
    oneLinePitch = serializers.CharField(source='one_line_pitch')
    ref = serializers.CharField(source='ref_id', required=False, allow_blank=True, default='')

    class Meta:
        model = PitchSubmission
        fields = ['id', 'founderName', 'email', 'startupName', 'sector', 'oneLinePitch', 'ref', 'created_at']
        read_only_fields = ['id', 'created_at']

    def create(self, validated_data):
        if not validated_data.get('ref_id'):
            validated_data['ref_id'] = f"AVK-26-{random.randint(1000, 9999)}"
        return super().create(validated_data)

class NewsletterSubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscriber
        fields = ['id', 'email', 'created_at']
        read_only_fields = ['id', 'created_at']

    def create(self, validated_data):
        email = validated_data.get('email', '').strip().lower()
        obj, _ = NewsletterSubscriber.objects.get_or_create(email=email)
        return obj

class EventRegistrationSerializer(serializers.ModelSerializer):
    eventId = serializers.CharField(source='event_id')
    eventTitle = serializers.CharField(source='event_title')
    participantName = serializers.CharField(source='participant_name')
    avantikaEmail = serializers.EmailField(source='avantika_email')
    enrollmentId = serializers.CharField(source='enrollment_id', required=False, allow_blank=True, default='')
    departmentYear = serializers.CharField(source='department_year', required=False, allow_blank=True, default='')
    teamSize = serializers.IntegerField(source='team_size', default=1)

    class Meta:
        model = EventRegistration
        fields = [
            'id', 'eventId', 'eventTitle', 'participantName',
            'avantikaEmail', 'enrollmentId', 'departmentYear',
            'teamSize', 'synced_to_sheet', 'created_at'
        ]
        read_only_fields = ['id', 'synced_to_sheet', 'created_at']

    def validate_avantikaEmail(self, value):
        val = value.strip().lower()
        if not (val.endswith('@avantika.edu.in') and '@' in val and len(val) > 17):
            raise serializers.ValidationError("Only official Avantika University email addresses (@avantika.edu.in) can register.")
        return val

