# Production deploy: Falak Family Clinic

Follow these steps in order to get a **working link** you can share with your client. No local run required after deploy.

---

## What you need before starting

- [ ] Code pushed to **GitHub** (one repo with `backend/` and `frontend/` folders)
- [ ] **MongoDB Atlas** cluster and connection string
- [ ] **Render** account (backend): [render.com](https://render.com)
- [ ] **Vercel** account (frontend): [vercel.com](https://vercel.com)

---

## Step 1: Deploy the backend on Render

### 1.1 Create the service

1. Go to [dashboard.render.com](https://dashboard.render.com) → **New +** → **Web Service**.
2. Connect your **GitHub** account and select the **clinic_mangement** repo (or the repo that contains `backend`).
3. Use these settings:

   | Field | Value |
   |-------|--------|
   | **Name** | `falak-clinic-api` (or any name) |
   | **Region** | Choose nearest to your client |
   | **Root Directory** | `backend` |
   | **Runtime** | Node |
   | **Build Command** | `npm install` |
   | **Start Command** | `npm start` |
   | **Instance Type** | Free |

4. Click **Advanced** and add **Environment Variables** (see table below).  
   You will add `FRONTEND_URL` in Step 3 after you have the frontend URL.

### 1.2 Backend environment variables (Render)

In **Environment** tab, add:

| Key | Value | Required |
|-----|--------|----------|
| `MONGODB_URI` | Your MongoDB Atlas connection string | Yes |
| `JWT_SECRET` | Long random string (e.g. 32+ chars) | Yes |
| `DOCTOR_EMAIL` | `drfalakkhaleelahmed@gmail.com` (or client’s email) | Yes |
| `DOCTOR_PASSWORD` | Strong password for doctor login | Yes |
| `FRONTEND_URL` | Leave empty for now; add after Step 2 | Yes (add in Step 3) |
| `PORT` | Leave empty (Render sets it) | No |
| `SMTP_HOST` | e.g. `smtp.gmail.com` | Optional |
| `SMTP_PORT` | `587` | Optional |
| `SMTP_USER` | Your email | Optional |
| `SMTP_PASS` | App password | Optional |

**MongoDB Atlas:** Database → Connect → “Connect your application” → copy the URI. Replace `<password>` with your DB user password.

5. Click **Create Web Service**. Wait for the first deploy to finish.
6. Copy your backend URL from the top of the dashboard, e.g.  
   `https://falak-clinic-api.onrender.com`  
   **No trailing slash.** You will use this as `VITE_API_URL` in the frontend.

---

## Step 2: Deploy the frontend on Vercel

### 2.1 Create the project

1. Go to [vercel.com](https://vercel.com) → **Add New** → **Project**.
2. Import the **same GitHub repo** (clinic_mangement).
3. Configure:

   | Field | Value |
   |-------|--------|
   | **Framework Preset** | Vite |
   | **Root Directory** | `frontend` (click Edit and set to `frontend`) |
   | **Build Command** | `npm run build` |
   | **Output Directory** | `dist` (default for Vite) |
   | **Install Command** | `npm install` |

### 2.2 Frontend environment variable (Vercel)

Before deploying, open **Environment Variables** and add:

| Name | Value |
|------|--------|
| `VITE_API_URL` | Your Render backend URL from Step 1, e.g. `https://falak-clinic-api.onrender.com` |

- **No trailing slash.**
- Apply to **Production** (and Preview if you want).

### 2.3 Deploy

Click **Deploy**. When it’s done, copy your frontend URL, e.g.  
`https://clinic-mangement-xxx.vercel.app`

---

## Step 3: Connect frontend and backend

1. In **Render** → your backend service → **Environment**.
2. Add or update:
   - **Key:** `FRONTEND_URL`
   - **Value:** Your Vercel frontend URL from Step 2, e.g. `https://clinic-mangement-xxx.vercel.app`
3. Save. Render will **redeploy** automatically. Wait for it to finish.

Your app is now connected: frontend calls backend via `VITE_API_URL`, and backend allows that frontend origin in CORS and Socket.io.

---

## Step 4: Seed the doctor account

You need to create the doctor user once in the production database.

### Option A: Render Shell (recommended)

1. Render → your backend service → **Shell** tab.
2. Run:

```bash
node scripts/seed.js
```

3. You should see: `Doctor user created. Login with: drfalakkhaleelahmed@gmail.com`  
   (or “Doctor user already exists” if you ran it before.)

### Option B: Run seed from your machine

1. Create a file (e.g. `backend/.env.production`) or use env vars in the shell with the **same** values as on Render:  
   `MONGODB_URI`, `DOCTOR_EMAIL`, `DOCTOR_PASSWORD`.
2. From the **project root** (parent of `backend`):

```bash
cd backend
set DOCTOR_EMAIL=drfalakkhaleelahmed@gmail.com
set DOCTOR_PASSWORD=YourChosenPassword
set MONGODB_URI=your_atlas_connection_string
node scripts/seed.js
```

(On Mac/Linux use `export` instead of `set`.)

---

## Step 5: Your working link and quick test

**Working link to give the client:**  
Your **Vercel frontend URL**, e.g.  
`https://clinic-mangement-xxx.vercel.app`

### Quick test

1. Open the link in a browser.
2. **Home** → “Book Appointment” → fill and submit → should see success.
3. Go to **Dashboard** (or `/login`) → log in with `DOCTOR_EMAIL` and `DOCTOR_PASSWORD`.
4. In the dashboard, confirm you see the new appointment and that charts/metrics load.

If the backend is on Render’s **free** tier, the first request after idle can take 30–50 seconds; after that it’s fast.

---

## Environment variables reference

### Backend (Render)

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret for JWT (use a long random string in production) |
| `FRONTEND_URL` | Full frontend URL (Vercel app URL), for CORS and Socket.io |
| `DOCTOR_EMAIL` | Doctor login email |
| `DOCTOR_PASSWORD` | Doctor login password |
| `SMTP_*` | Optional; for email notifications |

### Frontend (Vercel)

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Full backend URL (Render URL), no trailing slash. Used for API and Socket.io. |

**Important:** Any change to `VITE_API_URL` requires a **new frontend build** (redeploy on Vercel). Changes to backend env vars only need a backend redeploy.

---

## Render / Vercel tips

- **Render free tier:** Service may sleep after ~15 min idle; first request can be slow. Paid plan avoids this.
- **Vercel:** Free tier is usually enough; builds and env vars are in Project → Settings.
- **Redeploy:** Render and Vercel redeploy on git push if auto-deploy is on. You can also trigger “Manual Deploy” from the dashboard.

---

## Premium UI and charts

- **Tailwind:** Styles are built at `npm run build`; no extra config for production.
- **Recharts:** Already in `dependencies`; charts (dashboard metrics and status chart) are included in the bundle and work in production.
- **Routing:** `frontend/vercel.json` is set so all routes (e.g. `/dashboard`, `/login`, `/appointment`) serve `index.html` and the SPA works on refresh and direct links.

No extra steps needed for the premium UI or charts if the build succeeds.

---

## Optional: Custom domain

### Vercel (frontend)

1. Project → **Settings** → **Domains**.
2. Add your domain (e.g. `app.yourclinic.com`).
3. Follow Vercel’s instructions to add the DNS records (CNAME or A).
4. After adding the domain, set **Backend** `FRONTEND_URL` to the new URL (e.g. `https://app.yourclinic.com`) and redeploy the backend.

### Render (backend)

1. Service → **Settings** → **Custom Domain**.
2. Add the domain and configure DNS as shown.
3. Update **Frontend** `VITE_API_URL` to the new backend URL and redeploy the frontend.

Use **HTTPS** only in production; both Render and Vercel provide it by default.

---

## Troubleshooting

| Issue | What to check |
|-------|----------------|
| “Failed to load” / network errors | `VITE_API_URL` = backend URL (no slash). Backend has `FRONTEND_URL` = frontend URL. |
| Login fails | Seed was run; `DOCTOR_EMAIL` and `DOCTOR_PASSWORD` match what you use. |
| CORS error | Backend `FRONTEND_URL` exactly matches the URL in the browser (including `https://`). |
| Blank page on `/dashboard` or `/login` | `vercel.json` rewrites are in place; redeploy frontend. |
| Charts not showing | Open browser console for errors; ensure build completed and `recharts` is in `dependencies`. |

---

## Commands summary

**Local build test (optional):**

```bash
# Backend
cd backend
npm install
npm start

# Frontend (other terminal)
cd frontend
set VITE_API_URL=https://your-render-url.onrender.com
npm install
npm run build
npm run preview
```

**Seed doctor (production DB):**

```bash
cd backend
node scripts/seed.js
```

(With production env vars set in Render or in the shell.)

After Step 5, the **working link** is your Vercel URL. Share that with your client for access.
