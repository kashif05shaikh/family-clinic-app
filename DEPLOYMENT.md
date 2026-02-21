# Falak Family Clinic – Deployment Guide

This guide covers how to deploy the **backend** (Node.js + Express) and **frontend** (React + Vite) to the cloud. You already use **MongoDB Atlas**, so the database is cloud-hosted.

---

## Overview

| Part       | Tech           | Where to deploy        |
|-----------|----------------|------------------------|
| Database  | MongoDB Atlas  | Already cloud (no change) |
| Backend   | Node.js/Express | Render, Railway, or a VPS |
| Frontend  | React (Vite)   | Vercel, Netlify, or same server as backend |

**Recommended (easiest):** Backend on **Render** (free tier), Frontend on **Vercel** (free tier).

---

## 1. Prepare environment variables

### Backend (set these on your hosting platform)

| Variable        | Description | Example |
|----------------|-------------|--------|
| `PORT`         | Server port (host often sets this) | `5000` or leave default |
| `FRONTEND_URL` | Full URL of your frontend (for CORS & Socket.io) | `https://your-app.vercel.app` |
| `MONGODB_URI`  | MongoDB Atlas connection string | `mongodb+srv://...` |
| `JWT_SECRET`   | Long random string for JWT | e.g. 32+ random characters |
| `DOCTOR_EMAIL` | Doctor login email | `drfalakkhaleelahmed@gmail.com` |
| `DOCTOR_PASSWORD` | Doctor login password | Your chosen password |
| `SMTP_*`       | Optional; for email notifications | Gmail or other SMTP |

### Frontend (set at build time)

| Variable        | Description | Example |
|----------------|-------------|--------|
| `VITE_API_URL` | Full URL of your backend API | `https://your-api.onrender.com` |

- **Development:** Leave `VITE_API_URL` empty (Vite proxy is used).
- **Production:** Set `VITE_API_URL` to your deployed backend URL (no trailing slash).

---

## 2. Deploy backend (e.g. Render)

### Using Render (free tier)

1. Go to [render.com](https://render.com) and sign up.
2. **New → Web Service**.
3. Connect your Git repo and choose the **backend** folder as root, or deploy from the repo root and set **Root Directory** to `backend`.
4. Configure:
   - **Build command:** `npm install`
   - **Start command:** `npm start` (or `node server.js`)
   - **Environment:** Add all backend env vars above (especially `MONGODB_URI`, `JWT_SECRET`, `FRONTEND_URL`).
5. Deploy. Note your backend URL, e.g. `https://falak-clinic-api.onrender.com`.

**Create doctor user after first deploy:**  
If your platform supports a one-off run (e.g. “Run command” or a separate job), run:

```bash
cd backend && node scripts/seed.js
```

Otherwise run the same command once from your machine with production `.env` (or use the backend’s “Shell” if available).

### Using Railway

1. Go to [railway.app](https://railway.app), connect the repo.
2. Add a **new service** from the `backend` directory.
3. Set env vars in the Railway dashboard.
4. Railway sets `PORT`; use `npm start` as start command.
5. Use the generated URL as your backend URL.

---

## 3. Deploy frontend (e.g. Vercel)

### Using Vercel (free tier)

1. Go to [vercel.com](https://vercel.com) and import your Git repo.
2. Set **Root Directory** to `frontend`.
3. **Build command:** `npm run build`  
   **Output directory:** `dist` (Vite default).
4. **Environment variables:** Add `VITE_API_URL` = your backend URL (e.g. `https://falak-clinic-api.onrender.com`).
5. Deploy. Your app will be at `https://your-project.vercel.app`.

### Using Netlify

1. Go to [netlify.com](https://netlify.com), connect the repo.
2. **Base directory:** `frontend`  
   **Build command:** `npm run build`  
   **Publish directory:** `frontend/dist`
3. Add env var `VITE_API_URL` = your backend URL.
4. Deploy.

---

## 4. Post-deploy checklist

1. **CORS / Socket.io:** Backend `FRONTEND_URL` must match the frontend URL exactly (including `https://`).
2. **Doctor login:** Run the seed script once to create the doctor user, or register manually if you add a signup flow.
3. **Test:** Open the frontend URL → Book Appointment → then log in to the dashboard and check appointments.

---

## 5. Deploy both on one server (VPS)

If you use a VPS (DigitalOcean, Linode, etc.):

### Backend

```bash
cd backend
npm install --production
PORT=5000 node server.js
```

Run with a process manager (e.g. **pm2**):

```bash
npm install -g pm2
cd backend
pm2 start server.js --name falak-api
pm2 save && pm2 startup
```

### Frontend (build and serve)

```bash
cd frontend
# Set your backend URL for the build
export VITE_API_URL=https://your-domain.com
npm ci && npm run build
```

Serve the `frontend/dist` folder with **Nginx** or another web server, and put the backend behind the same domain (e.g. `/api` and `/socket.io` proxied to the Node app). Then you can set `VITE_API_URL` to `''` so the frontend uses the same origin.

---

## 6. Quick reference

| Step | Action |
|------|--------|
| 1 | Set backend env vars (especially `MONGODB_URI`, `JWT_SECRET`, `FRONTEND_URL`) |
| 2 | Deploy backend → get URL (e.g. `https://api.example.com`) |
| 3 | Set frontend `VITE_API_URL` = backend URL |
| 4 | Deploy frontend → get URL (e.g. `https://app.example.com`) |
| 5 | Set backend `FRONTEND_URL` = frontend URL |
| 6 | Run `node scripts/seed.js` once (from backend dir with production env) |
| 7 | Test booking and doctor login |

---

## 7. Security notes

- Use a **strong `JWT_SECRET`** in production (e.g. 32+ random characters).
- Keep **MongoDB Atlas** IP allowlist or use VPC if required.
- **SMTP**: Prefer an app password, not your main email password.
- Do not commit `.env` files; use each platform’s environment variable settings.
