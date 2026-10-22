import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Html, OrbitControls, Sparkles } from "@react-three/drei";
import WebGLCanvasWrapper from "./WebGLCanvasWrapper";

/**
 * Interactive 3D Case Study Presentation Stage (Section 18 requirement:
 * "At least one case study should use an interactive/3D presentation.")
 */
function CaseStudyStage({ projectTitle, metricLabel, accentColor = "#D4AF37" }) {
  const stageRef = useRef();

  useFrame((_, delta) => {
    if (stageRef.current) {
      stageRef.current.rotation.y += delta * 0.22;
    }
  });

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 6, 4]} intensity={1.5} color="#FFF3B0" />
      <pointLight position={[-4, -2, 3]} intensity={1.2} color={accentColor} />
      <Sparkles count={35} scale={5} size={2} speed={0.3} color={accentColor} />
      <OrbitControls enableZoom={false} enablePan={false} />

      <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.45}>
        <group ref={stageRef}>
          {/* Pedestal Ring */}
          <mesh position={[0, -1.35, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.9, 0.03, 16, 100]} />
            <meshStandardMaterial color={accentColor} metalness={0.9} roughness={0.1} />
          </mesh>

          {/* Primary Desktop Display Screen */}
          <mesh position={[-0.25, 0.1, 0]}>
            <boxGeometry args={[2.5, 1.55, 0.1]} />
            <meshStandardMaterial color="#121217" metalness={0.85} roughness={0.2} />
          </mesh>
          <mesh position={[-0.25, 0.1, 0.06]}>
            <planeGeometry args={[2.3, 1.35]} />
            <meshStandardMaterial
              color={accentColor}
              emissive={accentColor}
              emissiveIntensity={0.22}
              metalness={0.7}
              roughness={0.25}
            />
          </mesh>

          {/* Secondary Mobile Device Companion */}
          <mesh position={[1.25, -0.25, 0.45]} rotation={[0, -0.35, 0]}>
            <boxGeometry args={[0.75, 1.45, 0.08]} />
            <meshStandardMaterial color="#0A0A0C" metalness={0.9} roughness={0.15} />
          </mesh>
          <mesh position={[1.25, -0.25, 0.5]} rotation={[0, -0.35, 0]}>
            <planeGeometry args={[0.65, 1.3]} />
            <meshStandardMaterial color="#F3E5AB" metalness={0.85} roughness={0.2} />
          </mesh>

          {/* Floating Live Outcome Badge */}
          <Html position={[0, 1.25, 0]} center distanceFactor={8}>
            <div className="px-3.5 py-1.5 rounded-full bg-black/90 border border-brand-gold text-brand-goldLight text-xs font-semibold whitespace-nowrap shadow-gold-sm">
              {projectTitle} • {metricLabel}
            </div>
          </Html>
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
    <WebGLCanvasWrapper
      className="w-full h-[380px] md:h-[460px]"
      camera={{ position: [0, 0.3, 5.5], fov: 45 }}
      fallbackTitle={`${projectTitle} — 3D Interactive Case Study`}
      fallbackSubtitle={`Outcome: ${metricLabel}`}
    >
      <CaseStudyStage
        projectTitle={projectTitle}
        metricLabel={metricLabel}
        accentColor={accentColor}
      />
    </WebGLCanvasWrapper>
  );
}
