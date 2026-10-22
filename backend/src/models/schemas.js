import mongoose from "mongoose";

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

export const ContactEnquiry = mongoose.model("ContactEnquiry", contactSchema);
export const ConsultationRequest = mongoose.model("ConsultationRequest", consultationSchema);
export const HealthCheckupLead = mongoose.model("HealthCheckupLead", healthCheckupSchema);
export const LeadMagnetLead = mongoose.model("LeadMagnetLead", leadMagnetSchema);
export const CareerApplication = mongoose.model("CareerApplication", careerApplicationSchema);
