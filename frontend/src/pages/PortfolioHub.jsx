import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Sparkles, Database } from "lucide-react";
import { useContent } from "../context/ContentContext";
import MagneticTiltCard from "../components/animations/MagneticTiltCard";
import CaseStudyShowcase3D from "../components/three/CaseStudyShowcase3D";

export default function PortfolioHub() {
  const { portfolio, telemetry } = useContent();
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const industries = ["All", ...Array.from(new Set(portfolio.map((p) => p.industry)))];

  const filteredProjects =
    selectedIndustry === "All"
      ? portfolio
      : portfolio.filter((p) => p.industry === selectedIndustry);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-gold text-brand-goldLight text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
          <span>{portfolio.length} Production Case Studies • Dynamic MongoDB Portfolio</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white">
          Client <span className="text-gold-gradient">Transformations</span>
        </h1>
        <p className="text-zinc-400 text-sm md:text-base">
          Explore real-world enterprise deployments across FinTech, Healthcare, Retail, Industrial IoT, SaaS, and Real Estate.
        </p>
        <div className="inline-flex items-center gap-2 text-[11px] text-zinc-400 font-mono">
          <Database className="w-3.5 h-3.5 text-brand-gold" />
          <span>Synced from {telemetry.source}</span>
        </div>
      </div>

      {/* Interactive 3D Case Study Showcase Stage */}
      <div className="glass-panel metallic-border rounded-3xl p-6 md:p-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-brand-gold font-semibold">
              Interactive 3D Case Study Showcase
            </span>
            <h2 className="text-2xl font-bold text-white mt-1">
              3D Spatial KPI & Architecture Stage
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-400">
            WebGL Interactive Stage • Orbit & Inspect
          </span>
        </div>
        <CaseStudyShowcase3D
          client="Riyadvi Enterprise Portfolio"
          industry="Multi-Industry Digital Transformation"
          highlightMetric="3.4x Average ROI"
        />
      </div>

      {/* Industry Filter Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {industries.map((ind) => (
          <button
            key={ind}
            onClick={() => setSelectedIndustry(ind)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              selectedIndustry === ind
                ? "bg-gold-gradient text-black shadow-gold-sm"
                : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
            }`}
          >
            {ind}
          </button>
        ))}
      </div>

      {/* Dynamic Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project, idx) => (
          <MagneticTiltCard
            key={project.slug}
            className="p-7 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-brand-gold">
                  CASE STUDY #{String(idx + 1).padStart(2, "0")} • {project.industry}
                </span>
                {project.has3DShowcase && (
                  <span className="px-2.5 py-0.5 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-goldLight text-[10px] font-semibold">
                    3D Interactive
                  </span>
                )}
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-white">{project.client}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{project.summary}</p>

              {/* Results Grid */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {(project.results || []).map((res) => (
                  <div
                    key={res.label}
                    className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/90"
                  >
                    <p className="text-base md:text-lg font-extrabold text-gold-gradient">
                      {res.metric}
                    </p>
                    <p className="text-[10px] text-zinc-400 mt-0.5">{res.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-5 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-1.5">
                {(project.technologies || []).slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md text-[11px] bg-zinc-900 border border-zinc-800 text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <Link
                to={`/portfolio/${project.slug}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gold-gradient text-black font-bold text-xs shadow-gold-sm"
              >
                <span>Full Case Study</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </MagneticTiltCard>
        ))}
      </div>
    </div>
  );
}
