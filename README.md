# Riyadvi Software Technologies — Corporate Website Revamp

A dynamic, multi-page, 3D-interactive full-stack corporate web application built to position **Riyadvi Software Technologies** as a **Technology & Digital Solutions Partner — not simply a software development vendor**.

---

## 1. Project Overview

Riyadvi Software Technologies (founded in 2021) required a complete digital transformation of its corporate presence (`www.riyadvisoftwaretechnologies.com`). Rather than a static single-page landing page, this project implements a production-grade, multi-page full-stack architecture featuring real-time 3D WebGL experiences, scroll-based storytelling, reusable data-driven page templates, multi-step lead generation diagnostics, a Node.js + Express + MongoDB backend API, and a live Admin Dashboard.

---

## 2. Features

- **Multi-Page Dynamic Routing (`React Router v6` + `React.lazy`):**
  - `/` — Showcase Homepage with 3D Hero Ecosystem, 6-Stage Digital Transformation Scroll Timeline, Interactive 6-Service 3D Stage, 3D Tech Constellation, and *Why Riyadvi* (Since 2021).
  - `/services` & `/services/:slug` — Single reusable service template dynamically powering all 6 core practices (`web-development`, `app-development`, `digital-marketing`, `ar-vr`, `3d-modeling`, `ui-ux-design`).
  - `/portfolio` & `/portfolio/:slug` — Dynamic portfolio hub and reusable case study template for all 10 reference clients (`Puratap`, `Wanaromah Perfumers`, `Laxmi Astro AI`, `Tony & Guy`, `Studio11`, `Sivam Physio Care`, `Pearl Housing`, `Nugenica Biotech Lab`, `VisDoc`, `Cube Dental`) including an interactive 3D presentation stage.
  - `/about` — Company story (Founded in 2021), Vision, Mission, Values, Recognition, and interactive GSAP scroll timeline.
  - `/blog` & `/blog/:slug` — CMS/API-ready blog hub with real-time search, category tabs, tag filters, featured article spotlight, and related posts.
  - `/careers` & `/careers/:jobSlug` — Dynamic job board with Department, Designation, and Experience filters plus an integrated application form.
  - `/business-health-checkup` — Interactive 6-step diagnostic funnel calculating a real-time Digital Readiness Score.
  - `/software-project-planning-guide` — Validated lead magnet funnel with instant downloadable blueprint generation.
  - `/contact` — Full contact enquiry form integrated with backend API, WhatsApp Business chat, and Calendly scheduling.
  - `/admin` — Full-stack Admin Dashboard displaying live lead metrics, filterable enquiries, status updates, and job applications.

---

## 3. Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | React.js 18 (Vite) + React Router DOM v6 |
| **Styling & Brand System** | TailwindCSS (`#D4AF37` Gold & `#000000` Black, Inter / Poppins / Montserrat) |
| **3D WebGL Engine** | Three.js (`three`), React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`) |
| **Advanced Animations** | GSAP + GSAP `ScrollTrigger`, Lenis Smooth Scroll, Framer Motion (`framer-motion`) |
| **Backend API** | Node.js + Express.js (`helmet`, `cors`, `morgan`, custom validation middleware) |
| **Database** | MongoDB + Mongoose ODM (with automatic in-memory fallback for zero-config local evaluation) |
| **Deployment** | Frontend: Vercel (`vercel.json`) • Backend: Render (`render.yaml`) / Railway |

---

## 4. Installation Instructions

### Prerequisites
- Node.js `v18+` and `npm`

### Step 1: Clone the Repository
```bash
git clone <your-github-repo-url>
cd riyadvi-website
```

### Step 2: Start the Backend API Server (`/backend`)
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```
The Express server starts on `http://localhost:5000`. (If `MONGODB_URI` is not yet configured in `.env`, it automatically runs with a pre-seeded in-memory store so all endpoints work out of the box.)

### Step 3: Start the Frontend Application (`/frontend`)
```bash
cd ../frontend
cp .env.example .env
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 5. Environment Variables

### `frontend/.env`
```ini
VITE_API_URL=http://localhost:5000/api
VITE_WHATSAPP_NUMBER=919876543210
VITE_CALENDLY_URL=https://calendly.com/riyadvi-consultation
```

### `backend/.env`
```ini
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/riyadvi_db?retryWrites=true&w=majority
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
```

---

## 6. Database Setup

1. Create a free MongoDB Atlas cluster at `https://www.mongodb.com/atlas` (or run local `mongod`).
2. Copy the connection string into `backend/.env` as `MONGODB_URI`.
3. Mongoose automatically initializes and indexes the 5 required collections on first write:
   - `contactenquiries` (`ContactEnquiry` schema)
   - `consultationrequests` (`ConsultationRequest` schema)
   - `healthcheckupleads` (`HealthCheckupLead` schema)
   - `leadmagnetleads` (`LeadMagnetLead` schema)
   - `careerapplications` (`CareerApplication` schema)

---

## 7. API Endpoints

| Method | Endpoint | Description | Required Body Fields |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | API & MongoDB health check | None |
| `POST` | `/api/contact` | Store contact page enquiry | `name`, `email`, `phone`, `requirement`, `message` |
| `POST` | `/api/consultation` | Store free consultation booking | `name`, `email`, `phone` |
| `POST` | `/api/health-checkup` | Store 6-step Business Health Checkup lead | `businessName`, `contactName`, `email`, `phone` |
| `POST` | `/api/lead-magnet` | Store Software Project Planning Guide lead | `name`, `company`, `email`, `phone` |
| `POST` | `/api/applications` | Store career job application | `name`, `email`, `phone`, `position`, `resume` |
| `GET` | `/api/admin/dashboard` | Retrieve aggregated counts & all records | None |

---

## 8. Deployment Instructions

### Frontend Deployment (Vercel)
1. Push repository to GitHub.
2. Import project in **Vercel** and set **Root Directory** to `frontend`.
3. Add environment variable `VITE_API_URL=https://<your-backend-url>/api`.
4. Deploy (`frontend/vercel.json` automatically configures SPA routing for all nested routes).

### Backend Deployment (Render)
1. Create a new **Web Service** on **Render** 
2. Build Command: `npm install` | Start Command: `npm start`.
3. Add environment variables `MONGODB_URI` and `CORS_ORIGIN=https://<your-vercel-frontend-url>`.

---

## 9. AI Tools Used

### AI Tool: Google Gemini

#### 1. 3D WebGL & Animation Engine Prototyping
- **Tool Name:** Google Gemini
- **Purpose:** Architecting the React Three Fiber (`@react-three/fiber`) procedural 3D scenes, Fibonacci sphere coordinate math, and GSAP `ScrollTrigger` timelines.
- **Example Prompt:**
  > *"Create a React Three Fiber component representing an interactive 3D digital transformation ecosystem with a metallic gold (#D4AF37) icosahedron core, gyroscopic orbital rings, and 6 clickable satellite nodes that respond to pointer parallax."*
- **What Was Generated:** Initial Three.js mesh hierarchy, pointer rotation math, and orbital ring structures for `HeroDigitalEcosystem3D.jsx`, `TechConstellation3D.jsx`, `ServiceVisualizer3D.jsx`, and `CaseStudyShowcase3D.jsx`.
- **What Was Manually Changed:**
  - Configured `zIndexRange={[10, 0]}` on `@react-three/drei` `<Html>` overlays and isolated the consultation modal (`z-[99999999] isolate`) so 3D labels never bleed through popups.
  - Built `WebGLCanvasWrapper.jsx` with `IntersectionObserver` to pause WebGL frame loops when scrolled off-screen and `useDevicePerformance.js` for mobile GPU optimization.
  - Synchronized Lenis smooth scrolling with `gsap.ticker` and `ScrollTrigger.update` in `useSmoothScroll.js`.
- **Why the Tool Was Selected:** Strong spatial reasoning for 3D trigonometry, React Three Fiber hook patterns, and multi-file full-stack context retention.

#### 2. Dynamic Content Architecture & Full-Stack API Scaffolding
- **Tool Name:** Google Gemini
- **Purpose:** Structuring the reusable data-driven page templates (`/services/:slug`, `/portfolio/:slug`, `/blog/:slug`, `/careers/:jobSlug`), the 6-step Business Health Checkup diagnostic, and the Node.js + Express + MongoDB backend schemas.
- **Example Prompt:**
  > *"Design a reusable React Router v6 template architecture and Express + Mongoose API schemas to handle Contact Enquiries, Consultation Requests, 6-step Business Health Checkup leads, Lead Magnet downloads, and Career Applications."*
- **What Was Generated:** Structured data schemas (`servicesData.js`, `portfolioData.js`, `blogData.js`, `careersData.js`), reusable page templates, Express validation routes, and Mongoose models (`schemas.js`).
- **What Was Manually Changed:**
  - Added `dns.setServers(["8.8.8.8", "1.1.1.1"])` in `backend/src/server.js` to resolve local ISP `querySrv ECONNREFUSED` DNS blocks when connecting to MongoDB Atlas.
  - Configured production CORS, `VITE_API_URL` endpoint normalization in `frontend/src/api/client.js`, and Vercel SPA rewrite rules (`frontend/vercel.json`).
- **Why the Tool Was Selected:** Ability to maintain strict design system consistency (`#D4AF37` Gold / `#000000` Black) and end-to-end schema alignment across both `/frontend` and `/backend` in a single workflow.

---

## 10. 3D Libraries Used

1. **`three` (Three.js):** Core WebGL rendering, vector interpolation (`THREE.MathUtils.lerp`), and PBR metallic/wireframe materials.
2. **`@react-three/fiber`:** React reconciler for Three.js powering `HeroDigitalEcosystem3D`, `TechConstellation3D`, `ServiceVisualizer3D`, and `CaseStudyShowcase3D`.
3. **`@react-three/drei`:** High-level helpers including `<Float>`, `<Html>`, `<MeshDistortMaterial>`, `<OrbitControls>`, `<Sparkles>`, `<Stars>`, and `<Line>`.

---

## 11. Animation Libraries Used

1. **`gsap` & `ScrollTrigger`:** Drives the scrubbed gold progress beam and scroll-triggered step reveals in `ScrollStoryTimeline.jsx`.
2. **`lenis`:** Provides smooth inertial scrolling across all pages, synchronized with `gsap.ticker`.
3. **`framer-motion`:** Powers 3D perspective cursor tilt cards (`MagneticTiltCard.jsx`) and UI micro-interactions.

---

## 12. Third-Party Assets

- **Typography:** Google Fonts (`Inter`, `Poppins`, `Montserrat`).
- **Icons:** `lucide-react` vector icons.
- **3D Models:** 100% procedural, zero-external-blocking PBR geometries generated in code for instant network loading and zero broken asset links.

---

## 13. Performance Optimization

- **Route-Level Code Splitting:** All 14 pages use `React.lazy()` and `<Suspense>` in `App.jsx`.
- **Vendor Chunk Splitting:** `vite.config.js` separates `vendor`, `three`, and `animation` bundles.
- **Off-Screen WebGL Pausing:** `WebGLCanvasWrapper.jsx` uses `IntersectionObserver` to set `frameloop="never"` when a 3D canvas leaves the viewport.
- **Mobile GPU Strategy:** `useDevicePerformance.js` detects mobile viewports, low CPU core counts, and `prefers-reduced-motion` to lower pixel ratios and particle density.

---

## 14. Known Limitations

- Authentication on `/admin` is currently open for frictionless evaluator inspection during assignment review.
- File upload for candidate resumes on `/careers/:jobSlug` accepts portfolio/resume URLs rather than binary S3/GridFS uploads.

---

## 15. Future Improvements

- Add JWT + Role-Based Access Control (RBAC) to `/admin` and automated SMTP/WhatsApp webhook notifications on lead creation.
- Connect `/blog` and `/portfolio` to a live headless CMS (Sanity / Strapi) with incremental static regeneration.
- Expand the 3D Case Study viewer with custom Draco-compressed `.glb` product scans for each client.
