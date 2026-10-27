import React, { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles, Stars, Line, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import WebGLCanvasWrapper from "./WebGLCanvasWrapper";
import useDevicePerformance from "../../hooks/useDevicePerformance";

const ECOSYSTEM_NODES = [
  { id: "strategy", label: "Business Strategy", metric: "3.4x ROI", position: [2.2, 1.05, 0.4], color: "#D4AF37" },
  { id: "web", label: "Full-Stack Cloud", metric: "<0.9s Load", position: [-2.25, 0.9, 0.5], color: "#FFF3B0" },
  { id: "mobile", label: "Mobile Ecosystems", metric: "60fps UI", position: [1.85, -1.25, 0.65], color: "#D4AF37" },
  { id: "ai", label: "AI & Automation", metric: "LLM + RAG", position: [-1.8, -1.3, -0.4], color: "#FFF3B0" },
  { id: "xr", label: "3D & AR/VR Spatial", metric: "WebGL 2.0", position: [0.15, 2.15, -0.5], color: "#D4AF37" },
  { id: "growth", label: "Digital Growth", metric: "+240% Leads", position: [-0.25, -2.05, 0.45], color: "#FFF3B0" }
];

function ParticleWaveMatrix({ isLowPower }) {
  const pointsRef = useRef();
  const gridCount = isLowPower ? 14 : 22;

  const { positions, initialPositions } = useMemo(() => {
    const total = gridCount * gridCount;
    const pos = new Float32Array(total * 3);
    const init = new Float32Array(total * 3);
    let idx = 0;
    for (let i = 0; i < gridCount; i++) {
      for (let j = 0; j < gridCount; j++) {
        const x = (i - gridCount / 2) * 0.36;
        const z = (j - gridCount / 2) * 0.36;
        const y = -2.1;
        pos[idx] = x;
        pos[idx + 1] = y;
        pos[idx + 2] = z;
        init[idx] = x;
        init[idx + 1] = y;
        init[idx + 2] = z;
        idx += 3;
      }
    }
    return { positions: pos, initialPositions: init };
  }, [gridCount]);

  useFrame(({ clock, pointer }) => {
    if (!pointsRef.current) return;
    const t = clock.elapsedTime;
    const posAttr = pointsRef.current.geometry.attributes.position;
    const arr = posAttr.array;

    for (let i = 0; i < arr.length; i += 3) {
      const x = initialPositions[i];
      const z = initialPositions[i + 2];
      const dist = Math.sqrt((x - pointer.x * 2.5) ** 2 + (z - pointer.y * 2.5) ** 2);
      arr[i + 1] =
        -2.15 +
        Math.sin(x * 1.4 + t * 1.8) * 0.18 +
        Math.cos(z * 1.4 + t * 1.5) * 0.18 +
        Math.max(0, 0.45 - dist * 0.25);
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.048}
        color="#D4AF37"
        transparent
        opacity={0.65}
        sizeAttenuation
      />
    </points>
  );
}

function QuantumEcosystemScene({ isLowPower, activeNode, onSelectNode, viewMode }) {
  const groupRef = useRef();
  const coreRef = useRef();
  const innerCoreRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();
  const [hoveredCore, setHoveredCore] = useState(false);

  const connectionLines = useMemo(() => {
    return ECOSYSTEM_NODES.map((node) => ({
      id: node.id,
      points: [new THREE.Vector3(0, 0, 0), new THREE.Vector3(...node.position)]
    }));
  }, []);

  useFrame((state, delta) => {
    const { pointer } = state;
    if (groupRef.current) {
      const targetY =
        viewMode === "matrix"
          ? pointer.x * 0.7 + state.clock.elapsedTime * 0.22
          : pointer.x * 0.55 + state.clock.elapsedTime * 0.14;
      const targetX = viewMode === "matrix" ? 0.38 - pointer.y * 0.25 : -pointer.y * 0.32;

      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.05);
    }

    if (coreRef.current) {
      coreRef.current.rotation.z += delta * (hoveredCore ? 0.9 : 0.3);
      coreRef.current.rotation.x += delta * 0.2;
    }
    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.y -= delta * 0.6;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.42;
      ring1Ref.current.rotation.y += delta * 0.25;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.35;
      ring2Ref.current.rotation.x += delta * 0.18;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <>
      <ambientLight intensity={0.75} />
      <directionalLight position={[5, 6, 5]} intensity={1.8} color="#FFF3B0" />
      <pointLight position={[-5, -3, -2]} intensity={1.4} color="#D4AF37" />

      <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} />

      {!isLowPower && (
        <Stars radius={38} depth={30} count={700} factor={2.6} saturation={0} fade speed={1.2} />
      )}
      <Sparkles
        count={isLowPower ? 30 : 80}
        scale={6.5}
        size={2.4}
        speed={0.45}
        color="#D4AF37"
      />

      {/* Undulating 3D Gold Particle Wave Matrix */}
      <ParticleWaveMatrix isLowPower={isLowPower} />

      <group ref={groupRef}>
        <Float speed={2.2} rotationIntensity={0.4} floatIntensity={0.55}>
          {/* Outer Morphing Metallic Gold Core */}
          <mesh
            ref={coreRef}
            onPointerOver={() => setHoveredCore(true)}
            onPointerOut={() => setHoveredCore(false)}
            scale={hoveredCore ? 1.15 : 1.02}
          >
            <icosahedronGeometry args={[0.98, 4]} />
            <MeshDistortMaterial
              color="#D4AF37"
              emissive="#8A6B10"
              emissiveIntensity={hoveredCore ? 0.75 : 0.35}
              metalness={0.92}
              roughness={0.14}
              distort={viewMode === "quantum" ? 0.44 : 0.26}
              speed={2.6}
            />
          </mesh>

          {/* Inner Counter-Rotating Obsidian Wireframe Core */}
          <mesh ref={innerCoreRef} scale={1.34}>
            <dodecahedronGeometry args={[0.95, 1]} />
            <meshStandardMaterial
              color="#FFF3B0"
              wireframe
              transparent
              opacity={0.38}
            />
          </mesh>
        </Float>

        {/* 3 Counter-Rotating Gyroscopic Rings */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[1.75, 0.018, 16, 120]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.1} />
        </mesh>

        <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[2.22, 0.014, 16, 120]} />
          <meshStandardMaterial
            color="#F3E5AB"
            metalness={0.88}
            roughness={0.18}
            transparent
            opacity={0.6}
          />
        </mesh>

        <mesh ref={ring3Ref} rotation={[Math.PI / 6, Math.PI / 4, 0]}>
          <torusGeometry args={[2.62, 0.01, 16, 120]} />
          <meshStandardMaterial
            color="#D4AF37"
            metalness={0.9}
            roughness={0.2}
            transparent
            opacity={0.35}
          />
        </mesh>

        {/* Synaptic Energy Lines */}
        {connectionLines.map((line) => {
          const isSelected = activeNode === line.id;
          return (
            <Line
              key={line.id}
              points={line.points}
              color={isSelected ? "#FFF3B0" : "#D4AF37"}
              lineWidth={isSelected ? 2 : 1}
              transparent
              opacity={isSelected ? 0.85 : 0.32}
            />
          );
        })}

        {/* Orbiting 3D Satellite Nodes */}
        {ECOSYSTEM_NODES.map((node) => {
          const isSelected = activeNode === node.id;
          return (
            <Float
              key={node.id}
              speed={2}
              rotationIntensity={0.6}
              floatIntensity={0.5}
              position={node.position}
            >
              <group
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectNode(node.id);
                }}
                onPointerOver={() => onSelectNode(node.id)}
              >
                <mesh scale={isSelected ? 1.45 : 1}>
                  <octahedronGeometry args={[0.22, 0]} />
                  <meshStandardMaterial
                    color={isSelected ? "#FFF3B0" : node.color}
                    emissive={node.color}
                    emissiveIntensity={isSelected ? 0.95 : 0.4}
                    metalness={0.9}
                    roughness={0.12}
                  />
                </mesh>
                {isSelected && (
                  <mesh scale={1.9}>
                    <sphereGeometry args={[0.2, 16, 16]} />
                    <meshStandardMaterial
                      color="#D4AF37"
                      wireframe
                      transparent
                      opacity={0.45}
                    />
                  </mesh>
                )}
              </group>
            </Float>
          );
        })}
      </group>
    </>
  );
}

export default function HeroDigitalEcosystem3D({ className }) {
  const { isLowPower } = useDevicePerformance();
  const [activeNode, setActiveNode] = useState("strategy");
  const [viewMode, setViewMode] = useState("orbit");

  const currentNode =
    ECOSYSTEM_NODES.find((n) => n.id === activeNode) || ECOSYSTEM_NODES[0];

  return (
    <div className="relative rounded-3xl glass-panel metallic-border p-3 md:p-4 shadow-gold-md">
      {/* Top 3D Viewport Camera Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 border-b border-zinc-800/80 mb-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-gold animate-ping" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-goldLight">
            WebGL 3D Engine • Drag to Orbit
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {[
            { id: "orbit", label: "3D Ecosystem" },
            { id: "matrix", label: "Wave Matrix" },
            { id: "quantum", label: "Quantum Core" }
          ].map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setViewMode(m.id)}
              className={`px-2.5 py-1 rounded-full text-[10px] font-mono transition-all ${
                viewMode === m.id
                  ? "bg-gold-gradient text-black font-bold"
                  : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <WebGLCanvasWrapper
        className={className || "w-full h-[380px] lg:h-[440px]"}
        camera={{ position: [0, 0.2, 6.2], fov: 45 }}
        fallbackTitle="Riyadvi 3D Digital Transformation Ecosystem"
        fallbackSubtitle="Interactive node network connecting Strategy, Web, Mobile, AI, and 3D Spatial Solutions."
      >
        <QuantumEcosystemScene
          isLowPower={isLowPower}
          activeNode={activeNode}
          onSelectNode={setActiveNode}
          viewMode={viewMode}
        />
      </WebGLCanvasWrapper>

      {/* Integrated Bottom 3D Node Telemetry HUD (Zero Z-Index Bleed Over Modals!) */}
      <div className="mt-2 pt-3 border-t border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-2">
        <div className="flex items-center gap-2.5">
          <span className="px-2.5 py-1 rounded-lg bg-brand-gold/15 border border-brand-gold/40 text-brand-gold font-mono text-xs font-bold">
            {currentNode.metric}
          </span>
          <div>
            <p className="text-xs font-bold text-white">{currentNode.label}</p>
            <p className="text-[10px] text-zinc-400">Active 3D Node • Click pills to inspect</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {ECOSYSTEM_NODES.map((node) => (
            <button
              key={node.id}
              type="button"
              onClick={() => setActiveNode(node.id)}
              className={`px-2.5 py-1 rounded-full text-[10px] font-medium transition-all ${
                activeNode === node.id
                  ? "bg-brand-gold text-black font-bold shadow-gold-sm"
                  : "bg-zinc-900/90 text-zinc-400 hover:text-white border border-zinc-800"
              }`}
            >
              {node.label.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
