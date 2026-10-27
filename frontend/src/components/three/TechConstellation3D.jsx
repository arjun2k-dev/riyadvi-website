import React, { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Sparkles, Line } from "@react-three/drei";
import * as THREE from "three";
import WebGLCanvasWrapper from "./WebGLCanvasWrapper";

const TECH_ITEMS = [
  { name: "React.js", category: "Frontend UI", desc: "Component-driven interactive web interfaces" },
  { name: "Next.js", category: "Full-Stack React", desc: "SSR, SSG & edge-optimized web applications" },
  { name: "Node.js", category: "Backend Runtime", desc: "High-concurrency event-driven server architecture" },
  { name: "MongoDB", category: "NoSQL Database", desc: "Flexible document models & scalable aggregations" },
  { name: "MySQL", category: "Relational DB", desc: "ACID-compliant transactional data integrity" },
  { name: "JavaScript", category: "Core Language", desc: "End-to-end ES2024+ full-stack engineering" },
  { name: "Three.js", category: "3D WebGL", desc: "Real-time GPU shaders, lighting & 3D scenes" },
  { name: "React Three Fiber", category: "3D React", desc: "Declarative 3D ecosystems synchronized with React state" },
  { name: "GSAP", category: "Motion Engine", desc: "ScrollTrigger storytelling & timeline choreography" },
  { name: "TailwindCSS", category: "Design System", desc: "Utility-first responsive luxury interfaces" },
  { name: "WordPress", category: "Headless & CMS", desc: "Enterprise content publishing & custom themes" },
  { name: "Express.js", category: "REST API", desc: "Secure, validated API middleware & lead routing" }
];

function ConstellationScene({ selectedTech, onSelectTech }) {
  const groupRef = useRef();
  const ringRef = useRef();

  const nodes = useMemo(() => {
    const count = TECH_ITEMS.length;
    const radius = 2.35;
    return TECH_ITEMS.map((item, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);
      return { ...item, position: [x, y, z] };
    });
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.18;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.25;
      ringRef.current.rotation.x += delta * 0.15;
    }
  });

  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[5, 5, 5]} intensity={1.6} color="#D4AF37" />
      <Sparkles count={55} scale={6} size={2} speed={0.35} color="#F3E5AB" />

      <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.6} />

      <group ref={groupRef}>
        <mesh>
          <sphereGeometry args={[1.15, 24, 24]} />
          <meshStandardMaterial color="#D4AF37" wireframe transparent opacity={0.22} />
        </mesh>

        <mesh ref={ringRef}>
          <torusGeometry args={[2.55, 0.015, 16, 100]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.15} />
        </mesh>

        {nodes.map((node) => {
          const isActive = selectedTech.name === node.name;
          return (
            <group key={node.name}>
              <Line
                points={[new THREE.Vector3(0, 0, 0), new THREE.Vector3(...node.position)]}
                color={isActive ? "#FFF3B0" : "#52525b"}
                lineWidth={isActive ? 2.2 : 0.9}
                transparent
                opacity={isActive ? 0.9 : 0.35}
              />
              <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.4} position={node.position}>
                <mesh
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectTech(node);
                  }}
                  onPointerOver={() => onSelectTech(node)}
                  scale={isActive ? 1.55 : 1}
                >
                  <dodecahedronGeometry args={[0.22, 0]} />
                  <meshStandardMaterial
                    color={isActive ? "#FFF3B0" : "#D4AF37"}
                    emissive="#D4AF37"
                    emissiveIntensity={isActive ? 0.95 : 0.35}
                    metalness={0.88}
                    roughness={0.18}
                  />
                </mesh>
              </Float>
            </group>
          );
        })}
      </group>
    </>
  );
}

export default function TechConstellation3D() {
  const [selectedTech, setSelectedTech] = useState(TECH_ITEMS[0]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      <div className="lg:col-span-7 glass-panel metallic-border rounded-3xl p-4">
        <WebGLCanvasWrapper
          className="w-full h-[380px] md:h-[440px]"
          camera={{ position: [0, 0, 6.4], fov: 45 }}
          fallbackTitle="3D Technology Constellation"
          fallbackSubtitle="Interactive sphere of React, Next.js, Node.js, MongoDB, Three.js, and GSAP."
        >
          <ConstellationScene selectedTech={selectedTech} onSelectTech={setSelectedTech} />
        </WebGLCanvasWrapper>

        <div className="mt-2 px-3 py-2 border-t border-zinc-800/80 flex items-center justify-between text-xs">
          <span className="text-brand-gold font-mono font-bold">
            ● Active Node: {selectedTech.name} ({selectedTech.category})
          </span>
          <span className="text-zinc-500 text-[11px]">Click 3D Polyhedrons or Pills</span>
        </div>
      </div>

      <div className="lg:col-span-5 glass-panel metallic-border rounded-3xl p-6 md:p-8 space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full border border-brand-gold/30">
            {selectedTech.category}
          </span>
          <span className="text-xs text-zinc-500">360° Interactive Sphere</span>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-white">{selectedTech.name}</h3>
          <p className="text-sm text-zinc-400 mt-2 leading-relaxed">{selectedTech.desc}</p>
        </div>

        <div className="pt-4 border-t border-zinc-800/80">
          <p className="text-xs uppercase tracking-wider text-zinc-500 mb-3 font-semibold">
            Select Technology Node
          </p>
          <div className="flex flex-wrap gap-2">
            {TECH_ITEMS.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setSelectedTech(item)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  selectedTech.name === item.name
                    ? "bg-gold-gradient text-black font-semibold shadow-gold-sm"
                    : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
