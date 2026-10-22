import React, { useState } from "react";
import { BookOpen, CheckCircle2, Download, Sparkles, ShieldCheck } from "lucide-react";
import { submitLeadWithFallback } from "../utils/leadStorage";

/**
 * 17. LEAD MAGNET (/software-project-planning-guide)
 * Title: "Download Software Project Planning Guide"
 * Collects: Name, Company, Email, Phone
 * Validates form, sends data to backend, stores lead, and provides download confirmation.
 */
export default function LeadMagnetGuide() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: ""
  });
  const [error, setError] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.company.trim() || !form.email.includes("@") || form.phone.trim().length < 7) {
      setError("Please fill in your Name, Company, valid Email, and Phone number.");
      return;
    }
    setError("");
    setStatus("submitting");

    await submitLeadWithFallback("/lead-magnet", "leadMagnets", form);
    setStatus("success");
  };

  const handleDownloadBlueprint = () => {
    const content = `RIYADVI SOFTWARE TECHNOLOGIES — SOFTWARE PROJECT PLANNING GUIDE (2026 EDITION)
================================================================================
Prepared for: ${form.name} (${form.company})

1. EXECUTIVE SCOPE & BUSINESS OBJECTIVES
   - Primary KPI targets & conversion goals
   - User personas & core problem statements

2. ARCHITECTURE & TECHNOLOGY STACK CHECKLIST
   - Frontend: React.js / Next.js + TailwindCSS + 3D WebGL (Three.js / R3F)
   - Backend: Node.js + Express REST API with validation middleware
   - Database: MongoDB / PostgreSQL schema modeling

3. 3D & INTERACTIVE EXPERIENCE BUDGET
   - Desktop WebGL scenes vs. Mobile GPU fallback strategy
   - Scroll-triggered storytelling milestones (GSAP + Lenis)

4. TIMELINE & MILESTONE DELIVERABLES
   - Phase 1: Discovery & UI/UX Prototyping
   - Phase 2: Core Full-Stack & 3D Sprints
   - Phase 3: QA, Lighthouse 90+ Optimization & Cloud Launch
`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Riyadvi-Software-Project-Planning-Guide.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Guide Overview */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-gold text-brand-goldLight text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>Executive Resource • Free Instant Access</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Download Software Project{" "}
            <span className="text-gold-gradient">Planning Guide</span>
          </h1>
          <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
            Planning a custom web platform, mobile app, or 3D digital experience? Use Riyadvi&apos;s internal engineering blueprint to scope features, avoid budget overruns, and select the right architecture.
          </p>

          <div className="space-y-3 pt-2">
            {[
              "Complete RFP & Feature Prioritization Matrix",
              "Frontend, 3D WebGL & Backend Stack Comparison",
              "Database Schema & API Security Checklist",
              "Realistic Sprint Estimation & Cloud Deployment Guide"
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-zinc-200">
                <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Capture Card */}
        <div className="lg:col-span-6">
          <div className="glass-panel metallic-border rounded-3xl p-8 md:p-10 shadow-gold-md">
            {status === "success" ? (
              <div className="text-center py-6 space-y-5">
                <CheckCircle2 className="w-16 h-16 text-brand-gold mx-auto" />
                <h2 className="text-2xl font-bold text-white">
                  Access Confirmed for {form.company}!
                </h2>
                <p className="text-sm text-zinc-300">
                  Your lead has been recorded in our database. Click below to download your copy of the <strong>Software Project Planning Guide</strong> immediately.
                </p>
                <button
                  type="button"
                  onClick={handleDownloadBlueprint}
                  className="w-full py-4 rounded-full bg-gold-gradient text-black font-bold text-sm shadow-gold-sm flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Planning Guide Now</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center gap-2 text-brand-gold text-xs uppercase tracking-widest font-semibold">
                  <BookOpen className="w-4 h-4" />
                  <span>Instant Guide Unlock</span>
                </div>
                <h2 className="text-2xl font-bold text-white">
                  Download Software Project Planning Guide
                </h2>

                {error && (
                  <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/30 p-3 rounded-xl">
                    {error}
                  </p>
                )}

                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:border-brand-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Company *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your company name"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:border-brand-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Work Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:border-brand-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:border-brand-gold focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full py-4 rounded-full bg-gold-gradient text-black font-bold text-sm shadow-gold-md hover:scale-[1.01] transition-transform flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>
                    {status === "submitting" ? "Validating..." : "Unlock & Download Guide"}
                  </span>
                </button>

                <p className="text-[11px] text-zinc-500 flex items-center justify-center gap-1.5 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
                  <span>100% Confidential • Stored securely in Riyadvi CRM</span>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
