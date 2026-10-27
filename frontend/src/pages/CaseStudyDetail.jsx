import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Layers, Cpu } from "lucide-react";
import { useContent } from "../context/ContentContext";
import CaseStudyShowcase3D from "../components/three/CaseStudyShowcase3D";

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const { portfolio, services, getCaseStudyBySlug } = useContent();
  const project = getCaseStudyBySlug(slug);
  const relatedServiceItems = services.filter((s) =>
    (project.relatedServices || []).includes(s.slug)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-900">
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-brand-gold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All {portfolio.length} Case Studies</span>
        </Link>
        <div className="flex flex-wrap gap-1.5">
          {portfolio.map((item) => (
            <Link
              key={item.slug}
              to={`/portfolio/${item.slug}`}
              className={`px-2.5 py-1 rounded-full text-[11px] transition-all ${
                item.slug === project.slug
                  ? "bg-gold-gradient text-black font-bold"
                  : "bg-zinc-900 text-zinc-400 hover:text-white"
              }`}
            >
              {item.client}
            </Link>
          ))}
        </div>
      </div>

      {/* Hero Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-gold text-brand-goldLight text-xs font-semibold">
            <span>{project.industry}</span>
            <span>•</span>
            <span>Timeline: {project.timeline}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
            {project.client}
          </h1>
          <p className="text-zinc-300 text-base leading-relaxed">{project.summary}</p>

          {/* Key Results */}
          <div className="grid grid-cols-3 gap-4 pt-2">
            {(project.results || []).map((r) => (
              <div
                key={r.label}
                className="p-4 rounded-2xl bg-zinc-950 border border-brand-gold/30"
              >
                <p className="text-2xl font-extrabold text-gold-gradient">{r.metric}</p>
                <p className="text-xs text-zinc-400 mt-1">{r.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <CaseStudyShowcase3D
            client={project.client}
            industry={project.industry}
            highlightMetric={project.results?.[0]?.metric || "+200% ROI"}
          />
        </div>
      </div>

      {/* Challenge & Solution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-panel rounded-3xl p-8 border border-zinc-800 space-y-4">
          <span className="text-xs uppercase tracking-widest text-brand-gold font-semibold">
            01 • The Business Challenge
          </span>
          <h2 className="text-2xl font-bold text-white">Problem Statement</h2>
          <p className="text-zinc-300 text-sm leading-relaxed">{project.challenge}</p>
        </div>

        <div className="glass-gold rounded-3xl p-8 space-y-4">
          <span className="text-xs uppercase tracking-widest text-brand-gold font-semibold">
            02 • The Riyadvi Solution
          </span>
          <h2 className="text-2xl font-bold text-white">Engineering & Growth Execution</h2>
          <p className="text-zinc-200 text-sm leading-relaxed">{project.solution}</p>
        </div>
      </div>

      {/* Visual Architecture Layers & Technologies */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 glass-panel rounded-3xl p-8 border border-zinc-800 space-y-5">
          <div className="flex items-center gap-2 text-brand-gold text-xs uppercase tracking-widest font-semibold">
            <Layers className="w-4 h-4" />
            <span>Delivered System Visuals & Modules</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {(project.visuals || []).map((vis, idx) => (
              <div
                key={vis}
                className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between"
              >
                <span className="text-xs font-mono text-brand-gold">MODULE 0{idx + 1}</span>
                <p className="text-sm font-bold text-white mt-3">{vis}</p>
                <span className="text-[11px] text-emerald-400 mt-4 inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Deployed in Production
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 glass-panel rounded-3xl p-8 border border-zinc-800 space-y-5">
          <div className="flex items-center gap-2 text-brand-gold text-xs uppercase tracking-widest font-semibold">
            <Cpu className="w-4 h-4" />
            <span>Technologies Used</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {(project.technologies || []).map((t) => (
              <span
                key={t}
                className="px-3.5 py-2 rounded-xl bg-zinc-900 border border-brand-gold/30 text-brand-goldLight text-xs font-semibold"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="pt-4 border-t border-zinc-800">
            <p className="text-xs uppercase tracking-wider text-zinc-500 mb-3">
              Related Riyadvi Services
            </p>
            <div className="flex flex-wrap gap-2">
              {relatedServiceItems.map((srv) => (
                <Link
                  key={srv.slug}
                  to={`/services/${srv.slug}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-xs text-brand-gold hover:bg-brand-gold/20"
                >
                  <span>{srv.title}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
