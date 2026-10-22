import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Sparkles } from "@react-three/drei";
import WebGLCanvasWrapper from "./WebGLCanvasWrapper";

/**
 * 6-Mode Interactive 3D Visualizer for Services (Sections 13 & 19):
 * - web-development: 3D layered browser & cloud stack
 * - app-development: 3D interactive smartphone device
 * - digital-marketing: 3D ascending growth bars & orbital ring
 * - ar-vr: 3D spatial torus knot portal
 * - 3d-modeling: Rotatable dual wireframe + metallic polyhedron
 * - ui-ux-design: Floating glassmorphic interface planes
 */
function ServiceModel({ slug = "web-development" }) {
  const groupRef = useRef();

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.45;
    }
  });

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[4, 5, 4]} intensity={1.6} color="#FFF3B0" />
      <pointLight position={[-4, -3, -3]} intensity={1.1} color="#D4AF37" />
      <Sparkles count={30} scale={4.5} size={1.6} speed={0.35} color="#D4AF37" />
      <OrbitControls enableZoom={false} enablePan={false} />

      <Float speed={2} rotationIntensity={0.35} floatIntensity={0.55}>
        <group ref={groupRef}>
          {slug === "web-development" && (
            <group>
              {/* Main Browser Frame */}
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[2.6, 1.65, 0.12]} />
                <meshStandardMaterial color="#141418" metalness={0.8} roughness={0.2} />
              </mesh>
              {/* Gold Header Bar */}
              <mesh position={[0, 0.65, 0.08]}>
                <boxGeometry args={[2.4, 0.2, 0.06]} />
                <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.15} />
              </mesh>
              {/* Floating Code Blocks */}
              <mesh position={[-0.6, -0.1, 0.22]}>
                <boxGeometry args={[0.95, 0.85, 0.08]} />
                <meshStandardMaterial color="#D4AF37" emissive="#8A6B10" emissiveIntensity={0.3} metalness={0.85} roughness={0.2} />
              </mesh>
              <mesh position={[0.6, -0.1, 0.32]}>
                <boxGeometry args={[1.05, 0.85, 0.08]} />
                <meshStandardMaterial color="#F3E5AB" metalness={0.9} roughness={0.15} wireframe />
              </mesh>
            </group>
          )}

          {slug === "app-development" && (
            <group>
              {/* 3D Smartphone Body */}
              <mesh>
                <boxGeometry args={[1.35, 2.65, 0.16]} />
                <meshStandardMaterial color="#111115" metalness={0.9} roughness={0.15} />
              </mesh>
              {/* Gold Bezel Rim */}
              <mesh scale={[1.04, 1.02, 0.9]}>
                <boxGeometry args={[1.35, 2.65, 0.15]} />
                <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.1} wireframe />
              </mesh>
              {/* Floating App UI Cards */}
              <mesh position={[0, 0.5, 0.2]}>
                <boxGeometry args={[1.05, 0.55, 0.06]} />
                <meshStandardMaterial color="#D4AF37" metalness={0.85} roughness={0.2} />
              </mesh>
              <mesh position={[0, -0.25, 0.28]}>
                <boxGeometry args={[1.05, 0.65, 0.06]} />
                <meshStandardMaterial color="#F3E5AB" metalness={0.8} roughness={0.25} />
              </mesh>
            </group>
          )}

          {slug === "digital-marketing" && (
            <group position={[0, -0.6, 0]}>
              {/* Ascending 3D Analytics Bars */}
              {[
                { x: -0.9, h: 0.8, c: "#8A6B10" },
                { x: -0.3, h: 1.3, c: "#D4AF37" },
                { x: 0.3, h: 1.85, c: "#D4AF37" },
                { x: 0.9, h: 2.4, c: "#FFF3B0" }
              ].map((bar, i) => (
                <mesh key={i} position={[bar.x, bar.h / 2, 0]}>
                  <boxGeometry args={[0.38, bar.h, 0.38]} />
                  <meshStandardMaterial color={bar.c} metalness={0.85} roughness={0.18} />
                </mesh>
              ))}
              {/* Orbiting Growth Ring */}
              <mesh position={[0, 1.2, 0]} rotation={[Math.PI / 3, 0.3, 0]}>
                <torusGeometry args={[1.65, 0.03, 16, 80]} />
                <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={0.4} />
              </mesh>
            </group>
          )}

          {slug === "ar-vr" && (
            <group>
              <mesh>
                <torusKnotGeometry args={[1.05, 0.28, 128, 32]} />
                <meshStandardMaterial
                  color="#D4AF37"
                  emissive="#8A6B10"
                  emissiveIntensity={0.35}
                  metalness={0.92}
                  roughness={0.12}
                />
              </mesh>
              <mesh scale={1.45}>
                <sphereGeometry args={[1.1, 16, 16]} />
                <meshStandardMaterial color="#F3E5AB" wireframe transparent opacity={0.25} />
              </mesh>
            </group>
          )}

          {slug === "3d-modeling" && (
            <group>
              <mesh>
                <dodecahedronGeometry args={[1.35, 0]} />
                <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.15} />
              </mesh>
              <mesh scale={1.25}>
                <dodecahedronGeometry args={[1.35, 1]} />
                <meshStandardMaterial color="#FFF3B0" wireframe transparent opacity={0.5} />
              </mesh>
            </group>
          )}

          {slug === "ui-ux-design" && (
            <group>
              <mesh position={[-0.35, 0.25, -0.2]} rotation={[0, 0.2, 0]}>
                <boxGeometry args={[1.9, 1.25, 0.08]} />
                <meshStandardMaterial color="#1F1F26" metalness={0.7} roughness={0.25} />
              </mesh>
              <mesh position={[0.25, -0.15, 0.2]} rotation={[0, -0.15, 0]}>
                <boxGeometry args={[1.75, 1.15, 0.08]} />
                <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.15} />
              </mesh>
              <mesh position={[0, 0, 0.5]}>
                <torusGeometry args={[0.55, 0.04, 16, 64]} />
                <meshStandardMaterial color="#FFF3B0" metalness={0.95} roughness={0.1} />
              </mesh>
            </group>
          )}
        </group>
      </Float>
    </>
  );
}

export default function ServiceVisualizer3D({
  slug = "web-development",
  className = "w-full h-[320px] md:h-[380px]"
}) {
  return (
    <WebGLCanvasWrapper
      className={className}
      camera={{ position: [0, 0, 5.2], fov: 45 }}
      fallbackTitle={`3D ${slug.replace("-", " ").toUpperCase()} Visualizer`}
      fallbackSubtitle="Interactive 3D service preview."
    >
      <ServiceModel slug={slug} />
    </WebGLCanvasWrapper>
  );
}
