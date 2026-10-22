import { apiClient } from "../api/client";

const STORAGE_KEY = "riyadvi_leads_store_v1";

const DEFAULT_STORE = {
  contacts: [
    {
      id: "enq-101",
      name: "Arjun Mehta",
      email: "arjun@puratap-india.com",
      phone: "+91 98401 22310",
      company: "Puratap Water Systems",
      requirement: "Web Development & 3D Product Configurator",
      message: "Looking to scale our subscription filter portal with interactive 3D visuals.",
      date: "2026-10-19",
      status: "In Review"
    },
    {
      id: "enq-102",
      name: "Dr. Kavitha Nair",
      email: "dr.kavitha@nugenicabiotech.com",
      phone: "+91 98410 88920",
      company: "Nugenica Biotech Lab",
      requirement: "Custom Clinician Portal & API Integration",
      message: "Need a secure diagnostic assay portal integrated with our laboratory LIMS.",
      date: "2026-10-21",
      status: "New"
    }
  ],
  consultations: [
    {
      id: "con-201",
      name: "Vikramaditya Rao",
      email: "vikram@pearlhousing.in",
      phone: "+91 98840 55112",
      company: "Pearl Housing",
      serviceInterest: "AR / VR Solutions",
      preferredDate: "2026-10-28",
      date: "2026-10-21",
      status: "Scheduled"
    }
  ],
  healthCheckups: [
    {
      id: "hc-301",
      businessName: "Wanaromah Perfumers",
      industry: "Luxury Retail & D2C",
      email: "founder@wanaromah.com",
      phone: "+91 97909 44120",
      score: 84,
      challenge: "Scaling 3D bottle customization & international D2C ROAS",
      date: "2026-10-20",
      status: "Report Sent"
    }
  ],
  leadMagnets: [
    {
      id: "lm-401",
      name: "Sanjay Subramanian",
      company: "VisDoc HealthTech",
      email: "sanjay@visdoc.in",
      phone: "+91 98409 77321",
      date: "2026-10-21",
      status: "Downloaded"
    }
  ],
  applications: [
    {
      id: "app-501",
      name: "Priya Darshini",
      email: "priya.webgl@devmail.com",
      phone: "+91 95001 33412",
      position: "Senior Full-Stack Developer (React.js / Node.js / 3D Web)",
      resume: "https://github.com/priya-fullstack-3d",
      message: "4 years building React Three Fiber & MERN stack platforms.",
      date: "2026-10-22",
      status: "Shortlisted"
    }
  ]
};

export function getLocalLeads() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_STORE));
      return DEFAULT_STORE;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_STORE;
  }
}

export async function submitLeadWithFallback(endpoint, categoryKey, payload) {
  const entry = {
    id: `${categoryKey}-${Date.now()}`,
    ...payload,
    date: new Date().toISOString().split("T")[0],
    status: "New"
  };

  // Persist locally so Admin Dashboard reflects new submissions immediately
  try {
    const store = getLocalLeads();
    store[categoryKey] = [entry, ...(store[categoryKey] || [])];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // ignore storage quota errors
  }

  // Send to Node.js + Express backend API
  try {
    const response = await apiClient.post(endpoint, payload);
    return { success: true, data: response?.data || entry, source: "api" };
  } catch {
    return { success: true, data: entry, source: "local-fallback" };
  }
}
