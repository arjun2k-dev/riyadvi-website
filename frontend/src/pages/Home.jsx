import React from "react";
import HeroDigitalEcosystem3D from "../components/three/HeroDigitalEcosystem3D";
import TechConstellation3D from "../components/three/TechConstellation3D";
import ServiceVisualizer3D from "../components/three/ServiceVisualizer3D";
import CaseStudyShowcase3D from "../components/three/CaseStudyShowcase3D";
import ScrollStoryTimeline from "../components/animations/ScrollStoryTimeline";
import MagneticTiltCard from "../components/animations/MagneticTiltCard";

const SAMPLE_STEPS = [
  { stepNumber: "01", tag: "Discovery", title: "Business Challenge", description: "Audit bottlenecks, legacy architecture, and conversion gaps." },
  { stepNumber: "02", tag: "Blueprint", title: "Strategy & Architecture", description: "Map scalable full-stack, cloud, and 3D interactive systems." },
  { stepNumber: "03", tag: "Experience", title: "UI/UX & 3D Design", description: "Craft futuristic Gold & Black interfaces with WebGL depth." },
  { stepNumber: "04", tag: "Execution", title: "Full-Stack Technology", description: "Engineer React, Node.js, Express, and MongoDB platforms." },
  { stepNumber: "05", tag: "Deployment", title: "Launch & QA", description: "Ship optimized, mobile-responsive builds with high Lighthouse scores." },
  { stepNumber: "06", tag: "Scale", title: "Continuous Business Growth", description: "Measure analytics, iterate features, and accelerate ROI." }
];

export default function Home({ onOpenConsultation }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 space-y-5">
          <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
            Part 2 • 3D & Animation Engine Active
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gold-gradient leading-tight">
            Custom Software & Digital Solutions to Grow Your Business
          </h1>
          <p className="text-zinc-400 text-sm md:text-base">
            Web & App Development, UI/UX Design, and Business Strategy – all tailored to your needs.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={onOpenConsultation}
              className="px-6 py-3 rounded-full bg-gold-gradient text-black font-semibold text-sm shadow-gold-sm"
            >
              Book a Free Consultation
            </button>
          </div>
        </div>
        <div className="lg:col-span-7">
          <HeroDigitalEcosystem3D />
        </div>
      </section>

      <ScrollStoryTimeline steps={SAMPLE_STEPS} />

      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-white text-center">3D Service Visualizers & Magnetic Tilt Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["web-development", "app-development", "ar-vr"].map((slug) => (
            <MagneticTiltCard key={slug} className="p-5">
              <ServiceVisualizer3D slug={slug} className="w-full h-[260px]" />
              <h3 className="text-lg font-bold text-white mt-4 capitalize">{slug.replace("-", " ")}</h3>
            </MagneticTiltCard>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-white text-center">Interactive 3D Technology Constellation</h2>
        <TechConstellation3D />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-white text-center">3D Case Study Presentation Stage</h2>
        <CaseStudyShowcase3D />
      </section>
    </div>
  );
}
