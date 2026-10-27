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
import { useContent } from "../context/ContentContext";
import ServiceVisualizer3D from "../components/three/ServiceVisualizer3D";
import MagneticTiltCard from "../components/animations/MagneticTiltCard";

export default function ServiceDetail() {
  const { slug } = useParams();
  const { services, portfolio, getServiceBySlug } = useContent();
  const service = getServiceBySlug(slug);

  const relatedPortfolio = portfolio.filter((item) =>
    (service.relatedSlugs || []).includes(item.slug) ||
    (item.relatedServices || []).includes(service.slug)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* Service Sub-Navigation Pills */}
      <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-zinc-900">
        {services.map((item) => (
          <Link
            key={item.slug}
            to={`/services/${item.slug}`}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              item.slug === service.slug
                ? "bg-gold-gradient text-black font-bold shadow-gold-sm"
                : "bg-zinc-900/90 text-zinc-400 hover:text-white border border-zinc-800"
            }`}
          >
            {item.title}
          </Link>
        ))}
      </div>

      {/* 1. SERVICE HERO WITH INTERACTIVE 3D WEBGL SCENE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-gold text-brand-goldLight text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>{service.badge} • Dynamic MongoDB Service Template</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            {service.title}
          </h1>
          <p className="text-lg text-brand-goldLight font-medium">{service.tagline}</p>
          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            {service.shortDescription}
          </p>

          <div className="grid grid-cols-3 gap-4 pt-2">
            {(service.metrics || []).map((m) => (
              <div
                key={m.label}
                className="p-4 rounded-2xl bg-zinc-950 border border-brand-gold/25"
              >
                <p className="text-xl sm:text-2xl font-extrabold text-gold-gradient">
                  {m.value}
                </p>
                <p className="text-xs text-zinc-400 mt-1">{m.label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              to="/contact"
              className="px-6 py-3.5 rounded-full bg-gold-gradient text-black font-bold text-sm shadow-gold-md flex items-center gap-2"
            >
              <span>Request {service.title} Proposal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/business-health-checkup"
              className="px-6 py-3.5 rounded-full border border-brand-gold/40 text-brand-goldLight hover:bg-brand-gold/10 font-semibold text-sm transition-colors"
            >
              Run Free Diagnostic First
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="glass-panel metallic-border rounded-3xl p-4">
            <ServiceVisualizer3D variant={service.visualType || "web"} />
            <p className="text-center text-[11px] text-zinc-500 mt-3 font-mono">
              Interactive 3D Service Canvas • Drag to rotate
            </p>
          </div>
        </div>
      </div>

      {/* 2. THE PROBLEM & 3. THE RIYADVI SOLUTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-panel rounded-3xl p-8 border border-red-500/20 space-y-5">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-red-400 font-semibold">
            <AlertTriangle className="w-4 h-4" />
            <span>The Business Problem</span>
          </div>
          <h2 className="text-2xl font-bold text-white">
            Why Conventional {service.title} Falls Short
          </h2>
          <p className="text-zinc-300 text-sm leading-relaxed">{service.problem}</p>
        </div>

        <div className="glass-gold rounded-3xl p-8 space-y-5">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-brand-gold font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>The Riyadvi Solution</span>
          </div>
          <h2 className="text-2xl font-bold text-white">
            Engineered for High-Growth Scale & ROI
          </h2>
          <p className="text-zinc-200 text-sm leading-relaxed">{service.solution}</p>
        </div>
      </div>

      {/* 4. KEY FEATURES */}
      <div className="space-y-8">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
            Capabilities & Deliverables
          </span>
          <h2 className="text-3xl font-bold text-white mt-2">
            Key Features Included in {service.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(service.keyFeatures || []).map((feature, idx) => (
            <MagneticTiltCard key={feature} className="p-6 space-y-3">
              <span className="text-xs font-mono text-brand-gold">FEATURE 0{idx + 1}</span>
              <h3 className="text-lg font-bold text-white">{feature}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Architected with clean modular standards, automated QA testing, and executive KPI reporting.
              </p>
            </MagneticTiltCard>
          ))}
        </div>
      </div>

      {/* 5. INDUSTRY USE CASES & 6. TECHNOLOGY STACK */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6 glass-panel rounded-3xl p-8 border border-zinc-800 space-y-6">
          <div className="flex items-center gap-2 text-brand-gold text-xs uppercase tracking-widest font-semibold">
            <Briefcase className="w-4 h-4" />
            <span>Industry Use Cases</span>
          </div>
          <h3 className="text-2xl font-bold text-white">Where We Deploy {service.title}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(service.industries || []).map((ind) => (
              <div
                key={ind}
                className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs font-medium text-zinc-200 flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-brand-gold" />
                <span>{ind}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6 glass-panel rounded-3xl p-8 border border-zinc-800 space-y-6">
          <div className="flex items-center gap-2 text-brand-gold text-xs uppercase tracking-widest font-semibold">
            <Cpu className="w-4 h-4" />
            <span>Production Technology Stack</span>
          </div>
          <h3 className="text-2xl font-bold text-white">Frameworks, Engines & Tooling</h3>
          <div className="flex flex-wrap gap-2.5">
            {(service.technologies || []).map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-xl bg-zinc-900 border border-brand-gold/30 text-brand-goldLight text-xs font-semibold"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 7. PORTFOLIO EXAMPLES */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
              Verified Proof
            </span>
            <h2 className="text-3xl font-bold text-white mt-1">
              Related {service.title} Case Studies
            </h2>
          </div>
          <Link
            to="/portfolio"
            className="text-xs font-semibold text-brand-gold hover:underline flex items-center gap-1"
          >
            <span>All Case Studies</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {relatedPortfolio.map((project) => (
            <MagneticTiltCard key={project.slug} className="p-6 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-brand-gold font-semibold">{project.industry}</span>
                <span className="text-zinc-500">{project.timeline}</span>
              </div>
              <h3 className="text-2xl font-bold text-white">{project.client}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{project.summary}</p>
              <div className="flex flex-wrap gap-3 pt-2">
                {(project.results || []).map((res) => (
                  <div
                    key={res.label}
                    className="px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800"
                  >
                    <p className="text-sm font-extrabold text-brand-gold">{res.metric}</p>
                    <p className="text-[10px] text-zinc-400">{res.label}</p>
                  </div>
                ))}
              </div>
              <div className="pt-3">
                <Link
                  to={`/portfolio/${project.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-gold hover:underline"
                >
                  <span>Inspect Full Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </MagneticTiltCard>
          ))}
        </div>
      </div>

      {/* 8. CALL TO ACTION */}
      <div className="glass-gold rounded-3xl p-8 md:p-12 text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">
          Ready to Transform Your Business with {service.title}?
        </h2>
        <p className="text-zinc-300 text-sm max-w-2xl mx-auto">
          Schedule a strategy session with Riyadvi Software Technologies or run our interactive Business Health Checkup to receive a custom roadmap.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/contact"
            className="px-7 py-3.5 rounded-full bg-gold-gradient text-black font-bold text-sm shadow-gold-md"
          >
            Start Your Project
          </Link>
          <Link
            to="/software-project-planning-guide"
            className="px-7 py-3.5 rounded-full bg-black/70 border border-brand-gold/40 text-brand-goldLight font-semibold text-sm"
          >
            Download Planning Guide
          </Link>
        </div>
      </div>
    </div>
  );
}
