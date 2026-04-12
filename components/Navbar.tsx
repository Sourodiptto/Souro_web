"use client";

import { useState, useEffect, useRef } from "react";

export default function Navbar({ onMenuClick }: { onMenuClick: () => void }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isHoveringTop, setIsHoveringTop] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const isScrollingDown = currentScrollY > lastScrollY.current;

          // Hide navbar when scrolling down, show when scrolling up
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
      // Show navbar when hovering near the top (top 50px)
      if (e.clientY < 50) {
        setIsHoveringTop(true);
        setIsVisible(true);
      } else {
        setIsHoveringTop(false);
        // Hide navbar immediately if scrolled down and mouse left the top zone
        if (window.scrollY > 50) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
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
      style={{
        transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      <div className="flex justify-between items-center w-full">
        <h1 className="font-semibold text-lg tracking-wide">Sourodiptto</h1>

        <button
          onClick={onMenuClick}
          className="text-sm font-medium px-4 py-2 hover:text-amber-700 transition-colors duration-300"
        >
          Menu
        </button>
      </div>
    </nav>
  );
}