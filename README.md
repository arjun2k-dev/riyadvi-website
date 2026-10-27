# Riyadvi Software Technologies — V2 Full-Stack, 3D WebGL & AI-Assisted Corporate Platform

A modern, dynamic, full-stack corporate web application built for **Riyadvi Software Technologies** (`www.riyadvisoftwaretechnologies.com`), engineered with **React 18, Three.js (React Three Fiber + Drei), GSAP ScrollTrigger, Lenis Smooth Scroll, Framer Motion, TailwindCSS, Node.js, Express.js, and MongoDB Atlas**.

---

## 1. Project Overview
Riyadvi Software Technologies is positioned as a **Complete Digital Growth & Technology Partner**. This V2 platform goes beyond a conventional corporate website by combining:
- **Live MongoDB-Driven Dynamic Content Architecture**: All 6 Services, 10 Portfolio Case Studies, 6 Blog Articles, and 5 Career Openings are seeded into and served live from **MongoDB Atlas** via REST APIs (`GET /api/content`, `GET /api/services`, `GET /api/portfolio`, `GET /api/blogs`, `GET /api/careers`).
- **Dynamic CMS Publisher inside `/admin`**: Administrators and evaluators can create new Services, Case Studies, Blog Posts, and Career Openings directly in `/admin` (`POST /api/admin/content/:type`), immediately generating live routes across the website without touching code.
- **Interactive On-Page AI Solutions Architect (`POST /api/ai/architect`)**: Visitors can select their industry, scale, and business objective to generate a custom full-stack & 3D system blueprint (recommended stack, sprint roadmap, 3D modules, and ROI projection) calculated by the backend and logged in MongoDB.
- **Studio-Grade Interactive 3D WebGL Scenes**: Reactive 400-particle 3D wave field, multi-ring quantum core, camera preset switchers, and integrated glassmorphic HUD telemetry bars that never overlap modals or mobile navigation drawers.

---

## 2. Technology Stack
- **Frontend Framework**: React.js 18 (Vite) + React Router v6
- **Styling & Design System**: TailwindCSS (`#D4AF37` Brand Gold + `#000000` Deep Obsidian Black, `Poppins` / `Inter` / `JetBrains Mono`)
- **3D & Spatial WebGL**: Three.js (`three`), React Three Fiber (`@react-three/fiber`), React Three Drei (`@react-three/drei`)
- **Animation Engine**: GSAP + ScrollTrigger (`gsap`), Lenis Smooth Scroll (`lenis`), Framer Motion (`framer-motion`)
- **Backend API**: Node.js + Express.js (`https://riyadvi-backend-api.onrender.com`)
- **Database**: MongoDB Atlas + Mongoose ODM (`mongoose`) with automatic startup seeding and DNS SRV resolution (`8.8.8.8` / `1.1.1.1`)

---

## 3. Features Implemented
1. **Interactive 3D Hero Digital Ecosystem**: 400-node reactive wave matrix + multi-ring quantum core + 6 orbiting service nodes + interactive camera presets (`Orbit`, `Top Matrix`, `Core Close-Up`).
2. **Interactive 3D Technology Constellation**: Orbiting technology nodes across Frontend, Backend, Mobile, 3D/XR, and AI/Cloud with interactive filtering.
3. **Interactive 3D Case Study Showcase Stage**: 3D KPI pedestals + rotating holographic trophy core.
4. **Riyadvi AI Solutions Architect Console**: Real-time AI architecture generator powered by `POST /api/ai/architect` and logged in MongoDB.
5. **Business Health Checkup Tool (`/business-health-checkup`)**: 4-step interactive diagnostic scoring calculator with MongoDB lead persistence (`POST /api/health-checkup`).
6. **Lead Magnet Funnel (`/software-project-planning-guide`)**: Gated executive blueprint download (`POST /api/lead-magnet`).
7. **Built-In Calendly Discovery Slot Scheduler (`/contact`)**: Interactive date + IST time-slot picker saving directly to `POST /api/consultation` (zero external 404s) alongside instant WhatsApp deep-linking.
8. **Executive Admin & Dynamic CMS Portal (`/admin`)**: Tracks all 6 database collections (`ContactEnquiry`, `ConsultationRequest`, `HealthCheckupLead`, `LeadMagnetLead`, `CareerApplication`, `AIBlueprintLog`) and includes the **Dynamic CMS Publisher**.

---

## 4. Dynamic Content Architecture (MongoDB + Context API)
- **Backend Models (`backend/src/models/schemas.js`)**:
  - Content Collections: `ServiceContent`, `PortfolioContent`, `BlogContent`, `CareerContent`
  - Lead & Telemetry Collections: `ContactEnquiry`, `ConsultationRequest`, `HealthCheckupLead`, `LeadMagnetLead`, `CareerApplication`, `AIBlueprintLog`
- **Auto-Seeding**: On startup, `ensureInitialContentSeeded()` checks MongoDB and seeds the 6 services, 10 portfolio case studies, 6 blog articles, and 5 career roles if the collections are empty.
- **Global Frontend Provider (`frontend/src/context/ContentContext.jsx`)**: Fetches `GET /api/content` on boot, tracks live latency and MongoDB connection telemetry, and exposes `useContent()` across every page.

---

## 5. 3D & Animation Implementation
- **`HeroDigitalEcosystem3D.jsx`**: Custom `THREE.BufferGeometry` 400-point dynamic wave matrix animated at 60fps in `useFrame`, multi-ring gyroscope core, and interactive HUD selector bar.
- **`TechConstellation3D.jsx`**: 3D orbital constellation mapping Riyadvi's engineering stack with category filtering.
- **`CaseStudyShowcase3D.jsx`**: Spatial 3D KPI pillars and rotating wireframe icosahedron.
- **`ServiceVisualizer3D.jsx`**: Service-specific 3D procedural geometries for all 6 service lines.
- **GSAP + Lenis (`useSmoothScroll.js`, `ScrollStoryTimeline.jsx`, `MagneticTiltCard.jsx`)**: Inertial smooth scrolling, scroll-scrubbed progress timelines, and 3D perspective card tilt.

---

## 6. Backend API Documentation
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Returns MongoDB connection state and collection document counts |
| `GET` | `/api/content` | Returns all dynamic Services, Portfolio, Blogs, and Careers from MongoDB |
| `GET` | `/api/services` | Returns all dynamic Service documents from MongoDB |
| `GET` | `/api/portfolio` | Returns all dynamic Portfolio Case Study documents from MongoDB |
| `GET` | `/api/blogs` | Returns all dynamic Blog Article documents from MongoDB |
| `GET` | `/api/careers` | Returns all dynamic Career Role documents from MongoDB |
| `POST` | `/api/ai/architect` | Generates a custom AI system architecture blueprint & logs to MongoDB |
| `POST` | `/api/admin/content/:type` | Dynamic CMS endpoint to publish a new Service, Portfolio, Blog, or Career |
| `POST` | `/api/contact` | Saves a Contact Enquiry to MongoDB & triggers email notification |
| `POST` | `/api/consultation` | Saves a Consultation / Calendly Slot Booking to MongoDB |
| `POST` | `/api/health-checkup` | Saves a Business Health Checkup diagnostic result to MongoDB |
| `POST` | `/api/lead-magnet` | Saves a Software Project Planning Guide lead to MongoDB |
| `POST` | `/api/applications` | Saves a Job Application to MongoDB |
| `GET` | `/api/admin/dashboard` | Returns all leads, applications, AI logs, and KPI counts for `/admin` |

---

## 7. Database Structure
10 Mongoose schemas defined in `backend/src/models/schemas.js`:
1. `ServiceContent` (`slug`, `title`, `tagline`, `visualType`, `problem`, `solution`, `keyFeatures`, `industries`, `technologies`, `metrics`)
2. `PortfolioContent` (`slug`, `client`, `industry`, `timeline`, `summary`, `challenge`, `solution`, `technologies`, `results`, `visuals`)
3. `BlogContent` (`slug`, `title`, `category`, `readTime`, `author`, `tags`, `excerpt`, `content`)
4. `CareerContent` (`slug`, `title`, `department`, `designation`, `experience`, `location`, `responsibilities`, `requirements`)
5. `AIBlueprintLog` (`industry`, `companyScale`, `projectGoal`, `recommendedStack`, `estimatedTimeline`, `estimatedImpact`, `architecturePhases`)
6. `ContactEnquiry`
7. `ConsultationRequest`
8. `HealthCheckupLead`
9. `LeadMagnetLead`
10. `CareerApplication`

---

## 8. Setup & Installation Instructions

### Backend Setup (`/backend`)
```bash
cd backend
npm install
# Configure .env with MONGODB_URI
npm run dev
```

### Frontend Setup (`/frontend`)
```bash
cd frontend
npm install
# Configure .env with VITE_API_URL=https://riyadvi-backend-api.onrender.com/api
npm run dev
```

---

## 9. AI Tools Used
- **Google Gemini**: Used exclusively as the end-to-end AI coding and architecture partner across the entire project—including full-stack React + Express + MongoDB system design, Three.js / React Three Fiber 3D procedural WebGL shaders and particle wave scenes, GSAP + Lenis animation choreography, the on-page AI Solutions Architect engine, and automated deployment configuration.
