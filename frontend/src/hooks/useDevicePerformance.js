import { useState, useEffect } from "react";

function computeProfile() {
  if (typeof window === "undefined") {
    return { isMobile: false, isLowPower: false, dpr: [1, 1.5] };
  }
  const isMobile = window.innerWidth < 768;
  const cores = navigator.hardwareConcurrency || 4;
  const prefersReducedMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isLowPower = isMobile || cores <= 4 || prefersReducedMotion;
  return {
    isMobile,
    isLowPower,
    dpr: [1, 1.5]
  };
}

export default function useDevicePerformance() {
  const [profile, setProfile] = useState(computeProfile);

  useEffect(() => {
    const handleResize = () => {
      const next = computeProfile();
      setProfile((prev) =>
        prev.isMobile === next.isMobile && prev.isLowPower === next.isLowPower ? prev : next
      );
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return profile;
}