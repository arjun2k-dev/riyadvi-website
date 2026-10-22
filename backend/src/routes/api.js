import express from "express";
import mongoose from "mongoose";
import {
  ContactEnquiry,
  ConsultationRequest,
  HealthCheckupLead,
  LeadMagnetLead,
  CareerApplication
} from "../models/schemas.js";
import { validateFields } from "../middleware/validate.js";

const router = express.Router();

// Hybrid store: Uses MongoDB when connected, or in-memory array fallback when running locally without MongoDB
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
  ]
};

const isMongoConnected = () => mongoose.connection.readyState === 1;

async function createRecord(Model, memKey, payload) {
  if (isMongoConnected()) {
    const doc = await Model.create(payload);
    return doc;
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

// 1. POST /api/contact
router.post(
  "/contact",
  validateFields(["name", "email", "phone", "requirement", "message"]),
  async (req, res, next) => {
    try {
      const data = await createRecord(ContactEnquiry, "contacts", req.body);
      res.status(201).json({
        success: true,
        message: "Contact enquiry submitted successfully.",
        data
      });
    } catch (err) {
      next(err);
    }
  }
);

// 2. POST /api/consultation
router.post(
  "/consultation",
  validateFields(["name", "email", "phone"]),
  async (req, res, next) => {
    try {
      const data = await createRecord(ConsultationRequest, "consultations", req.body);
      res.status(201).json({
        success: true,
        message: "Consultation request registered successfully.",
        data
      });
    } catch (err) {
      next(err);
    }
  }
);

// 3. POST /api/health-checkup
router.post(
  "/health-checkup",
  validateFields(["businessName", "contactName", "email", "phone"]),
  async (req, res, next) => {
    try {
      const data = await createRecord(HealthCheckupLead, "healthCheckups", req.body);
      res.status(201).json({
        success: true,
        message: "Business Health Checkup diagnostic saved.",
        data
      });
    } catch (err) {
      next(err);
    }
  }
);

// 4. POST /api/lead-magnet
router.post(
  "/lead-magnet",
  validateFields(["name", "company", "email", "phone"]),
  async (req, res, next) => {
    try {
      const data = await createRecord(
        LeadMagnetLead,
        "leadMagnets",
        { ...req.body, status: "Downloaded" }
      );
      res.status(201).json({
        success: true,
        message: "Lead magnet access granted.",
        data
      });
    } catch (err) {
      next(err);
    }
  }
);

// 5. POST /api/applications
router.post(
  "/applications",
  validateFields(["name", "email", "phone", "position", "resume"]),
  async (req, res, next) => {
    try {
      const data = await createRecord(CareerApplication, "applications", req.body);
      res.status(201).json({
        success: true,
        message: "Job application submitted successfully.",
        data
      });
    } catch (err) {
      next(err);
    }
  }
);

// 6. GET /api/admin/dashboard
router.get("/admin/dashboard", async (req, res, next) => {
  try {
    if (isMongoConnected()) {
      const [contacts, consultations, healthCheckups, leadMagnets, applications] =
        await Promise.all([
          ContactEnquiry.find().sort({ createdAt: -1 }).lean(),
          ConsultationRequest.find().sort({ createdAt: -1 }).lean(),
          HealthCheckupLead.find().sort({ createdAt: -1 }).lean(),
          LeadMagnetLead.find().sort({ createdAt: -1 }).lean(),
          CareerApplication.find().sort({ createdAt: -1 }).lean()
        ]);

      return res.json({
        success: true,
        source: "mongodb",
        metrics: {
          totalEnquiries: contacts.length,
          consultationRequests: consultations.length,
          healthCheckupLeads: healthCheckups.length,
          leadMagnetLeads: leadMagnets.length,
          jobApplications: applications.length
        },
        data: { contacts, consultations, healthCheckups, leadMagnets, applications }
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
        jobApplications: memoryStore.applications.length
      },
      data: memoryStore
    });
  } catch (err) {
    next(err);
  }
});

export default router;
