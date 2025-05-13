import Lenis from "lenis";
import { useEffect, useRef } from "react";

export const useSmoothScroll = (options = {}) => {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothTouch: false,
      touchMultiplier: 1,
      syncTouch: true,
      wheelMultiplier: 1,
      lerp: 0.1,
      smoothWheel: true,
      syncTouchLerp: 0.1,
      ...options,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [options]);

  return lenisRef;
};
