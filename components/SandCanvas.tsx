"use client";

import { useEffect, useRef } from "react";

/*
  ZEN RAKED SAND
  4 parallel SVG lines whose visible length is tied to scrollY.
  Scrolling reveals the lines; stopping fades them out via CSS transition.
*/

export default function SandCanvas() {
  const svgRef = useRef<SVGSVGElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const paths = svg.querySelectorAll<SVGPathElement>(".sand-line");

    // Set each path's dasharray to its actual computed length
    const frozen = document.body.getAttribute("data-frozen") === "true";
    const speed = frozen ? "0.8s" : "0.4s";

    paths.forEach((p) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray = `${len}`;
      p.style.strokeDashoffset = `${len}`;
      p.style.transition = `stroke-dashoffset ${speed} ease-out`;
    });

    const onScroll = () => {
      const isFrozen = document.body.getAttribute("data-frozen") === "true";

      // Instant appearance: fast transition IN
      svg.style.transition = "opacity 0.1s ease-out";
      svg.style.opacity = isFrozen ? "0.25" : "0.4";

      paths.forEach((p) => {
        const len = p.getTotalLength();
        const offset = Math.max(0, len - window.scrollY);
        p.style.transition = `stroke-dashoffset ${isFrozen ? "0.8s" : "0.4s"} ease-out`;
        p.style.strokeDashoffset = `${offset}`;
      });

      // Debounce: detect scroll stop
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        svg.style.transition = `opacity ${isFrozen ? "4s" : "2s"} cubic-bezier(0.4, 0, 0.2, 1)`;
        svg.style.opacity = "0";
      }, 150);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // 4 lines centered, using absolute pixel coords in a viewBox
  const cx = 500;
  const gap = 12;
  const height = 1000;

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      viewBox={`0 0 1000 ${height}`}
      preserveAspectRatio="none"
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, opacity: 0, transition: "opacity 0.1s ease-out" }}
    >
      {[-1.5, -0.5, 0.5, 1.5].map((i) => (
        <path
          key={i}
          className="sand-line"
          d={`M ${cx + i * gap} 0 L ${cx + i * gap} ${height}`}
          fill="none"
          stroke="#D9C9A8"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}
