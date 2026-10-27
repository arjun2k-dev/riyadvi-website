import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Sparkles } from "@react-three/drei";
import WebGLCanvasWrapper from "./WebGLCanvasWrapper";

function CaseStudyStage({ accentColor = "#D4AF37" }) {
  const stageRef = useRef();

  useFrame((_, delta) => {
    if (stageRef.current) {
      stageRef.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <>
      <ambientLight intensity={0.85} />
      <directionalLight position={[5, 6, 4]} intensity={1.6} color="#FFF3B0" />
      <pointLight position={[-4, -2, 3]} intensity={1.3} color={accentColor} />
      <Sparkles count={45} scale={5} size={2.1} speed={0.35} color={accentColor} />
      <OrbitControls enableZoom={false} enablePan={false} />

      <Float speed={1.9} rotationIntensity={0.28} floatIntensity={0.45}>
        <group ref={stageRef}>
          <mesh position={[0, -1.35, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.95, 0.035, 16, 100]} />
            <meshStandardMaterial color={accentColor} metalness={0.92} roughness={0.1} />
          </mesh>

          <mesh position={[-0.25, 0.1, 0]}>
            <boxGeometry args={[2.5, 1.55, 0.1]} />
            <meshStandardMaterial color="#121217" metalness={0.85} roughness={0.2} />
          </mesh>
          <mesh position={[-0.25, 0.1, 0.06]}>
            <planeGeometry args={[2.3, 1.35]} />
            <meshStandardMaterial
              color={accentColor}
              emissive={accentColor}
              emissiveIntensity={0.25}
              metalness={0.75}
              roughness={0.2}
            />
          </mesh>

          <mesh position={[1.25, -0.25, 0.45]} rotation={[0, -0.35, 0]}>
            <boxGeometry args={[0.75, 1.45, 0.08]} />
            <meshStandardMaterial color="#0A0A0C" metalness={0.9} roughness={0.15} />
          </mesh>
          <mesh position={[1.25, -0.25, 0.5]} rotation={[0, -0.35, 0]}>
            <planeGeometry args={[0.65, 1.3]} />
            <meshStandardMaterial color="#F3E5AB" metalness={0.85} roughness={0.2} />
          </mesh>
        </group>
      </Float>
    </>
  );
}

export default function CaseStudyShowcase3D({
  projectTitle = "Laxmi Astro AI",
  metricLabel = "+240% User Engagement",
  accentColor = "#D4AF37"
}) {
  return (
    <div className="glass-panel metallic-border rounded-3xl p-4">
      <WebGLCanvasWrapper
        className="w-full h-[340px] md:h-[400px]"
        camera={{ position: [0, 0.3, 5.5], fov: 45 }}
        fallbackTitle={`${projectTitle} — 3D Interactive Case Study`}
        fallbackSubtitle={`Outcome: ${metricLabel}`}
      >
        <CaseStudyStage accentColor={accentColor} />
      </WebGLCanvasWrapper>

      <div className="mt-2 px-3 py-2 border-t border-zinc-800/80 flex items-center justify-between text-xs">
        <span className="font-bold text-white">{projectTitle} • 3D Device Twin</span>
        <span className="px-3 py-0.5 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-gold font-mono font-semibold">
          {metricLabel}
        </span>
      </div>
    </div>
  );
}
