import React, { useState } from "react";
import { motion } from "framer-motion";

/**
 * Framer Motion 3D Perspective Tilt + Cursor Spotlight Card (Section 8 Motion micro-interactions)
 */
export default function MagneticTiltCard({ children, className = "" }) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [Hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotate.x,
        rotateY: rotate.y,
        scale: Hovered ? 1.015 : 1
      }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      style={{ transformStyle: "preserve-3d" }}
      className={`glass-panel metallic-border rounded-3xl transition-shadow duration-300 ${
        Hovered ? "shadow-gold-md" : ""
      } ${className}`}
    >
      {children}
    </motion.div>
  );
}
