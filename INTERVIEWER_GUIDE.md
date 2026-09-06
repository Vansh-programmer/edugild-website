# Avantika University E-Cell × Edugild Ventures
## Reviewer & Interviewer Evaluation Guide

Welcome to the **Avantika University Entrepreneurship Cell (E-Cell) & Edugild Ventures** web platform. This document provides a quick 3-minute walkthrough for reviewers and interviewers, detailing the features to test, system architecture, and planned roadmap improvements.

---

## 1. Fast 3-Minute Interviewer Walkthrough

### Step 1: Campus Launchpad & Live Facility Specs (`#hero`)
- **Theme Ambiance:** Warm Ivory Paper (`#FFFDF5`) with Avantika Violet & Amber branding.
- **What to Observe:**
  - Live summit countdown timer (synchronized to local time).
  - MIT FabLab hardware facilities switcher (laser cutting, CNC, 3D printing bay).
  - Official Avantika E-Cell × Edugild Ventures mark.

### Step 2: Curated Conclaves & Student RSVPs (`#events`)
- **Theme Ambiance:** Smoothly glides to Electric Lilac Wash (`#FAF5FF`).
- **What to Test:**
  - Filter events by category: **"All"**, **"Upcoming"**, **"Hackathons"**, or **"Past Conclaves"**.
  - Click **"RSVP PASS"** on any upcoming conclave.
  - Test the form validation: enter name, department, and university email (e.g. `alex@avantika.edu.in`).
  - Submit: Notice the instant confirmation modal with pass generation and local/API registration sync.

### Step 3: Student Leadership & Mentors (`#roster`)
- **Theme Ambiance:** Softly transitions to Mint / Sage Wash (`#F0FDF4`).
- **What to Observe:**
  - High-contrast neo-brutalist card layout of student leads, faculty advisors, and ecosystem partners.
  - Zero generic template elements or artificial AI decoration.

### Step 4: Venture Incubation Workbench (`#pitch`)
- **Theme Ambiance:** Transitions to Warm Studio Amber (`#FFFBEB`).
- **What to Test:**
  - Fill out the proposal form (Founder Name, Email, Startup Title, Sector, One-Line Pitch).
  - Submit the proposal: A unique reference dossier (`#AGY-...`) is issued immediately and persisted to the database.

### Step 5: E-Cell Submissions Desk & Admin Console
- **Quick Desk:** Click the **"SUBMISSIONS"** button in the top navbar (or press `Ctrl + Shift + A`).
  - View real-time registered participants, incubator pitch dossiers, and subscriber counts.
  - Click **"DOWNLOAD CSV DOSSIER"** for a one-click spreadsheet download.
- **Django Admin Console:**
  - URL: `http://localhost:8000/admin/` (or via the link inside the Submissions Desk).
  - **Username:** `admin`
  - **Password:** `avantika2026`
  - Full relational database CRUD for Event Registrations, Pitch Submissions, and Newsletter Subscribers.

---

## 2. Technical Architecture Highlights

| Layer | Stack | Key Architectural Implementations |
| :--- | :--- | :--- |
| **Frontend** | React 18, TypeScript, Tailwind CSS, Vite | Neo-brutalism design system, custom responsive layout, zero AI clichés. |
| **Theme Engine** | Dynamic Content-Aware Scroll Hook | Viewport-aware ambient palette transition (700ms ease-out) without CSS filter distortion. |
| **Backend API** | Python 3, Django 5, Django REST Framework | Clean REST endpoints (`/api/pitch/`, `/api/events/rsvp/`, `/api/newsletter/`, `/api/health/`). |
| **Data & Persistence** | SQLite (dev) / PostgreSQL (prod), CSV backup | Idempotent registration checks (prevents double-booking), automated local CSV append. |
| **Third-Party Sync** | Google Apps Script Webhook / Sheets API | Automatic dispatch of event registrations to external Google Sheets. |
| **Resilience** | Dual-mode Offline / Online Fallback | Gracefully preserves submissions in `localStorage` if backend is disconnected. |

---

## 3. What Can Be Improved (Roadmap for Discussion)

Great talking points during an interview to showcase product vision, scalability, and engineering depth:

1. **Student Single Sign-On (SSO) & RBAC:**
   - Integrate Google Workspace / Microsoft OAuth limited to `@avantika.edu.in` domain.
   - Separate access roles: *Applicant* (student), *Reviewer* (faculty/mentor), and *Super Admin* (E-Cell chair).

2. **Automated QR Code Digital Event Passes:**
   - On RSVP confirmation, automatically generate a cryptographic QR code sent via email for door check-ins at MIT FabLab sessions.

3. **1-on-1 Mentor Office Hours Booking:**
   - Add calendar slot booking for student founders to schedule 15-minute pitch reviews with Edugild Venture Partners.

4. **Applicant Tracking Pipeline (Kanban Board):**
   - An interactive incubation workflow (`Submitted` → `Screening` → `Pitch Day` → `Seed Grant Approved` → `Incubated`).

5. **Cloud Infrastructure & Production Database:**
   - Migrate from local SQLite to managed PostgreSQL (Supabase / AWS RDS).
   - Add AWS S3 / Cloudinary integration for pitch deck PDF uploads and founder demo videos.
   - Set up Celery + Redis for asynchronous email dispatches and background tasks.

---

## 4. Quick Deployment Guide

### Option A: Frontend on Vercel
1. Push this repository to GitHub.
2. In Vercel, import the repo.
3. Settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Environment Variables:
   - `VITE_DJANGO_API_URL` = URL of your deployed Django backend.

### Option B: Backend on Render / Railway
1. In Render, create a new **Web Service** pointing to `/backend`.
2. **Environment:** Python 3
3. **Build Command:** `pip install -r requirements.txt && python manage.py migrate`
4. **Start Command:** `gunicorn ecell_backend.wsgi:application --bind 0.0.0.0:$PORT`
5. In `settings.py`, add your frontend Vercel domain to `CORS_ALLOWED_ORIGINS`.

