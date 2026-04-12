"use client";

import { useEffect } from "react";

export default function ReadingProgress() {
  useEffect(() => {
    const progressBar = document.getElementById("reading-progress");
    
    if (!progressBar) return;

    const updateProgress = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = totalHeight > 0 ? scrolled / totalHeight : 0;
      
      progressBar.style.transform = `scaleX(${progress})`;
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return null;
}
