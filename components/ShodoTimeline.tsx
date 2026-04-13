"use client";

import { useEffect, useRef, useCallback } from "react";

export interface Milestone {
  id: string;
  title: string;
  description: string;
  year?: string;
  tags?: string[];
}

interface ShodoTimelineProps {
  milestones: Milestone[];
}

/*
  SHODO TIMELINE — Wabi-Sabi brush engine

  The beauty of calligraphy lives in its imperfections. A perfectly uniform
  line reads as mechanical; the micro-variations in width, edge roughness,
  and ink density are what signal a human hand. This is Wabi-Sabi applied
  to UI: controlled imperfection that increases perceived quality.

  Physics:
  - Stroke width = f(velocity, sin(time)) — hand tremor simulation
  - Kasure (掠れ) = dry-brush streaking at high scroll velocity
  - Ink pooling = width expansion when scroll pauses >200ms
  - Edge diffusion via layered SVG filters simulates ink bleeding into washi fibre
*/

// Sumi ink — not pure black, has blue/brown warmth
const SUMI_INK = "rgba(28, 28, 30, 0.95)";

export default function ShodoTimeline({ milestones }: ShodoTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const kasureMaskRef = useRef<SVGFETurbulenceElement>(null);
  const milestonesRef = useRef<(HTMLDivElement | null)[]>([]);
  const velocityRef = useRef(0);
  const lastScrollY = useRef(0);
  const rafRef = useRef<number>(0);
  const poolTimerRef = useRef<ReturnType<typeof setTimeout>>(null);
  const frameCountRef = useRef(0);
  const baseWidthRef = useRef(1.8);

  // Build a sinuous path through the milestone positions
  const buildPath = useCallback((height: number) => {
    const segmentH = height / Math.max(milestones.length, 1);
    let d = `M 24 0`;

    milestones.forEach((_, i) => {
      const y = segmentH * (i + 0.5);
      const x = i % 2 === 0 ? 32 : 16;
      const cpY = segmentH * i + segmentH * 0.25;
      d += ` C 24 ${cpY}, ${x} ${cpY}, ${x} ${y}`;
    });

    d += ` L 24 ${height}`;
    return d;
  }, [milestones]);

  useEffect(() => {
    const container = containerRef.current;
    const svg = svgRef.current;
    const path = pathRef.current;
    if (!container || !svg || !path) return;

    const resize = () => {
      const h = container.scrollHeight;
      svg.setAttribute("viewBox", `0 0 48 ${h}`);
      svg.style.height = `${h}px`;

      const d = buildPath(h);
      path.setAttribute("d", d);

      const len = path.getTotalLength();
      path.style.strokeDasharray = `${len}`;
      path.style.strokeDashoffset = `${len}`;
    };

    resize();
    window.addEventListener("resize", resize);

    // Scroll-driven brush physics
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      // Cancel any pending ink pool
      if (poolTimerRef.current) clearTimeout(poolTimerRef.current);

      rafRef.current = requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const delta = Math.abs(currentY - lastScrollY.current);
        lastScrollY.current = currentY;
        frameCountRef.current++;

        // Smooth velocity (exponential decay)
        velocityRef.current = velocityRef.current * 0.65 + delta * 0.35;
        const v = velocityRef.current;

        // ── Pressure simulation ──
        // Base pressure from velocity + sine wave for hand tremor
        const tremor = Math.sin(frameCountRef.current * 0.15) * 0.3;
        const pressureFromSpeed = Math.min(3.5, 1.8 + v * 0.06);
        const pressure = Math.max(1.2, pressureFromSpeed + tremor);
        baseWidthRef.current = pressure;
        path.style.strokeWidth = `${pressure}`;

        // ── Kasure (dry brush) ──
        // At high velocity, increase turbulence seed frequency → more gaps
        const kasure = kasureMaskRef.current;
        if (kasure) {
          // baseFrequency: low velocity = tight grain (0.02), high = streaky (0.08)
          const freq = Math.min(0.08, 0.02 + v * 0.002);
          kasure.setAttribute("baseFrequency", `${freq} 0.03`);
        }

        // Stroke opacity thins slightly at extreme speed (dry brush running out of ink)
        const opacity = Math.max(0.7, 0.95 - v * 0.005);
        path.style.strokeOpacity = `${opacity}`;

        // ── Draw progress ──
        const rect = container.getBoundingClientRect();
        const containerTop = -rect.top;
        const containerH = container.scrollHeight - window.innerHeight;
        const progress = Math.max(0, Math.min(1, containerTop / containerH));

        const len = path.getTotalLength();
        path.style.strokeDashoffset = `${len * (1 - progress)}`;

        // ── Milestone reveal ──
        const brushY = progress * container.scrollHeight;
        milestonesRef.current.forEach((el) => {
          if (!el) return;
          if (brushY >= el.offsetTop - 80) {
            el.classList.add("shodo-visible");
          }
        });

        // ── Ink pooling ──
        // If scroll stops for 200ms, swell the stroke at brush tip
        poolTimerRef.current = setTimeout(() => {
          const poolWidth = baseWidthRef.current + 1.5;
          path.style.transition = "stroke-width 0.6s cubic-bezier(0.22, 1, 0.36, 1)";
          path.style.strokeWidth = `${poolWidth}`;

          // Shrink back after the pool settles
          setTimeout(() => {
            path.style.transition =
              "stroke-width 0.2s ease-out, stroke-dashoffset 0.15s cubic-bezier(0.22, 1, 0.36, 1)";
            path.style.strokeWidth = `${baseWidthRef.current}`;
          }, 600);
        }, 200);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (poolTimerRef.current) clearTimeout(poolTimerRef.current);
    };
  }, [buildPath]);

  return (
    <div ref={containerRef} className="shodo-container">
      {/* SVG brush stroke */}
      <svg
        ref={svgRef}
        className="shodo-svg"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          {/*
            INK TEXTURE FILTER — 3 stages:
            1. Edge roughness (feTurbulence → feDisplacementMap)
            2. Edge diffusion (feGaussianBlur, stronger at edges via composite)
            3. Kasure mask (velocity-sensitive noise that punches holes)
          */}
          <filter id="sumi-ink" x="-20%" y="-5%" width="140%" height="110%">
            {/* Stage 1 — Edge roughness: organic washi-fibre displacement */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.035"
              numOctaves="5"
              seed="7"
              result="roughness"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="roughness"
              scale="2.5"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />

            {/* Stage 2 — Ink diffusion: subtle bleed at stroke edges */}
            <feGaussianBlur
              in="displaced"
              stdDeviation="0.4"
              result="diffused"
            />
            {/* Composite to keep core sharp, edges soft */}
            <feComposite
              in="displaced"
              in2="diffused"
              operator="over"
              result="inked"
            />

            {/* Stage 3 — Kasure (掠れ) dry-brush mask */}
            <feTurbulence
              ref={kasureMaskRef}
              type="fractalNoise"
              baseFrequency="0.02 0.03"
              numOctaves="3"
              seed="42"
              result="kasure"
            />
            <feColorMatrix
              in="kasure"
              type="matrix"
              values="0 0 0 0 1
                      0 0 0 0 1
                      0 0 0 0 1
                      0 0 0 0.85 0"
              result="kasure-alpha"
            />
            <feComposite
              in="inked"
              in2="kasure-alpha"
              operator="in"
              result="final"
            />
          </filter>
        </defs>

        <path
          ref={pathRef}
          className="shodo-path"
          fill="none"
          stroke={SUMI_INK}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#sumi-ink)"
        />
      </svg>

      {/* Milestones */}
      <div className="shodo-milestones">
        {milestones.map((m, i) => (
          <div
            key={m.id}
            ref={(el) => { milestonesRef.current[i] = el; }}
            className="shodo-milestone"
          >
            {m.year && <span className="shodo-year">{m.year}</span>}
            <h3 className="shodo-title">{m.title}</h3>
            <p className="shodo-desc">{m.description}</p>
            {m.tags && m.tags.length > 0 && (
              <div className="shodo-tags">
                {m.tags.map((tag) => (
                  <span key={tag} className="shodo-tag">{tag}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
