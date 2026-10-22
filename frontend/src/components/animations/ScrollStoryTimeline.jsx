import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Reusable GSAP ScrollTrigger Storytelling Timeline (Sections 12, 15, 20):
 * Animates a glowing gold vertical beam and staggered step cards as the user scrolls.
 */
export default function ScrollStoryTimeline({
  badge = "Interactive Process",
  title = "Digital Transformation Journey",
  subtitle = "How Riyadvi turns complex business challenges into measurable digital growth.",
  steps = []
}) {
  const sectionRef = useRef(null);
  const progressLineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate vertical gold progress beam with ScrollTrigger scrub
      if (progressLineRef.current) {
        gsap.fromTo(
          progressLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 65%",
              end: "bottom 75%",
              scrub: 0.6
            }
          }
        );
      }

      // Reveal each milestone/transformation card as it enters viewport
      const cards = gsap.utils.toArray(".story-step-card");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0.2, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 82%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [steps]);

  return (
    <div ref={sectionRef} className="relative py-16">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
          {badge}
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-white mt-3">{title}</h2>
        <p className="text-zinc-400 mt-4 text-sm md:text-base">{subtitle}</p>
      </div>

      <div className="relative max-w-5xl mx-auto px-4">
        {/* Background Track Line */}
        <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 bg-zinc-800" />

        {/* GSAP Scrubbed Gold Progress Beam */}
        <div
          ref={progressLineRef}
          className="absolute left-8 md:left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 bg-gold-gradient origin-top shadow-gold-sm"
        />

        <div className="space-y-12">
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={step.title || index}
                className={`story-step-card relative flex flex-col md:flex-row items-start ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                } gap-8`}
              >
                {/* Step Node Marker */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-black border-2 border-brand-gold flex items-center justify-center text-xs font-mono font-bold text-brand-gold shadow-gold-sm z-10">
                  {step.stepNumber || String(index + 1).padStart(2, "0")}
                </div>

                {/* Content Card */}
                <div className="w-full md:w-[calc(50%-2.5rem)] pl-16 md:pl-0">
                  <div className="glass-panel metallic-border rounded-2xl p-6 md:p-7 hover:shadow-gold-sm transition-shadow">
                    {step.tag && (
                      <span className="text-[11px] font-mono uppercase tracking-widest text-brand-gold">
                        {step.tag}
                      </span>
                    )}
                    <h3 className="text-xl font-bold text-white mt-1">{step.title}</h3>
                    <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                      {step.description}
                    </p>
                    {step.deliverables && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {step.deliverables.map((item) => (
                          <span
                            key={item}
                            className="px-2.5 py-1 rounded-full text-[11px] bg-zinc-900 text-zinc-300 border border-zinc-800"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
