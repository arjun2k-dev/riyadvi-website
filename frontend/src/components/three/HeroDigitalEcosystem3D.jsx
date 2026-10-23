import React, { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Html, MeshDistortMaterial, Sparkles, Stars, Line } from "@react-three/drei";
import * as THREE from "three";
import WebGLCanvasWrapper from "./WebGLCanvasWrapper";
import useDevicePerformance from "../../hooks/useDevicePerformance";

const ECOSYSTEM_NODES = [
  { id: "strategy", label: "Business Strategy", position: [2.3, 1.1, 0.4], color: "#D4AF37" },
  { id: "web", label: "Web & Cloud Architecture", position: [-2.4, 0.9, 0.5], color: "#F3E5AB" },
  { id: "mobile", label: "Mobile App Ecosystems", position: [1.9, -1.3, 0.7], color: "#D4AF37" },
  { id: "ai", label: "AI & Automation", position: [-1.8, -1.4, -0.4], color: "#F3E5AB" },
  { id: "xr", label: "3D & AR/VR Spatial", position: [0.2, 2.2, -0.6], color: "#D4AF37" },
  { id: "growth", label: "Digital Growth", position: [-0.3, -2.1, 0.5], color: "#F3E5AB" }
];

function EcosystemScene({ isLowPower }) {
  const groupRef = useRef();
  const coreRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const [hoveredCore, setHoveredCore] = useState(false);
  const [activeNode, setActiveNode] = useState("strategy");

  // Precompute synaptic connection lines from the central core to each satellite node
  const connectionLines = useMemo(() => {
    return ECOSYSTEM_NODES.map((node) => [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(...node.position)
    ]);
  }, []);

  useFrame((state, delta) => {
    const { pointer } = state;
    if (groupRef.current) {
      // Smooth cursor parallax response (Section 11 requirement)
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer.x * 0.55 + state.clock.elapsedTime * 0.12,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -pointer.y * 0.35,
        0.05
      );
    }

    if (coreRef.current) {
      coreRef.current.rotation.z += delta * (hoveredCore ? 0.8 : 0.25);
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.35;
      ring1Ref.current.rotation.y += delta * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.3;
      ring2Ref.current.rotation.x += delta * 0.15;
    }
  });

  return (
    <>
      <ambientLight intensity={0.65} />
      <directionalLight position={[5, 5, 5]} intensity={1.6} color="#FFF3B0" />
      <pointLight position={[-4, -3, -2]} intensity={1.2} color="#D4AF37" />

      {!isLowPower && (
        <Stars radius={35} depth={30} count={600} factor={2.5} saturation={0} fade speed={1} />
      )}
      <Sparkles
        count={isLowPower ? 25 : 65}
        scale={6}
        size={2.2}
        speed={0.4}
        color="#D4AF37"
      />

      <group ref={groupRef}>
        {/* Central Riyadvi Transformation Core */}
        <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
          <mesh
            ref={coreRef}
            onPointerOver={() => setHoveredCore(true)}
            onPointerOut={() => setHoveredCore(false)}
            scale={hoveredCore ? 1.12 : 1}
          >
            <icosahedronGeometry args={[1.05, 4]} />
            <MeshDistortMaterial
              color="#D4AF37"
              emissive="#8A6B10"
              emissiveIntensity={hoveredCore ? 0.65 : 0.3}
              metalness={0.9}
              roughness={0.18}
              distort={hoveredCore ? 0.38 : 0.22}
              speed={2.2}
            />
          </mesh>

          {/* Outer Wireframe Geodesic Cage */}
          <mesh scale={1.28}>
            <icosahedronGeometry args={[1.05, 1]} />
            <meshStandardMaterial
              color="#F3E5AB"
              wireframe
              transparent
              opacity={0.35}
            />
          </mesh>
        </Float>

        {/* Orbital Gyroscopic Rings */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[1.85, 0.015, 16, 100]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.1} />
        </mesh>

        <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[2.35, 0.012, 16, 100]} />
          <meshStandardMaterial
            color="#F3E5AB"
            metalness={0.85}
            roughness={0.2}
            transparent
            opacity={0.55}
          />
        </mesh>

        {/* Synaptic Connection Lines */}
        {connectionLines.map((points, idx) => (
          <Line
            key={idx}
            points={points}
            color="#D4AF37"
            lineWidth={1}
            transparent
            opacity={0.35}
          />
        ))}

        {/* Orbiting Connected Technology & Business Nodes */}
        {ECOSYSTEM_NODES.map((node) => {
          const isSelected = activeNode === node.id;
          return (
            <Float
              key={node.id}
              speed={1.8}
              rotationIntensity={0.5}
              floatIntensity={0.5}
              position={node.position}
            >
              <mesh
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveNode(node.id);
                }}
                onPointerOver={() => setActiveNode(node.id)}
                scale={isSelected ? 1.3 : 1}
              >
                <octahedronGeometry args={[0.2, 0]} />
                <meshStandardMaterial
                  color={node.color}
                  emissive={node.color}
                  emissiveIntensity={isSelected ? 0.8 : 0.35}
                  metalness={0.85}
                  roughness={0.15}
                />
              </mesh>

<Html distanceFactor={10} position={[0, 0.34, 0]} center zIndexRange={[10, 0]}>                <button
                  type="button"
                  onClick={() => setActiveNode(node.id)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-medium whitespace-nowrap transition-all ${
                    isSelected
                      ? "bg-brand-gold text-black font-semibold shadow-gold-sm scale-105"
                      : "bg-black/80 text-zinc-300 border border-brand-gold/30 hover:border-brand-gold"
                  }`}
                >
                  {node.label}
                </button>
              </Html>
            </Float>
          );
        })}
      </group>
    </>
  );
}

export default function HeroDigitalEcosystem3D({ className }) {
  const { isLowPower } = useDevicePerformance();

  return (
    <WebGLCanvasWrapper
      className={className || "w-full h-[460px] lg:h-[580px]"}
      camera={{ position: [0, 0, 6.2], fov: 45 }}
      fallbackTitle="Riyadvi 3D Digital Transformation Ecosystem"
      fallbackSubtitle="Interactive node network connecting Strategy, Web, Mobile, AI, and 3D Spatial Solutions."
    >
      <EcosystemScene isLowPower={isLowPower} />
    </WebGLCanvasWrapper>
  );
}
