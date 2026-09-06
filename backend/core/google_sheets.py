import os
import logging
import requests
from django.conf import settings

logger = logging.getLogger(__name__)

def sync_event_registration_to_google_sheet(registration_instance) -> bool:
    """
    Sync an event registration to the official Google Sheet.
    Supports either:
    1. Google Apps Script Webhook (simple HTTP POST)
    2. Google Service Account via gspread
    """
    payload = {
        "timestamp": registration_instance.created_at.strftime("%Y-%m-%d %H:%M:%S IST"),
        "event_id": registration_instance.event_id,
        "event_title": registration_instance.event_title,
        "participant_name": registration_instance.participant_name,
        "avantika_email": registration_instance.avantika_email,
        "enrollment_id": registration_instance.enrollment_id or "N/A",
        "department_year": registration_instance.department_year or "N/A",
        "team_size": registration_instance.team_size,
    }

    # Method 1: Webhook URL (e.g. Google Apps Script Web App)
    webhook_url = getattr(settings, 'GOOGLE_APPS_SCRIPT_WEBHOOK', '') or os.environ.get('GOOGLE_APPS_SCRIPT_WEBHOOK')
    if webhook_url:
        try:
            res = requests.post(webhook_url, json=payload, timeout=8)
            if res.status_code in [200, 201]:
                registration_instance.synced_to_sheet = True
                registration_instance.save(update_fields=['synced_to_sheet'])
                return True
        except Exception as e:
            logger.warning(f"Google Sheet webhook sync failed: {e}")

    # Method 2: Direct gspread client (if service account JSON provided)
    creds_file = getattr(settings, 'GOOGLE_SHEET_CREDENTIALS_FILE', '') or os.environ.get('GOOGLE_SHEET_CREDENTIALS_FILE')
    sheet_id = getattr(settings, 'GOOGLE_SHEET_ID', '') or os.environ.get('GOOGLE_SHEET_ID')

    if creds_file and sheet_id and os.path.exists(creds_file):
        try:
            import gspread
            gc = gspread.service_account(filename=creds_file)
            sh = gc.open_by_key(sheet_id)
            worksheet = sh.sheet1
            row = [
                payload["timestamp"],
                payload["event_title"],
                payload["participant_name"],
                payload["avantika_email"],
                payload["enrollment_id"],
                payload["department_year"],
                payload["team_size"]
            ]
            worksheet.append_row(row)
            registration_instance.synced_to_sheet = True
            registration_instance.save(update_fields=['synced_to_sheet'])
            return True
        except Exception as e:
            logger.warning(f"gspread sync failed: {e}")

    return False

