"use client";

import { useState, useEffect, useRef } from "react";

export default function Navbar({ onMenuClick }: { onMenuClick: () => void }) {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const isScrollingDown = currentScrollY > lastScrollY.current;

          if (isScrollingDown && currentScrollY > 50) {
            setIsVisible(false);
          } else {
            setIsVisible(true);
          }

          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 50) {
        setIsVisible(true);
      } else if (window.scrollY > 50) {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 px-6 py-4 border-b border-gray-200 bg-white/90 backdrop-blur-md z-40 transition-transform duration-300 ease-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex justify-between items-center w-full">
        <h1 className="font-semibold text-lg tracking-wide">Sourodiptto</h1>

        <button
          onClick={onMenuClick}
          className="text-sm font-medium px-4 py-2 hover:text-gray-600 transition-colors"
        >
          Menu
        </button>
      </div>
    </nav>
  );
}