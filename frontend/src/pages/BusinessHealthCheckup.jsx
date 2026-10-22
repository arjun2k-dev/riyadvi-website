import React, { useState } from "react";
import { CheckCircle2, ArrowRight, ArrowLeft, Sparkles, Activity } from "lucide-react";
import { submitLeadWithFallback } from "../utils/leadStorage";

const STEPS = [
  { id: 1, title: "Business Information" },
  { id: 2, title: "Website & Digital Presence" },
  { id: 3, title: "Marketing & Acquisition" },
  { id: 4, title: "Technology Stack" },
  { id: 5, title: "Business Challenges" },
  { id: 6, title: "Submission & Score" }
];

/**
 * 16. BUSINESS HEALTH CHECKUP (/business-health-checkup)
 * Headline: "Is Your Business Ready for Its Next Digital Growth Stage?"
 * Interactive 6-step form sending submitted information to backend & database.
 */
export default function BusinessHealthCheckup() {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState("idle");
  const [scoreResult, setScoreResult] = useState(null);

  const [formData, setFormData] = useState({
    businessName: "",
    industry: "SaaS / Technology",
    companySize: "10–50 Employees",
    websiteUrl: "",
    websiteExperience: "Outdated / Needs Revamp",
    mobileSpeed: "Average",
    marketingChannels: "Referrals & Organic Only",
    monthlyLeadFlow: "Inconsistent",
    currentTechStack: "Legacy / Mixed CMS",
    automationLevel: "Mostly Manual Workflows",
    primaryChallenge: "Low Website Conversion & Brand Positioning",
    timeline: "Within 30 Days",
    contactName: "",
    email: "",
    phone: ""
  });

  const calculateReadinessScore = () => {
    let base = 62;
    if (formData.websiteExperience.includes("Modern")) base += 12;
    if (formData.marketingChannels.includes("Multi-Channel")) base += 10;
    if (formData.automationLevel.includes("Automated")) base += 10;
    return Math.min(94, base);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    const calculatedScore = calculateReadinessScore();

    await submitLeadWithFallback("/health-checkup", "healthCheckups", {
      ...formData,
      score: calculatedScore,
      challenge: formData.primaryChallenge
    });

    setScoreResult(calculatedScore);
    setStatus("success");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-gold text-brand-goldLight text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
          <span>Interactive 6-Step Digital Diagnostic</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
          Is Your Business Ready for Its Next{" "}
          <span className="text-gold-gradient">Digital Growth Stage?</span>
        </h1>
        <p className="text-zinc-400 text-sm md:text-base max-w-2xl mx-auto">
          Benchmark your digital presence, marketing funnel, and software architecture to unlock a tailored Riyadvi transformation roadmap.
        </p>
      </div>

      {/* Step Progress Bar */}
      <div className="glass-panel rounded-2xl p-4 border border-zinc-800">
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
          {STEPS.map((s) => {
            const active = s.id === step;
            const done = s.id < step || status === "success";
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => status !== "success" && setStep(s.id)}
                className={`p-2.5 rounded-xl text-left transition-all border ${
                  active
                    ? "bg-brand-gold/15 border-brand-gold text-white"
                    : done
                    ? "bg-zinc-900/90 border-brand-gold/30 text-brand-goldLight"
                    : "bg-zinc-950 border-zinc-900 text-zinc-500"
                }`}
              >
                <span className="text-[10px] font-mono block">STEP 0{s.id}</span>
                <span className="text-xs font-semibold line-clamp-1 mt-0.5">{s.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Form Container */}
      <div className="glass-panel metallic-border rounded-3xl p-8 md:p-10 shadow-gold-sm">
        {status === "success" ? (
          <div className="text-center py-8 space-y-6">
            <div className="w-24 h-24 rounded-full bg-gold-gradient mx-auto flex flex-col items-center justify-center text-black shadow-gold-md">
              <Activity className="w-6 h-6" />
              <span className="text-2xl font-extrabold">{scoreResult}/100</span>
            </div>
            <h2 className="text-3xl font-bold text-white">
              Diagnostic Complete for {formData.businessName}
            </h2>
            <p className="text-sm text-zinc-300 max-w-xl mx-auto leading-relaxed">
              Your Business Health Checkup has been saved to our database. Based on your primary challenge (<strong>{formData.primaryChallenge}</strong>), our solutions architect has prepared a custom 90-day digital growth blueprint.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => {
                  setStatus("idle");
                  setStep(1);
                }}
                className="px-6 py-3 rounded-full bg-gold-gradient text-black font-bold text-xs"
              >
                Run Another Diagnostic
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Step 1: Business Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1.5">Company / Business Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Acme Global Technologies"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:border-brand-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1.5">Industry Sector</label>
                    <select
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:border-brand-gold focus:outline-none"
                    >
                      <option>SaaS / Technology</option>
                      <option>Healthcare / Biotech / Dental</option>
                      <option>Real Estate & Construction</option>
                      <option>Retail / D2C / E-Commerce</option>
                      <option>Beauty, Salon & Wellness</option>
                      <option>Manufacturing & CleanTech</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1.5">Team Size</label>
                  <select
                    value={formData.companySize}
                    onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:border-brand-gold focus:outline-none"
                  >
                    <option>1–10 Employees</option>
                    <option>10–50 Employees</option>
                    <option>50–250 Employees</option>
                    <option>250+ Enterprise</option>
                  </select>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Step 2: Website & Digital Presence</h2>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1.5">Current Website URL (if any)</label>
                  <input
                    type="text"
                    placeholder="https://www.yourcompany.com"
                    value={formData.websiteUrl}
                    onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:border-brand-gold focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1.5">How would you rate your current website?</label>
                    <select
                      value={formData.websiteExperience}
                      onChange={(e) => setFormData({ ...formData, websiteExperience: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:border-brand-gold focus:outline-none"
                    >
                      <option>Outdated / Needs Revamp</option>
                      <option>Static Brochure Site (Low Conversion)</option>
                      <option>Modern & Interactive</option>
                      <option>No Website Yet</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1.5">Mobile Responsiveness & Speed</label>
                    <select
                      value={formData.mobileSpeed}
                      onChange={(e) => setFormData({ ...formData, mobileSpeed: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:border-brand-gold focus:outline-none"
                    >
                      <option>Slow / Breaks on Mobile</option>
                      <option>Average</option>
                      <option>Fast & Optimized</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Step 3: Marketing & Lead Generation</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1.5">Active Acquisition Channels</label>
                    <select
                      value={formData.marketingChannels}
                      onChange={(e) => setFormData({ ...formData, marketingChannels: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:border-brand-gold focus:outline-none"
                    >
                      <option>Referrals & Organic Only</option>
                      <option>Basic Social Media</option>
                      <option>SEO + Paid Ads (Google / Meta)</option>
                      <option>Multi-Channel + Automated Funnels</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1.5">Monthly Digital Lead Predictability</label>
                    <select
                      value={formData.monthlyLeadFlow}
                      onChange={(e) => setFormData({ ...formData, monthlyLeadFlow: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:border-brand-gold focus:outline-none"
                    >
                      <option>Inconsistent</option>
                      <option>Moderate but Low Qualification</option>
                      <option>Consistent & High-Intent</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Step 4: Technology & Systems</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1.5">Current Software / CMS Architecture</label>
                    <select
                      value={formData.currentTechStack}
                      onChange={(e) => setFormData({ ...formData, currentTechStack: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:border-brand-gold focus:outline-none"
                    >
                      <option>Legacy / Mixed CMS</option>
                      <option>WordPress / Shopify Template</option>
                      <option>Custom React / Node.js / Cloud Stack</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1.5">CRM & Workflow Automation</label>
                    <select
                      value={formData.automationLevel}
                      onChange={(e) => setFormData({ ...formData, automationLevel: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:border-brand-gold focus:outline-none"
                    >
                      <option>Mostly Manual Workflows</option>
                      <option>Spreadsheets + Basic Email</option>
                      <option>Automated CRM & API Pipelines</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Step 5: Primary Business Challenges</h2>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1.5">Biggest Bottleneck Holding Back Growth</label>
                  <select
                    value={formData.primaryChallenge}
                    onChange={(e) => setFormData({ ...formData, primaryChallenge: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:border-brand-gold focus:outline-none"
                  >
                    <option>Low Website Conversion & Brand Positioning</option>
                    <option>Need Custom Web / Mobile App Development</option>
                    <option>Want Interactive 3D / AR-VR Product Showcase</option>
                    <option>Scaling SEO & Paid Lead Generation ROAS</option>
                    <option>Legacy System Modernization & AI Integration</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1.5">Target Implementation Timeline</label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:border-brand-gold focus:outline-none"
                  >
                    <option>Immediate (Within 2 Weeks)</option>
                    <option>Within 30 Days</option>
                    <option>This Quarter</option>
                  </select>
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Step 6: Receive Your Diagnostic Report</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name *"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:border-brand-gold focus:outline-none"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Work Email *"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:border-brand-gold focus:outline-none"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone / WhatsApp *"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:border-brand-gold focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="pt-6 border-t border-zinc-800 flex items-center justify-between">
              <button
                type="button"
                disabled={step === 1}
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                className="px-5 py-2.5 rounded-full border border-zinc-700 text-zinc-300 text-xs font-semibold disabled:opacity-40 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous Step</span>
              </button>

              {step < 6 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.min(6, s + 1))}
                  className="px-6 py-3 rounded-full bg-gold-gradient text-black font-bold text-xs shadow-gold-sm flex items-center gap-1.5"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="px-8 py-3.5 rounded-full bg-gold-gradient text-black font-bold text-sm shadow-gold-md flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{status === "submitting" ? "Calculating Score..." : "Submit Business Health Checkup"}</span>
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
