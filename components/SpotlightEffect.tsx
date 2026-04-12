"use client";

import { useEffect } from "react";
import { useTheme } from "./ThemeProvider";

export default function SpotlightEffect() {
  const { theme } = useTheme();

  useEffect(() => {
    if (theme !== "dark") return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      document.documentElement.style.setProperty(
        "--spotlight-x",
        `${x}px`
      );
      document.documentElement.style.setProperty(
        "--spotlight-y",
        `${y}px`
      );
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [theme]);

  if (theme !== "dark") return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 opacity-30"
      style={{
        background: `radial-gradient(600px at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(163, 163, 163, 0.1), transparent 80%)`,
      }}
    />
  );
}
