import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Cpu,
  Briefcase
} from "lucide-react";
import { getServiceBySlug, SERVICES_DATA } from "../data/servicesData";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import ServiceVisualizer3D from "../components/three/ServiceVisualizer3D";
import MagneticTiltCard from "../components/animations/MagneticTiltCard";

/**
 * Reusable Dynamic Service Page Template (Sections 19 & 24):
 * Renders all 6 required service routes (/services/:slug) from structured data:
 * 1. Interactive 3D Hero
 * 2. Problem
 * 3. Solution
 * 4. Key Features
 * 5. Industry Use Cases
 * 6. Technology Stack
 * 7. Process
 * 8. Related Portfolio
 * 9. CTA: Get a Quote
 */
export default function ServiceDetail({ onOpenConsultation }) {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);
  const relatedProjects = PORTFOLIO_DATA.filter((p) =>
    service.relatedPortfolio.includes(p.slug)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* Service Switcher Pills */}
      <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-zinc-900">
        {SERVICES_DATA.map((item) => (
          <Link
            key={item.slug}
            to={`/services/${item.slug}`}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
              item.slug === service.slug
                ? "bg-gold-gradient text-black font-bold shadow-gold-sm"
                : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
            }`}
          >
            {item.title}
          </Link>
        ))}
      </div>

      {/* 1. Interactive 3D Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-gold text-brand-goldLight text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>{service.visualType}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            {service.title}
          </h1>
          <p className="text-base text-brand-goldLight font-medium">{service.tagline}</p>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
            {service.heroDescription}
          </p>

          <div className="grid grid-cols-3 gap-4 pt-3">
            {service.metrics.map((m) => (
              <div key={m.label} className="p-3.5 rounded-2xl glass-panel border border-zinc-800">
                <p className="text-2xl font-extrabold text-gold-gradient">{m.value}</p>
                <p className="text-[11px] text-zinc-400 mt-0.5">{m.label}</p>
              </div>
            ))}
          </div>

          <div className="pt-3 flex flex-wrap gap-4">
            <button
              onClick={onOpenConsultation}
              className="px-7 py-3.5 rounded-full bg-gold-gradient text-black font-bold text-sm shadow-gold-sm hover:scale-[1.02] transition-transform flex items-center gap-2"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              to="/contact"
              className="px-7 py-3.5 rounded-full border border-brand-gold/40 text-brand-goldLight text-sm font-semibold hover:bg-brand-gold/10"
            >
              Speak to an Architect
            </Link>
          </div>
        </div>

        <div className="lg:col-span-6">
          <ServiceVisualizer3D slug={service.slug} className="w-full h-[380px] md:h-[440px]" />
        </div>
      </section>

      {/* 2. Problem & 3. Solution */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-panel rounded-3xl p-8 border border-red-500/20 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-red-400">
            <AlertTriangle className="w-4 h-4" />
            <span>The Business Challenge</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Why Conventional Approaches Fail</h2>
          <p className="text-sm text-zinc-300 leading-relaxed">{service.problem}</p>
        </div>

        <div className="glass-gold rounded-3xl p-8 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-brand-gold">
            <CheckCircle2 className="w-4 h-4" />
            <span>The Riyadvi Solution</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Engineered for Competitive Advantage</h2>
          <p className="text-sm text-zinc-200 leading-relaxed">{service.solution}</p>
        </div>
      </section>

      {/* 4. Key Features */}
      <section className="space-y-8">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
            Capabilities & Deliverables
          </span>
          <h2 className="text-3xl font-bold text-white mt-1">Key Features</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {service.keyFeatures.map((feature) => (
            <div
              key={feature}
              className="glass-panel metallic-border rounded-2xl p-6 flex items-start gap-3.5"
            >
              <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
              <span className="text-sm font-medium text-zinc-200 leading-snug">{feature}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Industry Use Cases & 6. Technology Stack */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 glass-panel rounded-3xl p-8 space-y-6">
          <div className="flex items-center gap-2 text-brand-gold text-xs uppercase tracking-widest font-semibold">
            <Briefcase className="w-4 h-4" />
            <span>Domain Applications</span>
          </div>
          <h3 className="text-2xl font-bold text-white">Industry Use Cases</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {service.industryUseCases.map((item) => (
              <div
                key={item.industry}
                className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800"
              >
                <h4 className="text-sm font-bold text-brand-goldLight">{item.industry}</h4>
                <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">{item.useCase}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 glass-panel metallic-border rounded-3xl p-8 space-y-6">
          <div className="flex items-center gap-2 text-brand-gold text-xs uppercase tracking-widest font-semibold">
            <Cpu className="w-4 h-4" />
            <span>Production Tooling</span>
          </div>
          <h3 className="text-2xl font-bold text-white">Technology Stack</h3>
          <p className="text-xs text-zinc-400">
            Battle-tested frameworks and cloud infrastructure selected for reliability and speed:
          </p>
          <div className="flex flex-wrap gap-2.5">
            {service.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3.5 py-2 rounded-xl bg-zinc-900 text-brand-goldLight border border-brand-gold/30 text-xs font-mono"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Delivery Process */}
      <section className="space-y-8">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
            Execution Roadmap
          </span>
          <h2 className="text-3xl font-bold text-white mt-1">Our Delivery Process</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {service.process.map((step) => (
            <div
              key={step.step}
              className="glass-panel rounded-2xl p-6 border border-zinc-800/90 space-y-3"
            >
              <span className="text-xs font-mono font-bold text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full">
                PHASE {step.step}
              </span>
              <h3 className="text-lg font-bold text-white">{step.title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Related Portfolio */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
              Case Studies
            </span>
            <h2 className="text-3xl font-bold text-white mt-1">Related Portfolio Projects</h2>
          </div>
          <Link to="/portfolio" className="text-xs font-semibold text-brand-gold hover:underline">
            View All Case Studies →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedProjects.map((project) => (
            <MagneticTiltCard key={project.slug} className="p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs text-brand-gold font-medium">{project.industry}</span>
                <h3 className="text-xl font-bold text-white mt-1">{project.client}</h3>
                <p className="text-xs text-zinc-400 mt-2">{project.summary}</p>
              </div>
              <div className="pt-5 mt-5 border-t border-zinc-800 flex items-center justify-between">
                <span className="text-xs font-bold text-brand-goldLight">
                  {project.results[0].metric} {project.results[0].label}
                </span>
                <Link
                  to={`/portfolio/${project.slug}`}
                  className="text-xs text-brand-gold flex items-center gap-1 hover:underline"
                >
                  <span>Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </MagneticTiltCard>
          ))}
        </div>
      </section>

      {/* 9. Primary CTA: Get a Quote */}
      <section className="glass-gold rounded-3xl p-8 md:p-12 text-center space-y-5">
        <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
          Start Your Project
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white max-w-2xl mx-auto">
          Ready to transform your business with {service.title}?
        </h2>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <button
            onClick={onOpenConsultation}
            className="px-8 py-4 rounded-full bg-gold-gradient text-black font-bold text-sm shadow-gold-md hover:scale-[1.02] transition-transform"
          >
            Get a Quote
          </button>
          <Link
            to="/business-health-checkup"
            className="px-8 py-4 rounded-full border border-brand-gold/40 text-white hover:bg-brand-gold/10 text-sm font-semibold"
          >
            Take Business Health Checkup
          </Link>
        </div>
      </section>
    </div>
  );
}
