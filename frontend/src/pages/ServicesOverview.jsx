import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Sparkles, Database } from "lucide-react";
import { useContent } from "../context/ContentContext";
import ServiceVisualizer3D from "../components/three/ServiceVisualizer3D";
import MagneticTiltCard from "../components/animations/MagneticTiltCard";

export default function ServicesOverview() {
  const { services, telemetry } = useContent();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-gold text-brand-goldLight text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
          <span>Enterprise Digital Solutions • {services.length} Core Practices</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white">
          Core <span className="text-gold-gradient">Digital Solutions</span>
        </h1>
        <p className="text-zinc-400 text-sm md:text-base">
          Every practice combines custom full-stack engineering, interactive 3D WebGL visualization, and measurable business growth outcomes.
        </p>
        <div className="inline-flex items-center gap-2 text-[11px] text-zinc-400 font-mono">
          <Database className="w-3.5 h-3.5 text-brand-gold" />
          <span>Cloud-Native Dynamic Architecture • {services.length} Verified Capabilities</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <MagneticTiltCard key={service.slug} className="p-6 md:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-brand-gold px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/30">
                  0{index + 1} • {service.visualType || service.badge || "3D Interactive"}
                </span>
                <Link
                  to={`/services/${service.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-gold hover:underline"
                >
                  <span>Explore Service</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              <ServiceVisualizer3D slug={service.slug} variant={service.visualType} />

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">{service.title}</h2>
                <p className="text-xs text-brand-goldLight font-medium mt-1">{service.tagline}</p>
                <p className="text-sm text-zinc-400 mt-3 leading-relaxed">
                  {service.heroDescription || service.shortDescription}
                </p>
              </div>
            </div>

            <div className="pt-5 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-1.5">
                {(service.techStack || service.technologies || []).slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md text-[11px] bg-zinc-900 border border-zinc-800 text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <Link
                to={`/services/${service.slug}`}
                className="px-4 py-2 rounded-full bg-gold-gradient text-black font-bold text-xs shadow-gold-sm"
              >
                Full Service Blueprint
              </Link>
            </div>
          </MagneticTiltCard>
        ))}
      </div>
    </div>
  );
}