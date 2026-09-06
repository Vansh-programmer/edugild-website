from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import PitchSubmission, NewsletterSubscriber, EventRegistration
from .serializers import (
    PitchSubmissionSerializer,
    NewsletterSubscriberSerializer,
    EventRegistrationSerializer
)
from .google_sheets import sync_event_registration_to_google_sheet

class HealthCheckView(APIView):
    def get(self, request):
        return Response({
            "status": "healthy",
            "service": "Avantika University E-Cell Backend",
            "partner": "Edugild Innovation Foundation & AIIC"
        })

class PitchSubmissionView(APIView):
    def get(self, request):
        submissions = PitchSubmission.objects.all()
        serializer = PitchSubmissionSerializer(submissions, many=True)
        return Response({
            "success": True,
            "count": submissions.count(),
            "pitches": serializer.data
        })

    def post(self, request):
        serializer = PitchSubmissionSerializer(data=request.data)
        if serializer.is_valid():
            instance = serializer.save()
            return Response({
                "success": True,
                "message": "Pitch dossier logged to incubator desk.",
                "ref": instance.ref_id,
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response({
            "success": False,
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

class NewsletterSubscriberView(APIView):
    def get(self, request):
        subscribers = NewsletterSubscriber.objects.all()
        serializer = NewsletterSubscriberSerializer(subscribers, many=True)
        return Response({
            "success": True,
            "count": subscribers.count(),
            "subscribers": serializer.data
        })

    def post(self, request):
        serializer = NewsletterSubscriberSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "success": True,
                "message": "Enrolled in weekly E-Cell innovation dispatch."
            }, status=status.HTTP_201_CREATED)
        return Response({
            "success": False,
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

import csv
from pathlib import Path
from django.http import HttpResponse

def append_registration_to_csv(instance):
    try:
        csv_path = Path(__file__).resolve().parent.parent / 'event_registrations.csv'
        file_exists = csv_path.exists()
        with open(csv_path, mode='a', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            if not file_exists:
                writer.writerow(['Timestamp', 'Event ID', 'Event Title', 'Participant Name', 'Avantika Email', 'Enrollment ID', 'Department / Year', 'Team Size', 'Synced to Sheet'])
            writer.writerow([
                instance.created_at.strftime("%Y-%m-%d %H:%M:%S"),
                instance.event_id,
                instance.event_title,
                instance.participant_name,
                instance.avantika_email,
                instance.enrollment_id or "N/A",
                instance.department_year or "N/A",
                instance.team_size,
                instance.synced_to_sheet
            ])
    except Exception:
        pass

class EventRegistrationView(APIView):
    def get(self, request):
        registrations = EventRegistration.objects.all()
        serializer = EventRegistrationSerializer(registrations, many=True)
        return Response({
            "success": True,
            "count": registrations.count(),
            "registrations": serializer.data
        })

    def post(self, request):
        serializer = EventRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data.get('avantika_email', '').strip().lower()
            event_id = serializer.validated_data.get('event_id', '')

            # Check if participant already registered for this event
            existing = EventRegistration.objects.filter(event_id=event_id, avantika_email=email).first()
            if existing:
                return Response({
                    "success": True,
                    "alreadyRegistered": True,
                    "message": "You are already registered for this conclave. Your seat is confirmed!",
                    "data": EventRegistrationSerializer(existing).data
                }, status=status.HTTP_200_OK)

            instance = serializer.save()
            
            # Asynchronously / opportunistically sync with Google Sheet
            synced = sync_event_registration_to_google_sheet(instance)

            # Local CSV snapshot
            append_registration_to_csv(instance)

            return Response({
                "success": True,
                "message": "Event RSVP confirmed for Avantika University student.",
                "syncedToSheet": synced,
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response({
            "success": False,
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

class ExportCsvView(APIView):
    def get(self, request):
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="avantika_ecell_event_registrations.csv"'
        writer = csv.writer(response)
        writer.writerow(['Timestamp', 'Event ID', 'Event Title', 'Participant Name', 'Avantika Email', 'Enrollment ID', 'Department / Year', 'Team Size', 'Synced to Sheet'])
        for reg in EventRegistration.objects.all():
            writer.writerow([
                reg.created_at.strftime("%Y-%m-%d %H:%M:%S"),
                reg.event_id,
                reg.event_title,
                reg.participant_name,
                reg.avantika_email,
                reg.enrollment_id or "N/A",
                reg.department_year or "N/A",
                reg.team_size,
                reg.synced_to_sheet
            ])
        return response

class AllSubmissionsView(APIView):
    def get(self, request):
        pitches = PitchSubmission.objects.all()
        registrations = EventRegistration.objects.all()
        subscribers = NewsletterSubscriber.objects.all()

        return Response({
            "success": True,
            "pitches": PitchSubmissionSerializer(pitches, many=True).data,
            "registrations": EventRegistrationSerializer(registrations, many=True).data,
            "subscribers": NewsletterSubscriberSerializer(subscribers, many=True).data,
            "counts": {
                "pitches": pitches.count(),
                "registrations": registrations.count(),
                "subscribers": subscribers.count()
            }
        })

