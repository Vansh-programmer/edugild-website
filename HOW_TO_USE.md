# Avantika University E-Cell × Edugild Ventures
## Non-Technical User Manual & Operating Guide

Welcome to the **Avantika University Entrepreneurship Cell (E-Cell)** web platform, developed in partnership with **Edugild Ventures** and the **Avantika Innovation & Incubation Centre (AIIC)**.

This guide is written in plain, everyday language for non-technical readers, faculty coordinators, event organizers, reviewers, and interviewers. It explains what the platform does, how to use all of its features, and how to operate the administrative desk.

---

## 1. What is this Website?

This platform serves as the central digital hub for entrepreneurship at Avantika University. It connects students, faculty, startup founders, and venture mentors into one collaborative ecosystem.

### Its primary goals:
1. **Showcase Campus Events:** Inform students about upcoming hackathons, innovation conclaves, and hands-on workshops.
2. **Manage Event Registrations:** Allow students to claim verified passes with instant confirmation.
3. **Incubate Student Startups:** Provide an easy submission portal for students to pitch business ideas and apply for seed funding.
4. **Equip Coordinators:** Give faculty and student leaders a simple dashboard to view registrations and download Excel/CSV reports instantly.

---

## 2. Tour of the Website: Main Sections

As you browse the website, you will notice a unique visual experience: **the background smoothly shifts colors** to match the section you are looking at:

| Section | Color Theme | Purpose |
| :--- | :--- | :--- |
| **1. Campus Launchpad** | Warm Ivory Paper | Live summit countdown, intro to university prototyping facilities (MIT FabLab). |
| **2. Conclaves & Events** | Soft Lilac & Purple | Interactive calendar of upcoming workshops, hackathons, and speaker sessions. |
| **3. Student Leadership** | Fresh Mint & Sage Green | Directory of the student leaders, advisors, and mentors running the cell. |
| **4. Pitch Portal** | Warm Studio Amber | The application workbench where student founders submit their startup ideas. |

---

## 3. How to Use the Website (Step-by-Step)

### A. How a Student Registers for an Event
1. Click **"EVENTS"** in the top navigation bar (or scroll down to the purple section).
2. Use the filter buttons at the top to choose between **"Upcoming"**, **"Hackathons"**, or **"Past Conclaves"**.
3. On any event card, click the black **"RSVP PASS"** button.
4. A clean form will open. Enter:
   - Full Name
   - University Email (e.g. `yourname@avantika.edu.in`)
   - Enrollment ID & Department
   - Team Size (Solo or Team)
5. Click **"CONFIRM MY SEAT"**.
6. **Result:** An instant confirmation pass appears with a verification badge. The seat is locked in, and the student's name is automatically added to the coordinator's attendance list.

---

### B. How an Aspiring Founder Submits a Startup Idea
1. Click **"SUBMIT PITCH"** in the top navigation bar (or scroll to the bottom amber section).
2. Fill in the simple 5-question form:
   - **Founder Name**
   - **Contact Email**
   - **Startup / Project Name**
   - **Sector** (e.g. EdTech, Hardware IoT, AI & Design, FinTech)
   - **One-Line Pitch** (a short summary of the problem and solution)
3. Click **"TRANSMIT PROPOSAL DOSSIER"**.
4. **Result:** A unique official Reference Number (e.g. `#AGY-2026-XXXX`) is issued on screen. The proposal is stored safely for the incubation jury to review.

---

### C. How an Event Coordinator or Faculty Reviews Submissions

You do not need any coding knowledge to view registered students or submitted pitches. There are two simple ways:

#### Option 1: The Quick In-App Submissions Desk (Fastest)
1. Click the white **"SUBMISSIONS"** button located on the top right of the navigation bar.
   *(Tip: You can also press `Ctrl + Shift + A` on your keyboard at any time).*
2. A clean side panel will slide open from the right side of the screen.
3. In this desk, you can click through three tabs:
   - **Registered Students:** See everyone who signed up for workshops and conclaves.
   - **Incubator Pitches:** Read student startup proposals and reference IDs.
   - **Newsletter Dispatches:** View subscribers who joined the weekly briefing.
4. **To Download as an Excel Spreadsheet:** Click the yellow **"DOWNLOAD CSV DOSSIER"** button. An `.csv` file will download to your computer immediately, which opens right up in Microsoft Excel or Google Sheets.

#### Option 2: The Full Administrative Office
For coordinators who want to edit, search, or delete entries:
1. Open the Submissions Desk and click **"Open Django Administration Console"** (or visit `http://localhost:8000/admin/` in your browser).
2. Log in with:
   - **Username:** `admin`
   - **Password:** `avantika2026`
3. You will see an easy-to-use control panel listing all:
   - *Event Registrations*
   - *Pitch Submissions*
   - *Newsletter Subscribers*
4. You can search by student name, filter by event date, or check off attendance.

---

## 4. Special Platform Highlights

1. **No Lost Data (Offline-Resilient):**
   If campus internet drops momentarily while a student is submitting, the platform automatically saves the entry on the device and syncs it without losing their work.
2. **Duplicate Prevention:**
   Students cannot accidentally sign up twice for the same event with the same email, keeping seat counts clean and accurate.
3. **Clean & Dignified Aesthetic:**
   The website uses high-contrast typography and authentic institutional badges without flashy neon clutter or fake animations.
4. **Mobile & Tablet Friendly:**
   Everything works smoothly on smartphones, tablets, and desktop computers.

---

## 5. What Can Be Added Next (Future Roadmap)

If you are discussing this platform in a meeting, interview, or presentation, here are great non-technical ideas for what can be built next:

1. **QR Code Entry Passes:**
   Send a digital ticket with a scannable QR code directly to the student's email, so volunteers can scan tickets at the auditorium door.
2. **1-on-1 Mentor Booking Calendar:**
   Allow students to pick a 15-minute time slot on an interactive calendar to pitch their ideas privately to an investor or faculty advisor.
3. **Application Progress Tracker:**
   Give student founders a simple status tracker (similar to an order tracker):
   *Application Received* $\longrightarrow$ *Under Review* $\longrightarrow$ *Pitch Day Invitation* $\longrightarrow$ *Seed Grant Awarded*.
4. **Automatic WhatsApp / SMS Reminders:**
   Send an automated reminder 2 hours before a workshop starts so students never miss a session.

---

## Quick Reference Summary

| Task | Where to Go |
| :--- | :--- |
| **Read about E-Cell & Facilities** | Scroll to top (Campus Launchpad) |
| **Sign up for a Conclave** | Section 2 (Events) $\to$ Click "RSVP PASS" |
| **Apply for Seed Funding** | Section 4 (Pitch Portal) $\to$ Click "SUBMIT PITCH" |
| **See Registrations & Download Excel** | Click **"SUBMISSIONS"** in top navbar |
| **Admin Login** | `admin` / `avantika2026` |

