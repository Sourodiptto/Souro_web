"use client";

import { useEffect, useRef } from "react";

/*
  SUMI-E CANVAS BRUSH

  Why Canvas beats SVG for soul:
  SVG is vector math — clean, repeatable, sterile. Canvas is analogue:
  each stamp is unique, rotated, scaled, faded. Overlapping stamps build
  up density like real ink soaking into paper — scroll slow and the ink
  pools dark; scroll fast and the brush skips, leaving dry white streaks.
  No two sessions paint the same line. That's what gives it life.

  Engine:
  - A 64×64 radial-gradient brush tip is generated once in an offscreen canvas
  - On scroll, stamps are placed along a vertical path at intervals tied to velocity
  - Each stamp is randomly rotated, scaled by "pressure", and opacity-decayed by acceleration
  - globalCompositeOperation = "source-over" so overlapping stamps build density
*/

// Generate a soft radial brush tip with fractal noise edges
function createBrushTip(size: number): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d")!;
  const half = size / 2;

  // Core radial gradient — dense centre, soft fade
  const grad = ctx.createRadialGradient(half, half, 0, half, half, half);
  grad.addColorStop(0, "rgba(26, 26, 27, 0.9)");
  grad.addColorStop(0.3, "rgba(26, 26, 27, 0.6)");
  grad.addColorStop(0.7, "rgba(26, 26, 27, 0.15)");
  grad.addColorStop(1, "rgba(26, 26, 27, 0)");

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  // Fractal noise mask — randomise edges for organic feel
  const imgData = ctx.getImageData(0, 0, size, size);
  const d = imgData.data;
  for (let i = 3; i < d.length; i += 4) {
    const x = ((i - 3) / 4) % size;
    const y = Math.floor((i - 3) / 4 / size);
    const dist = Math.sqrt((x - half) ** 2 + (y - half) ** 2) / half;
    // Random dropout increases toward edges
    const noise = Math.random();
    if (noise < dist * 0.4) {
      d[i] = 0; // punch transparent holes near edges
    }
  }
  ctx.putImageData(imgData, 0, 0);

  return c;
}

// Smooth S-curve: maps scroll progress (0→1) to an x position
function pathX(t: number, cx: number, amplitude: number): number {
  return cx + Math.sin(t * Math.PI * 2.5) * amplitude;
}

export default function SumiCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const brushRef = useRef<HTMLCanvasElement | null>(null);
  const lastScrollY = useRef(0);
  const lastStampY = useRef(0);
  const velocityRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;

    // High-DPI support
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Generate brush tip once
    brushRef.current = createBrushTip(64);

    const cx = window.innerWidth * 0.12; // Path centre: 12% from left
    const amplitude = 30; // S-curve lateral sway

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        const brush = brushRef.current;
        if (!brush) return;

        const currentY = window.scrollY;
        const delta = currentY - lastScrollY.current;
        const absDelta = Math.abs(delta);
        lastScrollY.current = currentY;

        // Smooth velocity
        velocityRef.current = velocityRef.current * 0.6 + absDelta * 0.4;
        const v = velocityRef.current;

        // Step distance: faster scroll = larger gaps between stamps (dry brush)
        const step = Math.max(3, 2 + v * 0.8);

        // Pressure (inverse of velocity): slow = big stamp, fast = small
        const pressure = Math.max(8, 20 - v * 0.3);

        // Opacity decay: sharp acceleration = lighter
        const accel = Math.abs(absDelta - velocityRef.current);
        const opacity = Math.max(0.15, 0.7 - accel * 0.02 - v * 0.01);

        // Scroll progress
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docH > 0 ? Math.max(0, Math.min(1, currentY / docH)) : 0;

        // Only stamp if we've moved enough since last stamp
        const canvasY = progress * window.innerHeight;
        if (Math.abs(canvasY - lastStampY.current) < step) return;

        // Stamp along the path
        const x = pathX(progress, cx, amplitude);
        const y = canvasY;
        const size = pressure;

        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.globalCompositeOperation = "source-over";

        // Random rotation — no two stamps repeat
        ctx.translate(x, y);
        ctx.rotate((Math.random() - 0.5) * 0.5); // ±~14°
        ctx.drawImage(brush, -size / 2, -size / 2, size, size);

        ctx.restore();

        lastStampY.current = canvasY;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="sumi-canvas"
      aria-hidden="true"
    />
  );
}
