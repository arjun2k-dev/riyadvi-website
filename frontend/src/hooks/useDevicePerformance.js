import { useState, useEffect } from "react";

export default function useDevicePerformance() {
  const [profile, setProfile] = useState({
    isMobile: false,
    isLowPower: false,
    dpr: [1, 1.5]
  });

  useEffect(() => {
    const checkDevice = () => {
      const isMobile = window.innerWidth < 768;
      const cores = navigator.hardwareConcurrency || 4;
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isLowPower = isMobile || cores <= 4 || prefersReducedMotion;

      setProfile({
        isMobile,
        isLowPower,
        dpr: isLowPower ? [1, 1] : [1, 2]
      });
    };

    checkDevice();
    window.addEventListener("resize", checkDevice, { passive: true });
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  return profile;
}
