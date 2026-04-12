"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

export default function Navbar({ onMenuClick }: { onMenuClick: () => void }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isHoveringTop, setIsHoveringTop] = useState(false);
  const lastScrollY = useRef(0);
  const { theme, toggleTheme } = useTheme();

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
      className={`fixed top-0 left-0 right-0 px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md z-40 transition-transform duration-300 ease-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
      style={{
        transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      <div className="flex justify-between items-center w-full">
        <h1 className="font-semibold text-lg tracking-wide">Sourodiptto</h1>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
            aria-label="Toggle theme"
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? (
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 1.78a1 1 0 011.415 0l.707.707a1 1 0 01-1.415 1.415l-.707-.707a1 1 0 010-1.415zm2.828 2.828a1 1 0 011.415 0l.707.707a1 1 0 01-1.415 1.415l-.707-.707a1 1 0 010-1.415zm2.828 2.829a1 1 0 011.415 0l.707.707a1 1 0 01-1.415 1.415l-.707-.707a1 1 0 010-1.415zM10 7a3 3 0 100 6 3 3 0 000-6zm-4.22-1.78a1 1 0 011.415 0l.707.707a1 1 0 01-1.415 1.415L5.78 5.22a1 1 0 010-1.415zm2.828-2.828a1 1 0 011.415 0l.707.707a1 1 0 01-1.415 1.415l-.707-.707a1 1 0 010-1.415zM10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm0 14a1 1 0 01-1-1v-1a1 1 0 112 0v1a1 1 0 01-1 1zm4.22 1.78a1 1 0 011.415 0l.707.707a1 1 0 01-1.415 1.415l-.707-.707a1 1 0 010-1.415zm2.828 2.828a1 1 0 011.415 0l.707.707a1 1 0 01-1.415 1.415l-.707-.707a1 1 0 010-1.415zm2.828 2.829a1 1 0 011.415 0l.707.707a1 1 0 01-1.415 1.415l-.707-.707a1 1 0 010-1.415zM10 17a3 3 0 100-6 3 3 0 000 6zm-4.22-1.78a1 1 0 011.415 0l.707.707a1 1 0 01-1.415 1.415l-.707-.707a1 1 0 010-1.415zm2.828-2.828a1 1 0 011.415 0l.707.707a1 1 0 01-1.415 1.415l-.707-.707a1 1 0 010-1.415z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>

          <button
            onClick={onMenuClick}
            className="text-sm font-medium px-4 py-2 hover:text-amber-700 dark:hover:text-amber-400 transition-colors duration-300"
          >
            Menu
          </button>
        </div>
      </div>
    </nav>
  );
}