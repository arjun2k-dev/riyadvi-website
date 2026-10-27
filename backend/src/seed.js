import dns from "node:dns";

// Fix querySrv ECONNREFUSED on local ISPs / routers by resolving via Google DNS
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {
  // fallback
}
import mongoose from "mongoose";
import dotenv from "dotenv";
import {
  ContactEnquiry,
  ConsultationRequest,
  HealthCheckupLead,
  LeadMagnetLead,
  CareerApplication
} from "./models/schemas.js";

dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/riyadvi_db";

const INITIAL_CONTACTS = [
  {
    name: "Arjun Mehta",
    email: "arjun@puratap-india.com",
    phone: "+91 98401 22310",
    company: "Puratap Water Systems",
    requirement: "Web Development & 3D Product Configurator",
    message: "Looking to scale our subscription filter portal with interactive 3D visuals.",
    status: "In Review"
  },
  {
    name: "Dr. Kavitha Nair",
    email: "dr.kavitha@nugenicabiotech.com",
    phone: "+91 98410 88920",
    company: "Nugenica Biotech Lab",
    requirement: "Custom Clinician Portal & API Integration",
    message: "Need a secure diagnostic assay portal integrated with our laboratory LIMS.",
    status: "New"
  },
  {
    name: "Rajesh Kannan",
    email: "rajesh@tonyandguychennai.com",
    phone: "+91 98841 00291",
    company: "Tony & Guy Chennai",
    requirement: "App Development",
    message: "Interested in developing an omnichannel client loyalty and stylist appointment booking app.",
    status: "Contacted"
  }
];

const INITIAL_CONSULTATIONS = [
  {
    name: "Vikramaditya Rao",
    email: "vikram@pearlhousing.in",
    phone: "+91 98840 55112",
    company: "Pearl Housing",
    serviceInterest: "AR / VR Solutions",
    preferredDate: "2026-10-28",
    notes: "Explore browser-based 3D virtual floorplans and real-time apartment tour engine.",
    status: "Scheduled"
  },
  {
    name: "Meera Krishnan",
    email: "meera@cubeaestheticdental.com",
    phone: "+91 97901 33419",
    company: "Cube Dental",
    serviceInterest: "3D Modeling",
    preferredDate: "2026-10-30",
    notes: "Interactive 3D dental implant simulation for patient education.",
    status: "New"
  }
];

const INITIAL_HEALTH_CHECKUPS = [
  {
    businessName: "Wanaromah Perfumers",
    industry: "Luxury Retail & D2C",
    companySize: "10–50 Employees",
    websiteUrl: "https://www.wanaromah.com",
    websiteExperience: "Static Brochure Site (Low Conversion)",
    mobileSpeed: "Average",
    marketingChannels: "SEO + Paid Ads (Google / Meta)",
    monthlyLeadFlow: "Moderate but Low Qualification",
    currentTechStack: "Legacy / Mixed CMS",
    automationLevel: "Spreadsheets + Basic Email",
    primaryChallenge: "Want Interactive 3D / AR-VR Product Showcase",
    timeline: "Within 30 Days",
    contactName: "Aarav Sharma",
    email: "founder@wanaromah.com",
    phone: "+91 97909 44120",
    score: 84,
    status: "Report Sent"
  },
  {
    businessName: "Sivam Physio Care",
    industry: "Healthcare / Biotech / Dental",
    companySize: "1–10 Employees",
    websiteUrl: "https://www.sivamphysio.in",
    websiteExperience: "Outdated / Needs Revamp",
    mobileSpeed: "Slow / Breaks on Mobile",
    marketingChannels: "Referrals & Organic Only",
    monthlyLeadFlow: "Inconsistent",
    currentTechStack: "WordPress / Shopify Template",
    automationLevel: "Mostly Manual Workflows",
    primaryChallenge: "Low Website Conversion & Brand Positioning",
    timeline: "Immediate (Within 2 Weeks)",
    contactName: "Dr. Sivamani",
    email: "care@sivamphysio.in",
    phone: "+91 94440 12890",
    score: 72,
    status: "New"
  }
];

const INITIAL_LEAD_MAGNETS = [
  {
    name: "Sanjay Subramanian",
    company: "VisDoc HealthTech",
    email: "sanjay@visdoc.in",
    phone: "+91 98409 77321",
    downloadedGuide: "Software Project Planning Guide",
    status: "Downloaded"
  },
  {
    name: "Ananya Deshmukh",
    company: "Studio11 Franchise Group",
    email: "ananya@studio11wellness.com",
    phone: "+91 99620 44510",
    downloadedGuide: "Software Project Planning Guide",
    status: "Follow-Up Sent"
  }
];

const INITIAL_APPLICATIONS = [
  {
    name: "Priya Darshini",
    email: "priya.webgl@devmail.com",
    phone: "+91 95001 33412",
    position: "Senior Full-Stack Developer (React.js / Node.js / 3D Web)",
    jobSlug: "senior-full-stack-developer-react-node",
    resume: "https://github.com/priya-fullstack-3d",
    message: "4+ years building React Three Fiber, WebGL shaders, and high-concurrency Node.js APIs.",
    status: "Shortlisted"
  },
  {
    name: "Karthik Raja",
    email: "karthik.creative@designerhub.io",
    phone: "+91 98403 99120",
    position: "3D & WebGL Creative Developer (Three.js / R3F / Blender)",
    jobSlug: "3d-webgl-creative-developer",
    resume: "https://behance.net/karthik-3d-creative",
    message: "Specialized in Blender PBR pipelines and real-time WebGL asset compression.",
    status: "In Review"
  }
];

async function seedDatabase() {
  console.log("Connecting to MongoDB:", MONGODB_URI.replace(/:([^:@]{3,})@/, ":***@"));
  await mongoose.connect(MONGODB_URI);
  console.log("Connected successfully. Seeding initial collections...");

  await ContactEnquiry.deleteMany({});
  await ConsultationRequest.deleteMany({});
  await HealthCheckupLead.deleteMany({});
  await LeadMagnetLead.deleteMany({});
  await CareerApplication.deleteMany({});

  await ContactEnquiry.insertMany(INITIAL_CONTACTS);
  await ConsultationRequest.insertMany(INITIAL_CONSULTATIONS);
  await HealthCheckupLead.insertMany(INITIAL_HEALTH_CHECKUPS);
  await LeadMagnetLead.insertMany(INITIAL_LEAD_MAGNETS);
  await CareerApplication.insertMany(INITIAL_APPLICATIONS);

  console.log("Seeding complete! Initialized:");
  console.log(` - ${INITIAL_CONTACTS.length} Contact Enquiries`);
  console.log(` - ${INITIAL_CONSULTATIONS.length} Consultation Requests`);
  console.log(` - ${INITIAL_HEALTH_CHECKUPS.length} Health Checkup Leads`);
  console.log(` - ${INITIAL_LEAD_MAGNETS.length} Lead Magnet Leads`);
  console.log(` - ${INITIAL_APPLICATIONS.length} Career Applications`);

  await mongoose.disconnect();
  console.log("Disconnected cleanly.");
}

seedDatabase().catch((err) => {
  console.error("Seeding error:", err);
  process.exit(1);
});
