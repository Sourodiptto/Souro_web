"use client";

import { useRef, useEffect } from "react";

export function useMagneticAffusion() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;

      // Calculate distance from center (max 50px influence radius)
      const distance = Math.sqrt(distX * distX + distY * distY);
      const maxDistance = 50;

      if (distance < maxDistance) {
        const influence = 1 - distance / maxDistance;
        const moveX = (distX / distance) * 3 * influence;
        const moveY = (distY / distance) * 3 * influence;

        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
      } else {
        element.style.transform = "translate(0, 0)";
      }
    };

    const handleMouseLeave = () => {
      element.style.transform = "translate(0, 0)";
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return ref;
}
