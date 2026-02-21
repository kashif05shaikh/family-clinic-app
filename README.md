# Falak Family Clinic – Management System

A production-ready clinic management system for **Falak Family Clinic** (Dr Falak Khaleel Ahmed).

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, React Router, Axios, Socket.io Client  
- **Backend:** Node.js, Express, MongoDB (Atlas), JWT, bcrypt, Nodemailer, Socket.io  

## Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Gmail (or other SMTP) for email notifications

---

## Setup & Run

### 1. Backend

```bash
cd backend
```

Create `.env` from the template (copy `.env.example` to `.env`) and fill in:

- `MONGODB_URI` – MongoDB Atlas connection string  
- `JWT_SECRET` – Any long random string for JWT signing  
- `DOCTOR_EMAIL` / `DOCTOR_PASSWORD` – Used to create the doctor login (see seed below)  
- Optional: `SMTP_*` for email (if omitted, appointment emails are skipped)

Install dependencies and start:

```bash
npm install
npm run dev
```

Server runs at **http://localhost:5000**.

**Create doctor user (first time only):**

```bash
node scripts/seed.js
```

Default login: `drfalakkhaleelahmed@gmail.com` / `Doctor@123` (or whatever you set in `.env`).

### 2. Frontend

Open a **new terminal**:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at **http://localhost:5173**. It proxies `/api` and `/socket.io` to the backend.

### 3. Use the app

1. Open **http://localhost:5173** in the browser.  
2. **Home** – Clinic info, services, timings, contact.  
3. **Book Appointment** – Submit appointment (Normal/Emergency). Doctor receives email if SMTP is set.  
4. **Dashboard** – Click Dashboard → log in with doctor credentials. View queue (emergency first), update status; real-time updates via Socket.io.  
5. **Login** – Doctor/Admin login for dashboard access.

---

## Environment

### Backend (`.env` in `backend/`)

| Variable         | Description                          |
|------------------|--------------------------------------|
| PORT             | Server port (default 5000)           |
| FRONTEND_URL     | Frontend origin for CORS (e.g. http://localhost:5173) |
| MONGODB_URI      | MongoDB Atlas connection string      |
| JWT_SECRET       | Secret for JWT                       |
| DOCTOR_EMAIL     | Doctor login email                   |
| DOCTOR_PASSWORD  | Doctor login password (used in seed) |
| SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS | For Nodemailer (e.g. Gmail app password) |

### Frontend

- `VITE_API_URL` – Leave empty for dev (Vite proxy). In production, set to your backend URL (e.g. `https://api.yourclinic.com`).

---

## API Endpoints

- `POST /api/appointments` – Create appointment (public).  
- `GET /api/appointments` – List appointments, sorted by priority (emergency first) then `createdAt` (protected).  
- `PUT /api/appointments/:id/status` – Update status: Waiting | In Progress | Completed (protected).  
- `POST /api/auth/login` – Doctor login (email + password), returns JWT.

---

## Project Structure

```
clinic-management/
├── backend/
│   ├── config/db.js
│   ├── models/Appointment.js, User.js
│   ├── routes/appointmentRoutes.js, authRoutes.js
│   ├── middleware/auth.js
│   ├── utils/emailService.js
│   ├── scripts/seed.js
│   ├── server.js
│   ├── .env, .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api/
│   │   ├── context/
│   │   ├── App.jsx, main.jsx, index.css
│   └── package.json
└── README.md
```

---

## Clinic Details (pre-configured)

- **Doctor:** Dr Falak Khaleel Ahmed  
- **Degrees:** BUMS, PGDEMS (Mumbai)  
- **Specialization:** Family Physician  
- **Experience:** 3 years  
- **Email:** drfalakkhaleelahmed@gmail.com  
- **Timings:** 10:30 AM – 2:00 PM (open daily including Sunday)
