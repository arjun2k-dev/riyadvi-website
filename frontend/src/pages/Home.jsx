import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  Layers,
  Cpu,
  TrendingUp,
  CheckCircle2,
  Download
} from "lucide-react";
import HeroDigitalEcosystem3D from "../components/three/HeroDigitalEcosystem3D";
import TechConstellation3D from "../components/three/TechConstellation3D";
import ServiceVisualizer3D from "../components/three/ServiceVisualizer3D";
import ScrollStoryTimeline from "../components/animations/ScrollStoryTimeline";
import MagneticTiltCard from "../components/animations/MagneticTiltCard";
import { useContent } from "../context/ContentContext";
import AISolutionsArchitect from "../components/ai/AISolutionsArchitect";

const TRANSFORMATION_STEPS = [
  {
    stepNumber: "01",
    tag: "Stage 1 • Diagnostic",
    title: "Business Challenge",
    description:
      "We audit your current digital presence, operational bottlenecks, conversion leaks, and legacy architecture before writing a single line of code.",
    deliverables: ["Business Health Checkup", "Competitor & Funnel Audit", "KPI Baseline"]
  },
  {
    stepNumber: "02",
    tag: "Stage 2 • Blueprint",
    title: "Strategy",
    description:
      "We align software architecture with measurable business outcomes—defining product roadmaps, data models, and acquisition channels.",
    deliverables: ["System Architecture", "Growth Roadmap", "ROI Modeling"]
  },
  {
    stepNumber: "03",
    tag: "Stage 3 • Experience",
    title: "Design",
    description:
      "Our UI/UX and 3D creative technologists craft futuristic dark-and-gold design systems, interactive prototypes, and WebGL assets.",
    deliverables: ["Tokenized UI/UX System", "Interactive 3D Prototypes", "User Journey Flows"]
  },
  {
    stepNumber: "04",
    tag: "Stage 4 • Engineering",
    title: "Technology",
    description:
      "Full-stack agile sprints using React.js, Next.js, Three.js, Node.js, Express, and MongoDB—built for security, speed, and modularity.",
    deliverables: ["React + 3D Frontend", "Node/Express REST APIs", "MongoDB Schemas"]
  },
  {
    stepNumber: "05",
    tag: "Stage 5 • Go-Live",
    title: "Launch",
    description:
      "Rigorous QA, mobile GPU optimization, Lighthouse 90+ performance tuning, and zero-downtime cloud deployment.",
    deliverables: ["Cloud CI/CD Deployment", "Mobile GPU Optimization", "Security Hardening"]
  },
  {
    stepNumber: "06",
    tag: "Stage 6 • Scale",
    title: "Growth",
    description:
      "Continuous performance marketing, technical SEO, conversion rate optimization (CRO), and feature iteration to compound revenue.",
    deliverables: ["Full-Funnel Analytics", "SEO & Paid Acquisition", "Long-Term Partnership"]
  }
];

const END_TO_END_JOURNEY = [
  { step: "01", label: "Strategy", detail: "Business & technical discovery" },
  { step: "02", label: "Design", detail: "UI/UX & 3D interactive systems" },
  { step: "03", label: "Development", detail: "Full-stack web, mobile & XR code" },
  { step: "04", label: "Marketing", detail: "SEO, paid growth & lead funnels" },
  { step: "05", label: "Optimization", detail: "CRO, speed & analytics tuning" },
  { step: "06", label: "Growth", detail: "Scalable long-term revenue expansion" }
];

export default function Home({ onOpenConsultation }) {
  const { services, portfolio } = useContent();
  const [activeServiceSlug, setActiveServiceSlug] = useState(() => (services?.[0]?.slug || "web-development"));
  const activeService = (services && services.find((s) => s.slug === activeServiceSlug)) || services?.[0] || {};

  return (
    <div className="space-y-28 md:space-y-36 pb-20">
      {/* 11. HERO SECTION + 3D HERO */}
      <section className="relative pt-8 md:pt-14 overflow-hidden">
        <div className="absolute inset-0 bg-dark-radial pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-gold text-brand-goldLight text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                <span>A Technology & Digital Solutions Partner • Since 2021</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
                Custom Software &{" "}
                <span className="text-gold-gradient">Digital Solutions</span> to Grow Your Business
              </h1>

              <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-xl">
                Web & App Development, UI/UX Design, and Business Strategy – all tailored to your needs.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={onOpenConsultation}
                  className="px-7 py-4 rounded-full bg-gold-gradient text-black font-bold text-sm shadow-gold-md hover:scale-[1.02] transition-all flex items-center gap-2"
                >
                  <span>Book a Free Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="#core-services"
                  className="px-7 py-4 rounded-full glass-panel border border-brand-gold/40 text-white hover:border-brand-gold hover:text-brand-goldLight text-sm font-semibold transition-all"
                >
                  Explore Our Solutions
                </a>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-zinc-800/80">
                <div>
                  <p className="text-2xl md:text-3xl font-extrabold text-gold-gradient">2021</p>
                  <p className="text-xs text-zinc-400 mt-0.5">Founded & Scaling Globally</p>
                </div>
                <div>
                  <p className="text-2xl md:text-3xl font-extrabold text-white">50+</p>
                  <p className="text-xs text-zinc-400 mt-0.5">Digital Transformations</p>
                </div>
                <div>
                  <p className="text-2xl md:text-3xl font-extrabold text-brand-gold">3.4x</p>
                  <p className="text-xs text-zinc-400 mt-0.5">Avg. Client Growth ROI</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <HeroDigitalEcosystem3D />
            </div>
          </div>
        </div>
      </section>

      {/* 12. DIGITAL TRANSFORMATION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollStoryTimeline
          badge="Riyadvi Methodology"
          title="From Business Challenge to Exponential Growth"
          subtitle="We don't just write code—we architect end-to-end digital transformation systems using scroll-driven clarity and engineering precision."
          steps={TRANSFORMATION_STEPS}
        />
      </section>

      {/* 13. SIX CORE SERVICES (INTERACTIVE 3D + TILT CARDS) */}
      <section id="core-services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
              Interactive Capabilities
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-2">
              Six Core Digital & Engineering Practices
            </h2>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-gold hover:underline"
          >
            <span>View Full Services Architecture</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center glass-panel metallic-border rounded-3xl p-6 md:p-10">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[11px] font-mono uppercase tracking-widest text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full border border-brand-gold/30">
              {activeService.visualType}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-white">{activeService.title}</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">{activeService.heroDescription}</p>
            <div className="flex flex-wrap gap-2 pt-2">
              {(activeService.techStack || []).slice(0, 5).map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-lg text-xs bg-zinc-900 text-zinc-300 border border-zinc-800"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="pt-4 flex flex-wrap gap-3">
              <Link
                to={`/services/${activeService.slug}`}
                className="px-5 py-2.5 rounded-full bg-gold-gradient text-black font-semibold text-xs flex items-center gap-1.5 shadow-gold-sm"
              >
                <span>Explore {activeService.title}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <button
                onClick={onOpenConsultation}
                className="px-5 py-2.5 rounded-full border border-brand-gold/40 text-brand-goldLight text-xs font-semibold hover:bg-brand-gold/10"
              >
                Get a Quote
              </button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ServiceVisualizer3D slug={activeService.slug} className="w-full h-[320px] md:h-[380px]" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(services || []).map((service, idx) => {
            const isSelected = service.slug === activeServiceSlug;
            return (
              <MagneticTiltCard
                key={service.slug}
                className={`p-6 md:p-7 flex flex-col justify-between cursor-pointer ${
                  isSelected ? "ring-1 ring-brand-gold shadow-gold-sm" : ""
                }`}
              >
                <div onMouseEnter={() => setActiveServiceSlug(service.slug)}>
                  <div className="flex items-center justify-between text-xs font-mono text-brand-gold mb-4">
                    <span>0{idx + 1} / PRACTICE</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-brand-gold/10 border border-brand-gold/30">
                      3D Interactive
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white">{service.title}</h3>
                  <p className="text-xs text-brand-goldLight mt-1 font-medium">
                    {service.visualType}
                  </p>
                  <p className="text-sm text-zinc-400 mt-3 line-clamp-3 leading-relaxed">
                    {service.heroDescription}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-zinc-800/80 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveServiceSlug(service.slug)}
                    className="text-xs text-zinc-400 hover:text-brand-gold font-mono"
                  >
                    {isSelected ? "● Active in 3D Stage" : "Preview in 3D Stage"}
                  </button>
                  <Link
                    to={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand-gold hover:underline"
                  >
                    <span>Service Page</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </MagneticTiltCard>
            );
          })}
        </div>
      </section>

      {/* 14. TECHNOLOGY ECOSYSTEM (3D CONSTELLATION) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
            3D Technology Constellation
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-2">
            Our Modern Engineering Ecosystem
          </h2>
          <p className="text-zinc-400 mt-3 text-sm md:text-base">
            Interact with our 3D technology sphere—combining React, Next.js, Node.js, MongoDB, Three.js, React Three Fiber, and GSAP into cohesive digital products.
          </p>
        </div>

        <TechConstellation3D />
      </section>

      {/* 15. WHY RIYADVI + END-TO-END SOLUTIONS + BUSINESS HEALTH CHECKUP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 glass-panel metallic-border rounded-3xl p-8 md:p-10 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
              Why Riyadvi • Since 2021
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              A Technology & Digital Solutions Partner — Not Simply a Vendor
            </h2>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
              Founded in 2021, Riyadvi Software Technologies bridges the gap between deep software engineering, 3D visual innovation, and commercial business strategy. Every platform we ship is architected to compound revenue, streamline operations, and elevate brand authority.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                { icon: ShieldCheck, title: "Long-Term Partnership", desc: "Dedicated architecture & growth squads from MVP to enterprise scale." },
                { icon: Layers, title: "Reusable Architecture", desc: "Dynamic, API-ready systems that expand without costly rewrites." },
                { icon: Cpu, title: "AI + 3D Innovation", desc: "Modern WebGL, spatial computing, and AI-accelerated workflows." },
                { icon: TrendingUp, title: "Business Growth Focus", desc: "Built-in CRO, lead diagnostics, and measurable ROAS." }
              ].map((item) => (
                <div key={item.title} className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800">
                  <item.icon className="w-5 h-5 text-brand-gold mb-2" />
                  <h4 className="text-sm font-bold text-white">{item.title}</h4>
                  <p className="text-xs text-zinc-400 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-gold hover:underline"
              >
                <span>Explore Our Interactive Timeline (Since 2021)</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 glass-gold rounded-3xl p-8 md:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full bg-brand-gold text-black font-bold text-xs uppercase tracking-wider">
                Free Diagnostic Tool
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                Is Your Business Ready for Its Next Digital Growth Stage?
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Take Riyadvi&apos;s interactive 6-step Business Health Checkup to benchmark your Website, Marketing, Technology Stack, and Growth Bottlenecks in under 2 minutes.
              </p>
              <ul className="space-y-2 text-xs text-zinc-300 pt-2">
                {[
                  "Step 1–2: Business & Digital Presence Audit",
                  "Step 3–4: Marketing & Technology Stack Evaluation",
                  "Step 5–6: Growth Bottlenecks & Instant Readiness Score"
                ].map((pt) => (
                  <li key={pt} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 pt-4">
              <Link
                to="/business-health-checkup"
                className="w-full py-3.5 px-6 rounded-full bg-gold-gradient text-black font-bold text-sm shadow-gold-sm flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform"
              >
                <span>Start Business Health Checkup</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/software-project-planning-guide"
                className="w-full py-3 px-6 rounded-full bg-black/60 border border-brand-gold/40 text-brand-goldLight text-xs font-semibold flex items-center justify-center gap-2 hover:bg-brand-gold/10 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Software Project Planning Guide</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-8 border border-zinc-800/90">
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-[0.2em] text-brand-gold font-semibold">
              End-to-End Solutions
            </span>
            <h3 className="text-2xl font-bold text-white mt-1">
              The Complete Digital Growth Lifecycle
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {END_TO_END_JOURNEY.map((item) => (
              <div
                key={item.step}
                className="p-4 rounded-2xl bg-zinc-950/90 border border-zinc-800/80 hover:border-brand-gold/50 transition-colors text-center"
              >
                <span className="text-xs font-mono text-brand-gold">{item.step}</span>
                <h4 className="text-base font-bold text-white mt-1">{item.label}</h4>
                <p className="text-[11px] text-zinc-400 mt-1">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE AI SOLUTIONS ARCHITECT CONSOLE (AI + BACKEND + MONGODB) */}
      <section id="ai-architect" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <AISolutionsArchitect onOpenConsultation={onOpenConsultation} />
      </section>

      {/* FEATURED PORTFOLIO CASE STUDIES PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
              Proven Outcomes
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-2">
              Featured Client Case Studies
            </h2>
          </div>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-gold hover:underline"
          >
            <span>Explore All 10 Case Studies</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(portfolio || []).slice(0, 3).map((project) => (
            <MagneticTiltCard key={project.slug} className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="text-brand-gold font-semibold">{project.industry}</span>
                  {project.has3DShowcase && (
                    <span className="px-2.5 py-0.5 rounded-full bg-brand-gold/10 text-brand-goldLight border border-brand-gold/30 text-[10px]">
                      3D Case Study
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-white">{project.client}</h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">{project.summary}</p>
                <div className="mt-4 p-3 rounded-xl bg-zinc-900/90 border border-zinc-800">
                  <p className="text-lg font-extrabold text-gold-gradient">
                    {project.results[0].metric}
                  </p>
                  <p className="text-[11px] text-zinc-400">{project.results[0].label}</p>
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-zinc-800/80 flex items-center justify-between">
                <div className="flex gap-1.5">
                  {project.technologies.slice(0, 2).map((t) => (
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
                  className="inline-flex items-center gap-1 text-xs font-semibold text-brand-gold hover:underline"
                >
                  <span>Read Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </MagneticTiltCard>
          ))}
        </div>
      </section>
    </div>
  );
}