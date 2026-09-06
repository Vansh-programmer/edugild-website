# Avantika University E-Cell Django Backend

Official REST API backend for the Avantika University E-Cell × Edugild web platform.

## Features
- **Pitch Submissions (`POST /api/pitch/`)**: Receives student venture pitches, validates fields, and records them with an official reference ID.
- **Event RSVPs (`POST /api/events/rsvp/`)**: Enforces `@avantika.edu.in` university email verification and synchronizes submissions to the official Google Sheet.
- **Newsletter Dispatches (`POST /api/newsletter/`)**: Collects founder emails for weekly briefs.
- **Django Admin Console (`/admin/`)**: Complete search, filter, and review interface for E-Cell chairs.

---

## Quickstart

### 1. Create and activate a virtual environment
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Install dependencies
```bash
pip install -r requirements.txt
```

### 3. Run migrations and create superuser
```bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

### 4. Start the Django development server
```bash
python manage.py runserver 8000
```
The API is now live at `http://127.0.0.1:8000/api/`.

---

## Google Sheets Integration

To automatically sync event registrations to a Google Sheet, configure **one** of the following options in your `.env` file:

### Option A: Google Apps Script Webhook (Easiest)
1. In your Google Sheet, click **Extensions > Apps Script**.
2. Paste the `doPost` webhook snippet (provided below).
3. Deploy as a **Web App** (Access: "Anyone").
4. Set in your `.env`:
   ```bash
   GOOGLE_APPS_SCRIPT_WEBHOOK="https://script.google.com/macros/s/.../exec"
   ```

### Option B: Google Cloud Service Account
1. Download your Google Cloud Service Account credentials JSON.
2. Share the target Google Sheet with your service account email (as Editor).
3. Set in `.env`:
   ```bash
   GOOGLE_SHEET_ID="your_google_sheet_id_here"
   GOOGLE_SHEET_CREDENTIALS_FILE="/path/to/service_account.json"
   ```

---

## Google Apps Script Snippet (for Option A)
```javascript
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow([
      data.timestamp || new Date(),
      data.event_title || data.eventTitle,
      data.participant_name || data.participantName,
      data.avantika_email || data.avantikaEmail,
      data.enrollment_id || data.enrollmentId,
      data.department_year || data.departmentYear,
      data.team_size || data.teamSize
    ]);
    return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

