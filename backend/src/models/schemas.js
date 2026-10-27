import mongoose from "mongoose";

// 1. Lead & Conversion Schemas
const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    company: { type: String, trim: true, default: "" },
    requirement: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["New", "In Review", "Contacted", "Closed"],
      default: "New"
    }
  },
  { timestamps: true }
);

const consultationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    company: { type: String, trim: true, default: "" },
    serviceInterest: { type: String, default: "Web Development" },
    preferredDate: { type: String, default: "" },
    notes: { type: String, default: "" },
    status: {
      type: String,
      enum: ["New", "Scheduled", "Completed"],
      default: "New"
    }
  },
  { timestamps: true }
);

const healthCheckupSchema = new mongoose.Schema(
  {
    businessName: { type: String, required: true, trim: true },
    industry: { type: String, default: "" },
    companySize: { type: String, default: "" },
    websiteUrl: { type: String, default: "" },
    websiteExperience: { type: String, default: "" },
    mobileSpeed: { type: String, default: "" },
    marketingChannels: { type: String, default: "" },
    monthlyLeadFlow: { type: String, default: "" },
    currentTechStack: { type: String, default: "" },
    automationLevel: { type: String, default: "" },
    primaryChallenge: { type: String, default: "" },
    timeline: { type: String, default: "" },
    contactName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    score: { type: Number, default: 75 },
    status: {
      type: String,
      enum: ["New", "Report Sent", "In Consultation"],
      default: "New"
    }
  },
  { timestamps: true }
);

const leadMagnetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    downloadedGuide: {
      type: String,
      default: "Software Project Planning Guide"
    },
    status: {
      type: String,
      enum: ["Downloaded", "Follow-Up Sent"],
      default: "Downloaded"
    }
  },
  { timestamps: true }
);

const careerApplicationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    position: { type: String, required: true, trim: true },
    jobSlug: { type: String, default: "" },
    resume: { type: String, required: true, trim: true },
    message: { type: String, default: "" },
    status: {
      type: String,
      enum: ["New", "In Review", "Shortlisted", "Archived"],
      default: "New"
    }
  },
  { timestamps: true }
);

// 2. Dynamic Content Architecture Schemas (Services, Portfolio, Blog, Careers)
const serviceContentSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    shortTitle: { type: String, default: "" },
    tagline: { type: String, required: true },
    visualType: { type: String, default: "Interactive 3D Visualizer" },
    heroDescription: { type: String, required: true },
    problem: { type: String, required: true },
    solution: { type: String, required: true },
    keyFeatures: [{ type: String }],
    industryUseCases: [
      {
        industry: { type: String },
        useCase: { type: String }
      }
    ],
    techStack: [{ type: String }],
    process: [
      {
        step: { type: String },
        title: { type: String },
        desc: { type: String }
      }
    ],
    metrics: [
      {
        value: { type: String },
        label: { type: String }
      }
    ],
    relatedPortfolio: [{ type: String }]
  },
  { timestamps: true }
);

const portfolioContentSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    client: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    industry: { type: String, required: true },
    summary: { type: String, required: true },
    challenge: { type: String, required: true },
    solution: { type: String, required: true },
    technologies: [{ type: String }],
    results: [
      {
        metric: { type: String },
        label: { type: String }
      }
    ],
    visuals: [{ type: String }],
    relatedServices: [{ type: String }],
    has3DShowcase: { type: Boolean, default: true },
    accentColor: { type: String, default: "#D4AF37" }
  },
  { timestamps: true }
);

const blogContentSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    excerpt: { type: String, required: true },
    category: { type: String, required: true },
    tags: [{ type: String }],
    author: { type: String, default: "Riyadvi Architecture Team" },
    authorRole: { type: String, default: "Principal Systems Architects" },
    publishedAt: { type: String, default: () => new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) },
    readTime: { type: String, default: "5 min read" },
    featured: { type: Boolean, default: false },
    content: [{ type: String }]
  },
  { timestamps: true }
);

const careerContentSchema = new mongoose.Schema(
  {
    jobSlug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    department: { type: String, required: true },
    designation: { type: String, required: true },
    experience: { type: String, required: true },
    location: { type: String, default: "Chennai / Hybrid" },
    type: { type: String, default: "Full-Time" },
    summary: { type: String, required: true },
    responsibilities: [{ type: String }],
    requirements: [{ type: String }]
  },
  { timestamps: true }
);

const aiBlueprintSchema = new mongoose.Schema(
  {
    prompt: { type: String, required: true },
    industry: { type: String, default: "Enterprise Digital" },
    recommendedStack: [{ type: String }],
    estimatedWeeks: { type: String },
    architectureSummary: { type: String }
  },
  { timestamps: true }
);

export const ContactEnquiry = mongoose.model("ContactEnquiry", contactSchema);
export const ConsultationRequest = mongoose.model("ConsultationRequest", consultationSchema);
export const HealthCheckupLead = mongoose.model("HealthCheckupLead", healthCheckupSchema);
export const LeadMagnetLead = mongoose.model("LeadMagnetLead", leadMagnetSchema);
export const CareerApplication = mongoose.model("CareerApplication", careerApplicationSchema);

export const ServiceContent = mongoose.model("ServiceContent", serviceContentSchema);
export const PortfolioContent = mongoose.model("PortfolioContent", portfolioContentSchema);
export const BlogContent = mongoose.model("BlogContent", blogContentSchema);
export const CareerContent = mongoose.model("CareerContent", careerContentSchema);
export const AIBlueprintLog = mongoose.model("AIBlueprintLog", aiBlueprintSchema);
