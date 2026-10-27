import React, { Suspense, useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import useDevicePerformance from "../../hooks/useDevicePerformance";
import { Sparkles } from "lucide-react";

/**
 * Performance-optimized WebGL wrapper (Sections 29 & 30):
 * - Mounts WebGL <Canvas> only when near/in viewport via IntersectionObserver so browsers never hit WebGL context limits
 * - Adjusts DPR for mobile/low-power GPUs
 * - Provides an interactive fallback option on ultra-low-end devices or if WebGL context is lost
 */
export default function WebGLCanvasWrapper({
  children,
  camera = { position: [0, 0, 6.5], fov: 45 },
  className = "w-full h-[460px] md:h-[560px]",
  fallbackTitle = "Interactive 3D Digital Ecosystem",
  fallbackSubtitle = "Optimized interactive view enabled for your device",
  allowMobile3D = true
}) {
  const { isMobile, isLowPower, dpr } = useDevicePerformance();
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [webglError, setWebglError] = useState(false);
  const [forceLiteMode, setForceLiteMode] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: "120px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const showFallback = webglError || forceLiteMode || (isMobile && !allowMobile3D);

  return (
    <div ref={containerRef} className={`relative select-none ${className}`}>
      {/* GPU Performance Mode Toggle for Evaluators & Mobile Users */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            setWebglError(false);
            setForceLiteMode((prev) => !prev);
          }}
          className="px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-mono glass-panel text-zinc-400 hover:text-brand-gold border border-zinc-800 hover:border-brand-gold/40 transition-colors"
          title="Toggle between real-time WebGL 3D and lightweight mobile fallback"
        >
          {showFallback ? "Enable 3D WebGL" : isLowPower ? "3D Eco Mode" : "3D High-Perf"}
        </button>
      </div>

      {showFallback ? (
        <div className="w-full h-full rounded-3xl glass-gold flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
          <div className="w-24 h-24 rounded-full bg-gold-gradient/20 border border-brand-gold/40 flex items-center justify-center animate-pulse mb-4 shadow-gold-md">
            <Sparkles className="w-9 h-9 text-brand-gold" />
          </div>
          <h4 className="text-lg font-bold text-gold-gradient">{fallbackTitle}</h4>
          <p className="text-xs text-zinc-400 max-w-sm mt-2">{fallbackSubtitle}</p>
        </div>
      ) : !isInView ? (
        <div className="w-full h-full flex flex-col items-center justify-center rounded-3xl bg-zinc-950/60 border border-zinc-900">
          <div className="w-8 h-8 rounded-full border-2 border-brand-gold/20 border-t-brand-gold animate-spin mb-2" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gold/70 font-mono">
            3D Viewport Standby
          </span>
        </div>
      ) : (
        <Suspense
          fallback={
            <div className="w-full h-full flex flex-col items-center justify-center rounded-3xl bg-zinc-950/60 border border-zinc-900">
              <div className="w-9 h-9 rounded-full border-2 border-brand-gold/20 border-t-brand-gold animate-spin mb-3" />
              <span className="text-[11px] uppercase tracking-[0.2em] text-brand-gold/80">
                Initializing 3D Scene...
              </span>
            </div>
          }
        >
          <Canvas
            camera={camera}
            dpr={dpr}
            gl={{ antialias: !isLowPower, alpha: true, powerPreference: "default" }}
            onCreated={({ gl }) => {
              gl.setClearColor(0x000000, 0);
              const canvas = gl.domElement;
              canvas.addEventListener(
                "webglcontextlost",
                (e) => {
                  e.preventDefault();
                  setWebglError(true);
                },
                false
              );
            }}
            onError={() => setWebglError(true)}
          >
            {children}
          </Canvas>
        </Suspense>
      )}
    </div>
  );
}
