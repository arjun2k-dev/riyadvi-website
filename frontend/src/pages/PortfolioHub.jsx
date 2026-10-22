import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import MagneticTiltCard from "../components/animations/MagneticTiltCard";
import CaseStudyShowcase3D from "../components/three/CaseStudyShowcase3D";

export default function PortfolioHub() {
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const industries = ["All", ...Array.from(new Set(PORTFOLIO_DATA.map((p) => p.industry)))];

  const filteredProjects =
    selectedIndustry === "All"
      ? PORTFOLIO_DATA
      : PORTFOLIO_DATA.filter((p) => p.industry === selectedIndustry);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-gold text-brand-goldLight text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
          <span>10 Production Case Studies • Dynamic Portfolio Architecture</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white">
          Client <span className="text-gold-gradient">Transformations</span>
        </h1>
        <p className="text-zinc-400 text-sm md:text-base">
          Explore how Riyadvi partners with high-growth brands across AI, Biotech, HealthTech, Real Estate, and Luxury Retail.
        </p>
      </div>

      {/* Featured Interactive 3D Case Study Spotlight */}
      <div className="glass-panel metallic-border rounded-3xl p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 space-y-4">
          <span className="px-3 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-gold text-xs font-semibold">
            Featured 3D Case Study
          </span>
          <h2 className="text-3xl font-bold text-white">Laxmi Astro AI</h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            AI-powered Vedic astrology and real-time consultation platform featuring an interactive 3D celestial wheel and sub-second chart calculations.
          </p>
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
              <p className="text-xl font-bold text-gold-gradient">+240%</p>
              <p className="text-[11px] text-zinc-400">User Engagement</p>
            </div>
            <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
              <p className="text-xl font-bold text-white">&lt;0.8s</p>
              <p className="text-[11px] text-zinc-400">Chart Engine Latency</p>
            </div>
          </div>
          <div className="pt-3">
            <Link
              to="/portfolio/laxmi-astro-ai"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold-gradient text-black font-bold text-xs shadow-gold-sm"
            >
              <span>Open Interactive Case Study</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <div className="lg:col-span-7">
          <CaseStudyShowcase3D
            projectTitle="Laxmi Astro AI"
            metricLabel="+240% Daily Active Engagement"
          />
        </div>
      </div>

      {/* Industry Filter Tabs */}
      <div className="flex flex-wrap gap-2 justify-center">
        {industries.map((ind) => (
          <button
            key={ind}
            type="button"
            onClick={() => setSelectedIndustry(ind)}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
              selectedIndustry === ind
                ? "bg-gold-gradient text-black font-bold shadow-gold-sm"
                : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
            }`}
          >
            {ind}
          </button>
        ))}
      </div>

      {/* Dynamic Portfolio Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <MagneticTiltCard key={project.slug} className="p-6 md:p-7 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-brand-gold font-medium">{project.industry}</span>
                {project.has3DShowcase && (
                  <span className="px-2.5 py-0.5 rounded-full bg-brand-gold/10 text-brand-goldLight border border-brand-gold/30 text-[10px] font-mono">
                    3D Interactive
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white">{project.client}</h3>
                <p className="text-xs text-brand-goldLight mt-1 font-medium">{project.title}</p>
                <p className="text-sm text-zinc-400 mt-3 leading-relaxed">{project.summary}</p>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2">
                {project.results.map((r) => (
                  <div
                    key={r.label}
                    className="p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-center"
                  >
                    <p className="text-sm font-extrabold text-gold-gradient">{r.metric}</p>
                    <p className="text-[10px] text-zinc-400 line-clamp-2 mt-0.5">{r.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-zinc-800/80 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded text-[10px] bg-zinc-900 text-zinc-400 border border-zinc-800"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <Link
                to={`/portfolio/${project.slug}`}
                className="inline-flex items-center gap-1 text-xs font-bold text-brand-gold hover:underline"
              >
                <span>Case Study</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </MagneticTiltCard>
        ))}
      </div>
    </div>
  );
}
