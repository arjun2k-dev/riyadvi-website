import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { SERVICES_DATA } from "../data/servicesData";
import ServiceVisualizer3D from "../components/three/ServiceVisualizer3D";
import MagneticTiltCard from "../components/animations/MagneticTiltCard";

export default function ServicesOverview() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-gold text-brand-goldLight text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
          <span>Reusable Dynamic Service Architecture</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white">
          Six Core <span className="text-gold-gradient">Digital Solutions</span>
        </h1>
        <p className="text-zinc-400 text-sm md:text-base">
          Every practice combines custom engineering, interactive 3D visualization, and measurable business growth outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {SERVICES_DATA.map((service, index) => (
          <MagneticTiltCard key={service.slug} className="p-6 md:p-8 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-brand-gold">
                  0{index + 1} • {service.visualType}
                </span>
                <Link
                  to={`/services/${service.slug}`}
                  className="px-3.5 py-1.5 rounded-full bg-gold-gradient text-black font-bold text-xs flex items-center gap-1"
                >
                  <span>Explore Service</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <ServiceVisualizer3D slug={service.slug} className="w-full h-[260px]" />

              <div>
                <h2 className="text-2xl font-bold text-white">{service.title}</h2>
                <p className="text-xs text-brand-goldLight mt-1">{service.tagline}</p>
                <p className="text-sm text-zinc-400 mt-3 leading-relaxed">
                  {service.heroDescription}
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-1.5">
                {service.techStack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg text-[11px] bg-zinc-900 text-zinc-300 border border-zinc-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <Link
                to={`/services/${service.slug}`}
                className="text-xs font-semibold text-brand-gold hover:underline flex items-center gap-1"
              >
                <span>View Full Architecture</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </MagneticTiltCard>
        ))}
      </div>
    </div>
  );
}
