"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("scroll-reveal");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative z-10">
      {/* Hero / Identity */}
      <section className="mb-32 md:mb-40">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight" data-reveal>
          I study how decisions shape systems, and how systems quietly shape people.
        </h1>
        <p className="text-xl coffee-text max-w-2xl" data-reveal>
          Optimization is often a trap. Most build for growth; I build to understand what the system is actually optimizing for.
        </p>
      </section>

      {/* Current Vectors */}
      <section className="mb-32 md:mb-40">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-8" data-reveal>Current Vectors</h2>
        <div className="space-y-12">
          <div className="group" data-reveal>
            <h3 className="text-2xl font-semibold mb-3 group-hover:text-amber-900 transition-colors">
              → The decay of products through misaligned incentives
            </h3>
            <p className="text-gray-700 coffee-text leading-relaxed">
              How systems optimizing for short-term metrics corrupt long-term value. The pattern is everywhere: financial instruments, social platforms, even research incentives.
            </p>
          </div>
          
          <div className="group" data-reveal>
            <h3 className="text-2xl font-semibold mb-3 group-hover:text-amber-900 transition-colors">
              → Architectural frameworks for compounding thought
            </h3>
            <p className="text-gray-700 coffee-text leading-relaxed">
              Building thinking systems that evolve, not just collect. How to structure ideas so they generate new insights rather than becoming static archives.
            </p>
          </div>
          
          <div className="group" data-reveal>
            <h3 className="text-2xl font-semibold mb-3 group-hover:text-amber-900 transition-colors">
              → The intersection of market mechanics and human behavior
            </h3>
            <p className="text-gray-700 coffee-text leading-relaxed">
              Why economic incentives move in predictable patterns, and how understanding this shapes better products and decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Entry Points */}
      <section className="mb-32 md:mb-40">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-8" data-reveal>Where to begin</h2>
        <div className="space-y-10">
          <div className="group cursor-pointer" data-reveal>
            <h3 className="text-xl font-semibold mb-2 group-hover:translate-x-1 transition-transform">→ Work</h3>
            <p className="text-gray-600 coffee-text">
              What I've built and explored. Products, projects, and the patterns behind them.
            </p>
          </div>
          
          <div className="group cursor-pointer" data-reveal>
            <h3 className="text-xl font-semibold mb-2 group-hover:translate-x-1 transition-transform">→ Now</h3>
            <p className="text-gray-600 coffee-text">
              What currently has my attention. Real-time glimpses into what I'm thinking about and building.
            </p>
          </div>
          
          <div className="group cursor-pointer" data-reveal>
            <h3 className="text-xl font-semibold mb-2 group-hover:translate-x-1 transition-transform">→ Ideas</h3>
            <p className="text-gray-600 coffee-text">
              Patterns, essays, and thinking. Longer-form explorations of how systems work.
            </p>
          </div>
          
          <div className="group cursor-pointer" data-reveal>
            <h3 className="text-xl font-semibold mb-2 group-hover:translate-x-1 transition-transform">→ Lab</h3>
            <p className="text-gray-600 coffee-text">
              Where I test and validate new directions. Ideas before they become products.
            </p>
          </div>
        </div>
      </section>

      {/* Observation */}
      <section className="mb-32 md:mb-40">
        <blockquote className="text-3xl md:text-4xl font-medium text-gray-900 leading-relaxed italic max-w-3xl" data-reveal>
          "Optimization is often a trap. Most build for growth; I build to understand what the system is actually optimizing for."
        </blockquote>
      </section>

      {/* Invitation */}
      <section className="mb-32 md:mb-40">
        <p className="text-xl leading-relaxed mb-8 max-w-2xl" data-reveal>
          This is not a collection. This is a trajectory.
        </p>
        <p className="text-lg text-gray-800 leading-relaxed max-w-2xl" data-reveal>
          I use this space to test ideas before they become products. If you think deeply about systems, markets, and the future — <span className="font-semibold text-amber-900">step into the Lab.</span>
        </p>
      </section>

      {/* Signature */}
      <section className="pb-12">
        <p className="text-gray-600 text-sm leading-relaxed" data-reveal>
          Not a portfolio. Not a blog.<br />
          A system for thinking, building, and becoming.
        </p>
      </section>
    </div>
  );
}