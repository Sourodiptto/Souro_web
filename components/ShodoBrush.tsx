"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

/*
  ENSŌ BRUSH — Scroll-revealed ink circle background

  The real Ensō image is used for authentic brush texture — hair strands,
  ink pooling, kasure (dry brush) — impossible to replicate with SVG.
  Scroll progress controls a circular clip-path reveal, as if the brush
  is painting the circle in real time.
  mix-blend-mode: multiply lets the ink interact with the paper grain.
*/

export default function ShodoBrush() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docH > 0 ? Math.max(0, Math.min(1, window.scrollY / docH)) : 0;

        // Reveal via clip-path: conic gradient sweep simulates brush drawing the circle
        // 0% = hidden, 100% = full circle
        const degrees = progress * 360;
        wrapper.style.clipPath = `polygon(50% 50%, 50% 0%, ${
          degrees <= 90
            ? `${50 + 50 * Math.tan((degrees * Math.PI) / 180)}% 0%`
            : degrees <= 180
            ? `100% 0%, 100% ${50 + 50 * Math.tan(((degrees - 90) * Math.PI) / 180)}%`
            : degrees <= 270
            ? `100% 0%, 100% 100%, ${50 - 50 * Math.tan(((degrees - 180) * Math.PI) / 180)}% 100%`
            : `100% 0%, 100% 100%, 0% 100%, 0% ${50 - 50 * Math.tan(((degrees - 270) * Math.PI) / 180)}%`
        })`;

        // Simpler approach: use opacity + scale for smooth reveal
        wrapper.style.opacity = `${Math.min(1, progress * 3)}`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="enso-bg" aria-hidden="true">
      <Image
        src="/enso.png"
        alt=""
        width={600}
        height={600}
        priority
        draggable={false}
      />
    </div>
  );
}
