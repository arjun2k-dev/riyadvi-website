import express from "express";
import mongoose from "mongoose";
import {
  ContactEnquiry,
  ConsultationRequest,
  HealthCheckupLead,
  LeadMagnetLead,
  CareerApplication,
  ServiceContent,
  PortfolioContent,
  BlogContent,
  CareerContent,
  AIBlueprintLog
} from "../models/schemas.js";
import { validateFields } from "../middleware/validate.js";
import { SERVICES_DATA } from "../data/servicesData.js";
import { PORTFOLIO_DATA } from "../data/portfolioData.js";
import { BLOG_DATA } from "../data/blogData.js";
import { CAREERS_DATA } from "../data/careersData.js";

const router = express.Router();

const memoryStore = {
  contacts: [
    {
      _id: "enq-101",
      name: "Arjun Mehta",
      email: "arjun@puratap-india.com",
      phone: "+91 98401 22310",
      company: "Puratap Water Systems",
      requirement: "Web Development & 3D Product Configurator",
      message: "Looking to scale our subscription filter portal with interactive 3D visuals.",
      status: "In Review",
      createdAt: "2026-10-19T10:30:00.000Z"
    },
    {
      _id: "enq-102",
      name: "Dr. Kavitha Nair",
      email: "dr.kavitha@nugenicabiotech.com",
      phone: "+91 98410 88920",
      company: "Nugenica Biotech Lab",
      requirement: "Custom Clinician Portal & API Integration",
      message: "Need a secure diagnostic assay portal integrated with our laboratory LIMS.",
      status: "New",
      createdAt: "2026-10-21T09:15:00.000Z"
    }
  ],
  consultations: [
    {
      _id: "con-201",
      name: "Vikramaditya Rao",
      email: "vikram@pearlhousing.in",
      phone: "+91 98840 55112",
      company: "Pearl Housing",
      serviceInterest: "AR / VR Solutions",
      preferredDate: "2026-10-28",
      status: "Scheduled",
      createdAt: "2026-10-21T14:15:00.000Z"
    }
  ],
  healthCheckups: [
    {
      _id: "hc-301",
      businessName: "Wanaromah Perfumers",
      industry: "Luxury Retail & D2C",
      contactName: "Aarav Sharma",
      email: "founder@wanaromah.com",
      phone: "+91 97909 44120",
      score: 84,
      primaryChallenge: "Scaling 3D bottle customization & international D2C ROAS",
      status: "Report Sent",
      createdAt: "2026-10-20T09:00:00.000Z"
    }
  ],
  leadMagnets: [
    {
      _id: "lm-401",
      name: "Sanjay Subramanian",
      company: "VisDoc HealthTech",
      email: "sanjay@visdoc.in",
      phone: "+91 98409 77321",
      status: "Downloaded",
      createdAt: "2026-10-21T11:45:00.000Z"
    }
  ],
  applications: [
    {
      _id: "app-501",
      name: "Priya Darshini",
      email: "priya.webgl@devmail.com",
      phone: "+91 95001 33412",
      position: "Senior Full-Stack Developer (React.js / Node.js / 3D Web)",
      resume: "https://github.com/priya-fullstack-3d",
      message: "4 years building React Three Fiber & MERN stack platforms.",
      status: "Shortlisted",
      createdAt: "2026-10-22T08:20:00.000Z"
    }
  ],
  services: [...SERVICES_DATA],
  portfolio: [...PORTFOLIO_DATA],
  blogs: [...BLOG_DATA],
  careers: [...CAREERS_DATA],
  aiBlueprints: []
};

const isMongoConnected = () => mongoose.connection.readyState === 1;

// Auto-seed MongoDB collections on startup if empty so dynamic APIs always return rich production data
export async function ensureInitialContentSeeded() {
  if (!isMongoConnected()) return;
  try {
    const [srvCount, portCount, blogCount, jobCount, contactCount] = await Promise.all([
      ServiceContent.countDocuments(),
      PortfolioContent.countDocuments(),
      BlogContent.countDocuments(),
      CareerContent.countDocuments(),
      ContactEnquiry.countDocuments()
    ]);

    if (srvCount === 0) await ServiceContent.insertMany(SERVICES_DATA);
    if (portCount === 0) await PortfolioContent.insertMany(PORTFOLIO_DATA);
    if (blogCount === 0) await BlogContent.insertMany(BLOG_DATA);
    if (jobCount === 0) await CareerContent.insertMany(CAREERS_DATA);
    if (contactCount === 0) {
      await ContactEnquiry.insertMany(memoryStore.contacts.map(({ _id, ...r }) => r));
      await ConsultationRequest.insertMany(memoryStore.consultations.map(({ _id, ...r }) => r));
      await HealthCheckupLead.insertMany(memoryStore.healthCheckups.map(({ _id, ...r }) => r));
      await LeadMagnetLead.insertMany(memoryStore.leadMagnets.map(({ _id, ...r }) => r));
      await CareerApplication.insertMany(memoryStore.applications.map(({ _id, ...r }) => r));
    }
    console.log("✅ Verified / Auto-Seeded Dynamic Content Collections in MongoDB");
  } catch (err) {
    console.warn("ℹ️ Auto-seed check skipped:", err.message);
  }
}

async function createRecord(Model, memKey, payload) {
  if (isMongoConnected()) {
    return await Model.create(payload);
  }
  const item = {
    _id: `${memKey}-${Date.now()}`,
    ...payload,
    status: payload.status || "New",
    createdAt: new Date().toISOString()
  };
  memoryStore[memKey].unshift(item);
  return item;
}

// ============================================================================
// DYNAMIC CONTENT REST ENDPOINTS (Services, Portfolio, Blogs, Careers)
// ============================================================================

router.get("/content", async (req, res, next) => {
  const start = Date.now();
  try {
    if (isMongoConnected()) {
      const [services, portfolio, blogs, careers, aiCount] = await Promise.all([
        ServiceContent.find().sort({ createdAt: 1 }).lean(),
        PortfolioContent.find().sort({ createdAt: -1 }).lean(),
        BlogContent.find().sort({ createdAt: -1 }).lean(),
        CareerContent.find().sort({ createdAt: -1 }).lean(),
        AIBlueprintLog.countDocuments()
      ]);

      return res.json({
        success: true,
        source: "mongodb",
        latencyMs: Date.now() - start,
        counts: {
          services: services.length,
          portfolio: portfolio.length,
          blogs: blogs.length,
          careers: careers.length,
          aiBlueprints: aiCount
        },
        data: {
          services: services.length ? services : SERVICES_DATA,
          portfolio: portfolio.length ? portfolio : PORTFOLIO_DATA,
          blogs: blogs.length ? blogs : BLOG_DATA,
          careers: careers.length ? careers : CAREERS_DATA
        }
      });
    }

    res.json({
      success: true,
      source: "memory-fallback",
      latencyMs: Date.now() - start,
      counts: {
        services: memoryStore.services.length,
        portfolio: memoryStore.portfolio.length,
        blogs: memoryStore.blogs.length,
        careers: memoryStore.careers.length,
        aiBlueprints: memoryStore.aiBlueprints.length
      },
      data: {
        services: memoryStore.services,
        portfolio: memoryStore.portfolio,
        blogs: memoryStore.blogs,
        careers: memoryStore.careers
      }
    });
  } catch (err) {
    next(err);
  }
});

router.get("/services", async (req, res, next) => {
  try {
    const data = isMongoConnected()
      ? await ServiceContent.find().sort({ createdAt: 1 }).lean()
      : memoryStore.services;
    res.json({ success: true, source: isMongoConnected() ? "mongodb" : "memory", data });
  } catch (err) {
    next(err);
  }
});

router.get("/portfolio", async (req, res, next) => {
  try {
    const data = isMongoConnected()
      ? await PortfolioContent.find().sort({ createdAt: -1 }).lean()
      : memoryStore.portfolio;
    res.json({ success: true, source: isMongoConnected() ? "mongodb" : "memory", data });
  } catch (err) {
    next(err);
  }
});

router.get("/blogs", async (req, res, next) => {
  try {
    const data = isMongoConnected()
      ? await BlogContent.find().sort({ createdAt: -1 }).lean()
      : memoryStore.blogs;
    res.json({ success: true, source: isMongoConnected() ? "mongodb" : "memory", data });
  } catch (err) {
    next(err);
  }
});

router.get("/careers", async (req, res, next) => {
  try {
    const data = isMongoConnected()
      ? await CareerContent.find().sort({ createdAt: -1 }).lean()
      : memoryStore.careers;
    res.json({ success: true, source: isMongoConnected() ? "mongodb" : "memory", data });
  } catch (err) {
    next(err);
  }
});

// Create new Dynamic Content item directly from Admin Dashboard CMS
router.post("/admin/content/:type", async (req, res, next) => {
  try {
    const { type } = req.params;
    const payload = req.body;

    if (type === "service") {
      const slug =
        payload.slug ||
        payload.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const docData = {
        slug,
        title: payload.title,
        shortTitle: payload.shortTitle || payload.title,
        tagline: payload.tagline || "Custom Enterprise Digital Practice",
        visualType: payload.visualType || "Interactive 3D Architecture Matrix",
        heroDescription: payload.heroDescription || payload.summary || "Tailored engineering solution.",
        problem: payload.problem || "Legacy workflows and fragmented digital systems limit growth.",
        solution: payload.solution || "Riyadvi engineers a modular, cloud-native platform with interactive 3D and AI.",
        keyFeatures: payload.keyFeatures || [
          "Custom React & Node.js Full-Stack Architecture",
          "Interactive 3D WebGL & GSAP Motion System",
          "MongoDB Cloud Scalability & REST API Integration"
        ],
        industryUseCases: [
          { industry: "Enterprise SaaS", useCase: "Automated multi-tenant operations" },
          { industry: "Healthcare & Retail", useCase: "High-conversion customer portals" }
        ],
        techStack: payload.techStack || ["React.js", "Three.js", "Node.js", "Express.js", "MongoDB", "GSAP"],
        process: [
          { step: "01", title: "Discovery", desc: "Audit requirements & KPIs." },
          { step: "02", title: "3D & UI Design", desc: "Interactive prototyping." },
          { step: "03", title: "Full-Stack Build", desc: "Agile React + Node sprints." },
          { step: "04", title: "Scale", desc: "Cloud launch & CRO." }
        ],
        metrics: [
          { value: "3.1x", label: "Conversion Velocity" },
          { value: "99.9%", label: "Uptime SLA" },
          { value: "60fps", label: "WebGL Fluidity" }
        ],
        relatedPortfolio: ["puratap", "laxmi-astro-ai", "wanaromah"]
      };
      const created = isMongoConnected()
        ? await ServiceContent.findOneAndUpdate({ slug }, docData, { upsert: true, new: true })
        : (memoryStore.services.push(docData), docData);
      return res.status(201).json({ success: true, message: "Dynamic Service published!", data: created });
    }

    if (type === "portfolio") {
      const slug =
        payload.slug ||
        payload.client.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const docData = {
        slug,
        client: payload.client,
        title: payload.title,
        industry: payload.industry || "Enterprise Technology",
        summary: payload.summary,
        challenge: payload.challenge || "Needed a modern, high-converting digital transformation platform.",
        solution: payload.solution || "Built a full-stack React + 3D WebGL + Node.js + MongoDB ecosystem.",
        technologies: payload.technologies || ["React.js", "Three.js", "Node.js", "MongoDB", "GSAP"],
        results: payload.results || [
          { metric: "+215%", label: "Digital Lead Growth" },
          { metric: "3.2x", label: "User Engagement" },
          { metric: "<0.9s", label: "Page Load Speed" }
        ],
        visuals: [
          "Interactive 3D Product & Architecture Stage",
          "Real-Time Analytics & Conversion Funnel",
          "Automated CRM & WhatsApp Lead Routing"
        ],
        relatedServices: ["web-development", "3d-modeling", "ui-ux-design"],
        has3DShowcase: true,
        accentColor: "#D4AF37"
      };
      const created = isMongoConnected()
        ? await PortfolioContent.findOneAndUpdate({ slug }, docData, { upsert: true, new: true })
        : (memoryStore.portfolio.unshift(docData), docData);
      return res.status(201).json({ success: true, message: "Dynamic Case Study published!", data: created });
    }

    if (type === "blog") {
      const slug =
        payload.slug ||
        payload.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const docData = {
        slug,
        title: payload.title,
        excerpt: payload.excerpt,
        category: payload.category || "3D & WebGL",
        tags: payload.tags || ["Three.js", "Full-Stack", "AI", "MongoDB"],
        author: payload.author || "Riyadvi Architecture Team",
        authorRole: "Principal Solutions Architects",
        publishedAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
        readTime: "5 min read",
        featured: false,
        content: Array.isArray(payload.content)
          ? payload.content
          : [
              payload.excerpt,
              payload.body ||
                "Modern digital transformation requires unifying 3D interactive storytelling, AI-assisted engineering, and resilient Node.js + MongoDB backend architectures."
            ]
      };
      const created = isMongoConnected()
        ? await BlogContent.findOneAndUpdate({ slug }, docData, { upsert: true, new: true })
        : (memoryStore.blogs.unshift(docData), docData);
      return res.status(201).json({ success: true, message: "Dynamic Blog Article published!", data: created });
    }

    if (type === "career") {
      const jobSlug =
        payload.jobSlug ||
        payload.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const docData = {
        jobSlug,
        title: payload.title,
        department: payload.department || "Engineering",
        designation: payload.designation || "Full-Stack Engineer",
        experience: payload.experience || "2–4 Years",
        location: payload.location || "Chennai / Hybrid",
        type: "Full-Time",
        summary: payload.summary,
        responsibilities: payload.responsibilities || [
          "Architect scalable React.js, Three.js, and Node.js + MongoDB applications.",
          "Collaborate across UI/UX, 3D modeling, and AI engineering squads."
        ],
        requirements: payload.requirements || [
          "Strong proficiency in React, TailwindCSS, Node.js, Express, and MongoDB.",
          "Experience with GSAP, Framer Motion, or React Three Fiber."
        ]
      };
      const created = isMongoConnected()
        ? await CareerContent.findOneAndUpdate({ jobSlug }, docData, { upsert: true, new: true })
        : (memoryStore.careers.unshift(docData), docData);
      return res.status(201).json({ success: true, message: "Dynamic Job Opening published!", data: created });
    }

    res.status(400).json({ success: false, message: "Unsupported content type" });
  } catch (err) {
    next(err);
  }
});

// ============================================================================
// INTERACTIVE AI SOLUTIONS ARCHITECT ENDPOINT (POST /api/ai/architect)
// ============================================================================

router.post("/ai/architect", async (req, res, next) => {
  try {
    const { prompt = "", industry = "Enterprise SaaS", goal = "Full-Stack + 3D Transformation" } = req.body;
    const lower = `${prompt} ${industry} ${goal}`.toLowerCase();

    const recommendedStack = ["React.js 18", "TailwindCSS", "Node.js + Express", "MongoDB Atlas"];
    const recommendedServices = [];
    const matchedCaseStudies = [];

    if (lower.includes("3d") || lower.includes("ar") || lower.includes("vr") || lower.includes("real estate") || lower.includes("luxury") || lower.includes("product")) {
      recommendedStack.push("Three.js", "React Three Fiber", "Drei", "Draco GLTF");
      recommendedServices.push(
        { slug: "3d-modeling", title: "3D Modeling & WebGL Twins" },
        { slug: "ar-vr", title: "AR / VR Spatial Computing" }
      );
      matchedCaseStudies.push(
        { slug: "pearl-housing", client: "Pearl Housing", outcome: "3.1x Site Visit Conversion" },
        { slug: "wanaromah", client: "Wanaromah Perfumers", outcome: "+210% D2C Online Revenue" }
      );
    }

    if (lower.includes("app") || lower.includes("mobile") || lower.includes("ios") || lower.includes("android") || lower.includes("booking") || lower.includes("health")) {
      recommendedStack.push("React Native / Flutter", "Socket.io Real-Time", "REST / GraphQL API");
      recommendedServices.push({ slug: "app-development", title: "Mobile App Development" });
      matchedCaseStudies.push(
        { slug: "laxmi-astro-ai", client: "Laxmi Astro AI", outcome: "+240% Daily Engagement" },
        { slug: "visdoc", client: "VisDoc Telemedicine", outcome: "+230% Monthly Consultations" }
      );
    }

    if (lower.includes("marketing") || lower.includes("seo") || lower.includes("lead") || lower.includes("growth") || lower.includes("sales")) {
      recommendedStack.push("GSAP ScrollTrigger", "Technical SEO Schema", "GA4 Attribution Funnel");
      recommendedServices.push({ slug: "digital-marketing", title: "Digital Growth Marketing" });
      matchedCaseStudies.push({ slug: "tony-and-guy", client: "Tony & Guy", outcome: "+180% Online Bookings" });
    }

    // Always include core Web & UI/UX
    if (!recommendedServices.some((s) => s.slug === "web-development")) {
      recommendedServices.unshift({ slug: "web-development", title: "Custom Web Development" });
    }
    if (!recommendedServices.some((s) => s.slug === "ui-ux-design")) {
      recommendedServices.push({ slug: "ui-ux-design", title: "UI/UX & Design Systems" });
    }
    if (!matchedCaseStudies.length) {
      matchedCaseStudies.push(
        { slug: "puratap", client: "Puratap", outcome: "2.8x Conversion Lift" },
        { slug: "nugenica-biotech-lab", client: "Nugenica Biotech Lab", outcome: "+195% Clinician Leads" }
      );
    }

    const blueprint = {
      projectTitle: prompt ? `AI Architecture Blueprint: ${prompt.slice(0, 52)}` : `Riyadvi ${industry} Digital Ecosystem`,
      industry,
      estimatedWeeks: "6–10 Weeks (Agile Full-Stack + 3D Sprints)",
       projectedROI: "+185% to +260% Conversion & Engagement Lift",
      architectureSummary: `Engineered with a decoupled React 18 + Three.js/R3F interactive frontend, GSAP ScrollTrigger storytelling, and a validated Node.js + Express REST API backed by MongoDB Atlas collections for real-time lead and content management.`,
      recommendedStack: Array.from(new Set([...recommendedStack, "GSAP ScrollTrigger", "Lenis Smooth Scroll", "Framer Motion"])),
      sprintRoadmap: [
        { phase: "Weeks 1–2", title: "AI-Assisted Discovery & 3D/UX Prototyping", detail: "System schema design, tokenized dark/gold UI kit, and interactive WebGL proof-of-concept." },
        { phase: "Weeks 3–6", title: "Full-Stack React + Node.js + MongoDB Engineering", detail: "Dynamic content templates, custom 3D configurators, and validated REST API endpoints." },
        { phase: "Weeks 7–8", title: "Mobile GPU Optimization & Cloud CI/CD", detail: "IntersectionObserver WebGL tuning, Lighthouse 95+ audit, and Vercel + Render deployment." }
      ],
      recommendedServices: recommendedServices.slice(0, 4),
      matchedCaseStudies: matchedCaseStudies.slice(0, 3)
    };

    if (isMongoConnected()) {
      await AIBlueprintLog.create({
        prompt: prompt || industry,
        industry,
        recommendedStack: blueprint.recommendedStack,
        estimatedWeeks: blueprint.estimatedWeeks,
        architectureSummary: blueprint.architectureSummary
      });
    } else {
      memoryStore.aiBlueprints.unshift({ ...blueprint, createdAt: new Date().toISOString() });
    }

    res.status(201).json({
      success: true,
      source: isMongoConnected() ? "mongodb-logged" : "memory-logged",
      data: blueprint
    });
  } catch (err) {
    next(err);
  }
});

// ============================================================================
// LEAD CAPTURE & ADMIN ENDPOINTS
// ============================================================================

router.post(
  "/contact",
  validateFields(["name", "email", "phone", "requirement", "message"]),
  async (req, res, next) => {
    try {
      const data = await createRecord(ContactEnquiry, "contacts", req.body);
      res.status(201).json({
        success: true,
        message: "Contact enquiry saved to MongoDB.",
        data
      });
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/consultation",
  validateFields(["name", "email", "phone"]),
  async (req, res, next) => {
    try {
      const data = await createRecord(ConsultationRequest, "consultations", req.body);
      res.status(201).json({
        success: true,
        message: "Consultation request registered in MongoDB.",
        data
      });
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/health-checkup",
  validateFields(["businessName", "contactName", "email", "phone"]),
  async (req, res, next) => {
    try {
      const data = await createRecord(HealthCheckupLead, "healthCheckups", req.body);
      res.status(201).json({
        success: true,
        message: "Business Health Checkup diagnostic stored in MongoDB.",
        data
      });
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/lead-magnet",
  validateFields(["name", "company", "email", "phone"]),
  async (req, res, next) => {
    try {
      const data = await createRecord(LeadMagnetLead, "leadMagnets", {
        ...req.body,
        status: "Downloaded"
      });
      res.status(201).json({
        success: true,
        message: "Lead magnet download recorded in MongoDB.",
        data
      });
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/applications",
  validateFields(["name", "email", "phone", "position", "resume"]),
  async (req, res, next) => {
    try {
      const data = await createRecord(CareerApplication, "applications", req.body);
      res.status(201).json({
        success: true,
        message: "Job application stored in MongoDB.",
        data
      });
    } catch (err) {
      next(err);
    }
  }
);

router.patch("/admin/status/:collection/:id", async (req, res, next) => {
  try {
    const { collection, id } = req.params;
    const { status } = req.body;
    const modelMap = {
      contacts: ContactEnquiry,
      consultations: ConsultationRequest,
      healthCheckups: HealthCheckupLead,
      leadMagnets: LeadMagnetLead,
      applications: CareerApplication
    };
    const Model = modelMap[collection];
    if (isMongoConnected() && Model && mongoose.Types.ObjectId.isValid(id)) {
      const updated = await Model.findByIdAndUpdate(id, { status }, { new: true });
      return res.json({ success: true, data: updated });
    }
    if (memoryStore[collection]) {
      memoryStore[collection] = memoryStore[collection].map((item) =>
        (item._id || item.id) === id ? { ...item, status } : item
      );
    }
    res.json({ success: true, status });
  } catch (err) {
    next(err);
  }
});

router.get("/admin/dashboard", async (req, res, next) => {
  try {
    if (isMongoConnected()) {
      const [
        contacts,
        consultations,
        healthCheckups,
        leadMagnets,
        applications,
        servicesCount,
        portfolioCount,
        blogsCount,
        careersCount,
        aiBlueprints
      ] = await Promise.all([
        ContactEnquiry.find().sort({ createdAt: -1 }).lean(),
        ConsultationRequest.find().sort({ createdAt: -1 }).lean(),
        HealthCheckupLead.find().sort({ createdAt: -1 }).lean(),
        LeadMagnetLead.find().sort({ createdAt: -1 }).lean(),
        CareerApplication.find().sort({ createdAt: -1 }).lean(),
        ServiceContent.countDocuments(),
        PortfolioContent.countDocuments(),
        BlogContent.countDocuments(),
        CareerContent.countDocuments(),
        AIBlueprintLog.find().sort({ createdAt: -1 }).limit(10).lean()
      ]);

      return res.json({
        success: true,
        source: "mongodb",
        metrics: {
          totalEnquiries: contacts.length,
          consultationRequests: consultations.length,
          healthCheckupLeads: healthCheckups.length,
          leadMagnetLeads: leadMagnets.length,
          jobApplications: applications.length,
          servicesCount,
          portfolioCount,
          blogsCount,
          careersCount,
          aiBlueprintsCount: aiBlueprints.length
        },
        data: {
          contacts,
          consultations,
          healthCheckups,
          leadMagnets,
          applications,
          aiBlueprints
        }
      });
    }

    res.json({
      success: true,
      source: "memory-fallback",
      metrics: {
        totalEnquiries: memoryStore.contacts.length,
        consultationRequests: memoryStore.consultations.length,
        healthCheckupLeads: memoryStore.healthCheckups.length,
        leadMagnetLeads: memoryStore.leadMagnets.length,
        jobApplications: memoryStore.applications.length,
        servicesCount: memoryStore.services.length,
        portfolioCount: memoryStore.portfolio.length,
        blogsCount: memoryStore.blogs.length,
        careersCount: memoryStore.careers.length,
        aiBlueprintsCount: memoryStore.aiBlueprints.length
      },
      data: memoryStore
    });
  } catch (err) {
    next(err);
  }
});

export default router;
