# Avantika University E-Cell × Edugild Ventures Web Platform

> Official campus innovation, incubation, and event portal for Avantika University's Entrepreneurship Cell in partnership with Edugild Ventures and Avantika Innovation & Incubation Centre (AIIC).

---

## Quick Links
- **[Interviewer & Reviewer Guide](./INTERVIEWER_GUIDE.md)**: 3-minute demo flow, feature walkthrough, and interview talking points.
- **[Non-Technical User Manual & Operating Guide](./HOW_TO_USE.md)**: Plain-English guide for students, organizers, faculty, and non-technical reviewers.
- **[Interviewer & Technical Evaluation Guide](./INTERVIEWER_GUIDE.md)**: 3-minute demo flow, feature walkthrough, and interview talking points.
- **[Backend Documentation](./backend/README.md)**: Django REST API endpoints, Google Sheets sync, and database administration.

---

## Tech Stack
- **Frontend:** React 18, TypeScript, Tailwind CSS, Vite, Lucide Icons.
- **Design System:** Neo-brutalist aesthetic, high-contrast borders (`#1E293B`), content-aware dynamic palette transitions.
- **Backend:** Python 3, Django 5, Django REST Framework.
- **Data & Storage:** SQLite / PostgreSQL, local CSV snapshots, Google Apps Script Sheets sync.

---

## Local Development

### 1. Start Django Backend
```bash
cd backend
source venv/bin/activate
python manage.py runserver 0.0.0.0:8000
```
- API Base: `http://localhost:8000/api/`
- Admin Console: `http://localhost:8000/admin/` (`admin` / `avantika2026`)

### 2. Start Frontend
```bash
npm install
npm run dev
```
- Local URL: `http://localhost:5173/`
- Production Preview: `npm run build && npm run preview` (`http://localhost:4173/`)

---

## Evaluation Credentials
- **Django Admin Portal:** `http://localhost:8000/admin/`
- **Username:** `admin`
- **Password:** `avantika2026`
- **In-App Desk:** Click **"SUBMISSIONS"** in top navbar or press `Ctrl + Shift + A`.

