import React from "react";
import { Link } from "react-router-dom";
import { Award, Compass, Eye, HeartHandshake, Sparkles, Users } from "lucide-react";
import ScrollStoryTimeline from "../components/animations/ScrollStoryTimeline";
import HeroDigitalEcosystem3D from "../components/three/HeroDigitalEcosystem3D";

const COMPANY_MILESTONES = [
  {
    stepNumber: "21",
    tag: "2021 • Foundation",
    title: "Riyadvi Software Technologies Founded",
    description:
      "Established with a clear mission: help ambitious businesses move beyond generic software vendors by pairing full-stack engineering with strategic product thinking.",
    deliverables: ["Core Web & Mobile Practice", "First 10 Client Launches"]
  },
  {
    stepNumber: "22",
    tag: "2022 • Expansion",
    title: "Full-Stack & Growth Marketing Integration",
    description:
      "Added dedicated UI/UX design systems and performance digital marketing practices to deliver measurable conversion and ROAS alongside custom software.",
    deliverables: ["Design Systems Lab", "CRO & Technical SEO Practice"]
  },
  {
    stepNumber: "23",
    tag: "2023 • Spatial & 3D",
    title: "3D Modeling, WebGL & AR/VR Practice Launch",
    description:
      "Pioneered interactive 3D product configurators and browser-based AR/VR walkthroughs for real estate, luxury retail, and dental/healthcare leaders.",
    deliverables: ["Three.js / R3F Pipeline", "Pearl Housing & Wanaromah 3D"]
  },
  {
    stepNumber: "24",
    tag: "2024–2025 • AI Ecosystems",
    title: "AI-Assisted Engineering & Consumer AI Platforms",
    description:
      "Shipped high-concurrency AI platforms like Laxmi Astro AI and clinical biotech portals for Nugenica Biotech Lab and VisDoc.",
    deliverables: ["AI Product Engineering", "50+ Enterprise Deliveries"]
  },
  {
    stepNumber: "26",
    tag: "2026 • Next-Gen Partner",
    title: "Global Technology & Digital Solutions Partner",
    description:
      "Operating as an end-to-end transformation partner combining AI, 3D interactive web technologies, and full-stack cloud architectures.",
    deliverables: ["Interactive 3D Corporate Ecosystem", "Business Health Checkup Engine"]
  }
];

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
      {/* Story & 3D Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-gold text-brand-goldLight text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>Founded in 2021 • Chennai, India</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Where Engineering Precision Meets{" "}
            <span className="text-gold-gradient">Business Strategy</span>
          </h1>
          <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
            Riyadvi Software Technologies was founded in 2021 to bridge the divide between visual design studios, software development shops, and growth consultancies. We operate as a unified Technology & Digital Solutions Partner.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              to="/business-health-checkup"
              className="px-6 py-3 rounded-full bg-gold-gradient text-black font-bold text-xs shadow-gold-sm"
            >
              Take Business Health Checkup
            </Link>
            <Link
              to="/portfolio"
              className="px-6 py-3 rounded-full border border-brand-gold/40 text-brand-goldLight text-xs font-semibold hover:bg-brand-gold/10"
            >
              Explore Client Work
            </Link>
          </div>
        </div>
        <div className="lg:col-span-6">
          <HeroDigitalEcosystem3D className="w-full h-[420px]" />
        </div>
      </section>

      {/* Vision, Mission, Values, Approach */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel metallic-border rounded-3xl p-8 space-y-3">
          <Eye className="w-7 h-7 text-brand-gold" />
          <h2 className="text-2xl font-bold text-white">Our Vision</h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            To be the global benchmark for interactive, AI-enabled digital ecosystems that empower businesses of every size to scale with confidence and visual distinction.
          </p>
        </div>

        <div className="glass-panel metallic-border rounded-3xl p-8 space-y-3">
          <Compass className="w-7 h-7 text-brand-gold" />
          <h2 className="text-2xl font-bold text-white">Our Mission</h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            To combine custom full-stack software, 3D/interactive interfaces, and data-backed growth strategy into cohesive solutions that solve real commercial bottlenecks.
          </p>
        </div>

        <div className="glass-panel metallic-border rounded-3xl p-8 space-y-3">
          <HeartHandshake className="w-7 h-7 text-brand-gold" />
          <h2 className="text-2xl font-bold text-white">Core Values</h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
             Architectural ownership, transparent communication, human-in-the-loop AI excellence, and relentless focus on client ROI over vanity metrics.
          </p>
        </div>
      </section>

      {/* Interactive Company Timeline (Since 2021) */}
      <ScrollStoryTimeline
        badge="Company Journey • Since 2021"
        title="Riyadvi Milestones & Evolution"
        subtitle="Scroll through our journey from a specialized engineering studio in 2021 to a full-spectrum 3D, AI, and digital transformation partner."
        steps={COMPANY_MILESTONES}
      />

      {/* Awards & Leadership Culture */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-gold rounded-3xl p-8 space-y-4">
          <div className="flex items-center gap-2 text-brand-gold text-xs uppercase tracking-widest font-semibold">
            <Award className="w-4 h-4" />
            <span>Recognition & Standards</span>
          </div>
          <h3 className="text-2xl font-bold text-white">Awards & Engineering Excellence</h3>
          <ul className="space-y-3 text-sm text-zinc-300">
            <li>• Recognized Top Emerging Digital Transformation Partner (South India, 2024–2025)</li>
            <li>• 99.4% Multi-Year Client Retention Across Healthcare, Retail & PropTech</li>
            <li>• Strict WCAG AA Contrast & 90+ Lighthouse Performance Engineering Standards</li>
          </ul>
        </div>

        <div className="glass-panel rounded-3xl p-8 border border-zinc-800 space-y-4">
          <div className="flex items-center gap-2 text-brand-gold text-xs uppercase tracking-widest font-semibold">
            <Users className="w-4 h-4" />
            <span>Multidisciplinary Squads</span>
          </div>
          <h3 className="text-2xl font-bold text-white">Our Collaborative Team Structure</h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Every engagement is led by a triad of a Solutions Architect, a Senior 3D/UI Product Designer, and a Growth Strategist—ensuring design, code, and business goals never operate in silos.
          </p>
          <Link
            to="/careers"
            className="inline-block pt-2 text-xs font-bold text-brand-gold hover:underline"
          >
            Join Our Engineering & Design Team →
          </Link>
        </div>
      </section>
    </div>
  );
}
