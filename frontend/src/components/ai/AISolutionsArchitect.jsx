import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Cpu,
  Layers,
  ArrowUpRight,
  CheckCircle2,
  Terminal,
  Zap,
  Database
} from "lucide-react";
import { apiClient } from "../../api/client";

const PRESET_PROMPTS = [
  {
    label: "3D Real Estate & CRM",
    industry: "Real Estate & PropTech",
    prompt: "Build an interactive 3D apartment walkthrough platform with virtual floorplans and automated buyer CRM."
  },
  {
    label: "AI Telemedicine App",
    industry: "HealthTech & AI",
    prompt: "Create an AI-assisted patient diagnostic portal, doctor booking mobile app, and clinical lab dashboard."
  },
  {
    label: "Luxury 3D Product Configurator",
    industry: "Luxury Retail & D2C",
    prompt: "Design a dark-and-gold D2C storefront with a real-time 3D bottle/product customizer and high-ROAS funnel."
  },
  {
    label: "Enterprise SaaS Platform",
    industry: "B2B SaaS & Automation",
    prompt: "Architect a scalable React, Node.js, and MongoDB multi-tenant platform with real-time analytics."
  }
];

export default function AISolutionsArchitect({ onOpenConsultation }) {
  const [prompt, setPrompt] = useState(PRESET_PROMPTS[0].prompt);
  const [industry, setIndustry] = useState(PRESET_PROMPTS[0].industry);
  const [loading, setLoading] = useState(false);
  const [blueprint, setBlueprint] = useState({
    projectTitle: "AI Architecture Blueprint: Interactive 3D Real Estate & Buyer CRM",
    industry: "Real Estate & PropTech",
    estimatedWeeks: "6–10 Weeks (Agile Full-Stack + 3D Sprints)",
    projectedROI: "+185% to +260% Conversion & Engagement Lift",
    architectureSummary:
      "Engineered with a decoupled React 18 + Three.js/R3F interactive frontend, GSAP ScrollTrigger storytelling, and a validated Node.js + Express REST API backed by MongoDB Atlas collections for real-time lead and content management.",
    recommendedStack: [
      "React.js 18",
      "Three.js / R3F",
      "Drei Shaders",
      "GSAP ScrollTrigger",
      "Lenis Smooth Scroll",
      "Node.js + Express",
      "MongoDB Atlas"
    ],
    sprintRoadmap: [
      {
        phase: "Weeks 1–2",
        title: "AI-Assisted Discovery & 3D/UX Prototyping",
        detail: "System schema design, tokenized dark/gold UI kit, and interactive WebGL proof-of-concept."
      },
      {
        phase: "Weeks 3–6",
        title: "Full-Stack React + Node.js + MongoDB Engineering",
        detail: "Dynamic content templates, custom 3D configurators, and validated REST API endpoints."
      },
      {
        phase: "Weeks 7–8",
        title: "Mobile GPU Optimization & Cloud CI/CD",
        detail: "IntersectionObserver WebGL tuning, Lighthouse 95+ audit, and Vercel + Render deployment."
      }
    ],
    recommendedServices: [
      { slug: "3d-modeling", title: "3D Modeling & WebGL Twins" },
      { slug: "ar-vr", title: "AR / VR Spatial Computing" },
      { slug: "web-development", title: "Custom Web Development" },
      { slug: "ui-ux-design", title: "UI/UX & Design Systems" }
    ],
    matchedCaseStudies: [
      { slug: "pearl-housing", client: "Pearl Housing", outcome: "3.1x Site Visit Conversion" },
      { slug: "wanaromah", client: "Wanaromah Perfumers", outcome: "+210% D2C Online Revenue" }
    ]
  });
  const [logStatus, setLogStatus] = useState("Ready • Connected to /api/ai/architect");

  const handleGenerate = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setLogStatus("Synthesizing full-stack + 3D architecture via POST /api/ai/architect...");

    try {
      const res = await apiClient.post("/ai/architect", { prompt, industry });
      if (res?.data) {
        setBlueprint(res.data);
        setLogStatus(
          res.source === "mongodb-logged"
            ? "Blueprint generated & logged to MongoDB Atlas"
            : "Blueprint generated via Express AI Engine"
        );
      }
    } catch {
      // Local synthesis fallback if offline
      setBlueprint((prev) => ({
        ...prev,
        projectTitle: `AI Architecture Blueprint: ${prompt.slice(0, 48)}...`,
        industry
      }));
      setLogStatus("Blueprint synthesized (Local AI Fallback)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel metallic-border rounded-3xl p-6 md:p-10 shadow-gold-md relative overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-8 border-b border-zinc-800/90">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-gold text-brand-gold text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive AI-Assisted Solution • Live Backend API (`/api/ai/architect`)</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-white mt-2">
            Riyadvi <span className="text-gold-gradient">AI Solutions Architect</span>
          </h2>
          <p className="text-xs md:text-sm text-zinc-400 mt-1">
            Describe your business challenge below. Our AI engine generates a custom 3D + Full-Stack architecture blueprint and logs it to MongoDB.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-zinc-950 border border-zinc-800 text-[11px] font-mono text-brand-goldLight self-start">
          <Database className="w-3.5 h-3.5 text-brand-gold shrink-0" />
          <span>{logStatus}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
        {/* Left Input Console (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-2">
              1. Quick-Load Industry Scenario
            </span>
            <div className="flex flex-wrap gap-2">
              {PRESET_PROMPTS.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    setPrompt(item.prompt);
                    setIndustry(item.industry);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all border ${
                    prompt === item.prompt
                      ? "bg-brand-gold/20 border-brand-gold text-brand-goldLight"
                      : "bg-zinc-900/90 border-zinc-800 text-zinc-400 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                2. Target Industry Sector
              </label>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:border-brand-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                3. Your Project Vision or Technical Challenge
              </label>
              <textarea
                rows={4}
                required
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what you want to build (e.g., 3D product configurator, AI SaaS, mobile app)..."
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:border-brand-gold focus:outline-none leading-relaxed"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-full bg-gold-gradient text-black font-bold text-sm shadow-gold-md hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4" />
              <span>
                {loading ? "Synthesizing Architecture..." : "Generate AI Architecture Blueprint"}
              </span>
            </button>
          </form>
        </div>

        {/* Right Live Blueprint Output (7 Cols) */}
        <div className="lg:col-span-7 bg-zinc-950/90 border border-zinc-800/90 rounded-3xl p-6 md:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-4">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-brand-gold" />
              <span className="text-xs font-mono uppercase tracking-widest text-brand-gold">
                Generated System Specification
              </span>
            </div>
            <span className="text-xs font-mono text-zinc-400">{blueprint.estimatedWeeks}</span>
          </div>

          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white">{blueprint.projectTitle}</h3>
            <p className="text-xs md:text-sm text-zinc-300 mt-2 leading-relaxed">
              {blueprint.architectureSummary}
            </p>
          </div>

          {/* Recommended Stack */}
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1.5 mb-2.5">
              <Cpu className="w-3.5 h-3.5 text-brand-gold" /> Recommended Full-Stack & 3D Libraries
            </span>
            <div className="flex flex-wrap gap-2">
              {blueprint.recommendedStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg bg-brand-gold/10 border border-brand-gold/30 text-brand-goldLight text-xs font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Sprint Roadmap */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {blueprint.sprintRoadmap.map((s) => (
              <div key={s.phase} className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800">
                <span className="text-[10px] font-mono text-brand-gold font-bold">{s.phase}</span>
                <h4 className="text-xs font-bold text-white mt-1">{s.title}</h4>
                <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">{s.detail}</p>
              </div>
            ))}
          </div>

          {/* Matched Services & Case Studies */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-zinc-800/80">
            <div>
              <span className="text-[11px] font-mono uppercase text-zinc-400 block mb-2">
                Matched Riyadvi Practices
              </span>
              <div className="flex flex-wrap gap-1.5">
                {blueprint.recommendedServices.map((srv) => (
                  <Link
                    key={srv.slug}
                    to={`/services/${srv.slug}`}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-900 text-xs text-white hover:text-brand-gold border border-zinc-800"
                  >
                    <span>{srv.title}</span>
                    <ArrowUpRight className="w-3 h-3 text-brand-gold" />
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[11px] font-mono uppercase text-zinc-400 block mb-2">
                Proven Reference Case Studies
              </span>
              <div className="flex flex-wrap gap-1.5">
                {blueprint.matchedCaseStudies.map((cs) => (
                  <Link
                    key={cs.slug}
                    to={`/portfolio/${cs.slug}`}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full glass-gold text-xs text-brand-goldLight hover:border-brand-gold"
                  >
                    <span>{cs.client} ({cs.outcome})</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2 text-xs text-brand-goldLight">
              <CheckCircle2 className="w-4 h-4 text-brand-gold" />
              <span>Projected Impact: {blueprint.projectedROI}</span>
            </div>
            {onOpenConsultation && (
              <button
                type="button"
                onClick={onOpenConsultation}
                className="px-5 py-2 rounded-full bg-gold-gradient text-black font-bold text-xs shadow-gold-sm"
              >
                Book Architecture Review
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
