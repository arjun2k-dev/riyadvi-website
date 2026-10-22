import React from "react";
import { useParams, Link } from "react-router-dom";

export default function CareersHub({ onOpenConsultation }) {
  const params = useParams();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="glass-panel metallic-border rounded-3xl p-8 md:p-14">
        <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
          Part 1 Route Verified
        </span>
        <h1 className="text-3xl md:text-5xl font-bold text-gold-gradient mt-3">
          Careers at Riyadvi Software Technologies
        </h1>
        {Object.keys(params).length > 0 && (
          <p className="mt-3 text-xs font-mono text-brand-goldLight bg-brand-gold/10 inline-block px-3 py-1 rounded-full border border-brand-gold/30">
            Route Params: {JSON.stringify(params)}
          </p>
        )}
        <p className="text-zinc-400 mt-4 max-w-2xl leading-relaxed">
          Part 4 will populate the dynamic job board with department, designation, and experience filters.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {onOpenConsultation && (
            <button
              onClick={onOpenConsultation}
              className="px-6 py-3 rounded-full bg-gold-gradient text-black font-semibold text-sm shadow-gold-sm"
            >
              Book a Free Consultation
            </button>
          )}
          <Link
            to="/services"
            className="px-6 py-3 rounded-full border border-brand-gold/40 text-brand-goldLight hover:bg-brand-gold/10 text-sm font-medium"
          >
            Explore Services
          </Link>
        </div>
      </div>
    </section>
  );
}
