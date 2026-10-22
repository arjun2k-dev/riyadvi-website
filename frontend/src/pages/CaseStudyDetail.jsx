import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Layers, Cpu } from "lucide-react";
import { getCaseStudyBySlug, PORTFOLIO_DATA } from "../data/portfolioData";
import { SERVICES_DATA } from "../data/servicesData";
import CaseStudyShowcase3D from "../components/three/CaseStudyShowcase3D";

/**
 * Reusable Portfolio Case Study Template (Sections 18 & 24):
 * Displays Client, Industry, Challenge, Solution, Technologies, Results, Visuals, Related Services,
 * plus an interactive 3D presentation stage.
 */
export default function CaseStudyDetail() {
  const { slug } = useParams();
  const project = getCaseStudyBySlug(slug);
  const relatedServiceItems = SERVICES_DATA.filter((s) =>
    project.relatedServices.includes(s.slug)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-900">
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-brand-gold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Case Studies</span>
        </Link>

        <div className="flex flex-wrap gap-2">
          {PORTFOLIO_DATA.map((p) => (
            <Link
              key={p.slug}
              to={`/portfolio/${p.slug}`}
              className={`px-3 py-1 rounded-full text-[11px] transition-all ${
                p.slug === project.slug
                  ? "bg-gold-gradient text-black font-bold"
                  : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
              }`}
            >
              {p.client}
            </Link>
          ))}
        </div>
      </div>

      {/* Hero + Interactive 3D Case Study Stage */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 space-y-5">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full glass-gold text-brand-gold text-xs font-semibold">
              {project.industry}
            </span>
            <span className="text-xs font-mono text-zinc-400">Client: {project.client}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
            {project.title}
          </h1>
          <p className="text-zinc-300 text-sm md:text-base leading-relaxed">{project.summary}</p>

          {/* Quantified Results Grid */}
          <div className="grid grid-cols-3 gap-4 pt-3">
            {project.results.map((res) => (
              <div
                key={res.label}
                className="p-4 rounded-2xl glass-panel metallic-border text-center"
              >
                <p className="text-2xl md:text-3xl font-extrabold text-gold-gradient">
                  {res.metric}
                </p>
                <p className="text-xs text-zinc-400 mt-1">{res.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6">
          <CaseStudyShowcase3D
            projectTitle={project.client}
            metricLabel={`${project.results[0].metric} ${project.results[0].label}`}
            accentColor={project.accentColor}
          />
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-panel rounded-3xl p-8 border border-zinc-800 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-gold">
            01 • The Challenge
          </span>
          <h2 className="text-2xl font-bold text-white">Problem Statement</h2>
          <p className="text-sm text-zinc-300 leading-relaxed">{project.challenge}</p>
        </div>

        <div className="glass-gold rounded-3xl p-8 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-gold">
            02 • The Solution
          </span>
          <h2 className="text-2xl font-bold text-white">Riyadvi Architecture & Execution</h2>
          <p className="text-sm text-zinc-200 leading-relaxed">{project.solution}</p>
        </div>
      </section>

      {/* Visuals & Technologies */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 glass-panel rounded-3xl p-8 space-y-5">
          <div className="flex items-center gap-2 text-brand-gold text-xs uppercase tracking-widest font-semibold">
            <Layers className="w-4 h-4" />
            <span>Interactive Visuals & System Highlights</span>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {project.visuals.map((vis, idx) => (
              <div
                key={vis}
                className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0" />
                  <span className="text-sm font-medium text-white">{vis}</span>
                </div>
                <span className="text-xs font-mono text-zinc-500">MODULE 0{idx + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 glass-panel metallic-border rounded-3xl p-8 space-y-6">
          <div className="flex items-center gap-2 text-brand-gold text-xs uppercase tracking-widest font-semibold">
            <Cpu className="w-4 h-4" />
            <span>Technologies Implemented</span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-xl bg-zinc-900 text-brand-goldLight border border-brand-gold/30 text-xs font-mono"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="pt-4 border-t border-zinc-800 space-y-3">
            <p className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">
              Related Riyadvi Services
            </p>
            <div className="flex flex-wrap gap-2">
              {relatedServiceItems.map((srv) => (
                <Link
                  key={srv.slug}
                  to={`/services/${srv.slug}`}
                  className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full glass-gold text-xs text-white hover:text-brand-gold"
                >
                  <span>{srv.title}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
