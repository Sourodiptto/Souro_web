"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero / Identity */}
      <section className="py-12">
        <h1 className="text-5xl font-bold mb-6" style={{ lineHeight: "1.618" }}>
          I study how decisions shape systems, and how systems quietly shape people.
        </h1>
        <p className="text-xl" style={{ lineHeight: "1.618", color: "var(--accent)" }}>
          This is where I think in public, build ideas into products, and track how my understanding evolves.
        </p>
      </section>

      {/* Entry Points - Direction */}
      <section className="py-12 border-t pt-12" style={{ borderColor: "var(--accent-light)" }}>
        <div className="space-y-8">
          <div className="group cursor-pointer transition-all duration-300">
            <h2 className="text-lg font-semibold mb-2 group-hover:translate-x-1 transition-transform duration-300">→ Work</h2>
            <p style={{ color: "var(--accent)" }} className="group-hover:text-opacity-80 transition-opacity duration-300">
              What I've built and explored. Products, projects, and the patterns behind them.
            </p>
          </div>
          
          <div className="group cursor-pointer transition-all duration-300">
            <h2 className="text-lg font-semibold mb-2 group-hover:translate-x-1 transition-transform duration-300">→ Now</h2>
            <p style={{ color: "var(--accent)" }} className="group-hover:text-opacity-80 transition-opacity duration-300">
              What currently has my attention. Real-time glimpses into what I'm thinking about and building.
            </p>
          </div>
          
          <div className="group cursor-pointer transition-all duration-300">
            <h2 className="text-lg font-semibold mb-2 group-hover:translate-x-1 transition-transform duration-300">→ Ideas</h2>
            <p style={{ color: "var(--accent)" }} className="group-hover:text-opacity-80 transition-opacity duration-300">
              Patterns, essays, and thinking. Longer-form explorations of how systems work.
            </p>
          </div>
          
          <div className="group cursor-pointer transition-all duration-300">
            <h2 className="text-lg font-semibold mb-2 group-hover:translate-x-1 transition-transform duration-300">→ Lab</h2>
            <p style={{ color: "var(--accent)" }} className="group-hover:text-opacity-80 transition-opacity duration-300">
              Where I test and validate new directions. Ideas before they become products.
            </p>
          </div>
        </div>
      </section>

      {/* Current State */}
      <section className="py-12 border-t pt-12" style={{ borderColor: "var(--accent-light)" }}>
        <h2 className="text-2xl font-bold mb-6" style={{ lineHeight: "1.618" }}>Currently focused on</h2>
        <ul className="space-y-4">
          <li className="flex gap-4">
            <span style={{ color: "var(--accent)" }} className="shrink-0">•</span>
            <span>How incentives distort good products over time</span>
          </li>
          <li className="flex gap-4">
            <span style={{ color: "var(--accent)" }} className="shrink-0">•</span>
            <span>Building a system to compound thinking, not just store it</span>
          </li>
          <li className="flex gap-4">
            <span style={{ color: "var(--accent)" }} className="shrink-0">•</span>
            <span>Identifying patterns between technology, markets, and human behavior</span>
          </li>
        </ul>
      </section>

      {/* A Recurring Observation */}
      <section className="py-12 border-t pt-12" style={{ borderColor: "var(--accent-light)" }}>
        <h3 className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>A recurring observation</h3>
        <blockquote className="text-2xl font-medium leading-relaxed italic" style={{ lineHeight: "1.618" }}>
          "Most people optimize for growth. Few understand what their system is actually optimizing for."
        </blockquote>
        <p style={{ color: "var(--accent)" }} className="mt-6">This feels like it should be obvious. It usually isn't.</p>
      </section>

      {/* Invitation */}
      <section className="py-12 border-t pt-12" style={{ borderColor: "var(--accent-light)" }}>
        <p className="text-lg leading-relaxed mb-4" style={{ lineHeight: "1.618" }}>
          I use this space to test ideas before they become products.
        </p>
        <p className="text-lg leading-relaxed" style={{ lineHeight: "1.618" }}>
          If you think deeply about systems, decisions, or the future — <span className="font-semibold hover:underline transition-all duration-300">step into the Lab.</span>
        </p>
      </section>

      {/* CTA Buttons */}
      <section className="py-12 border-t pt-12 flex gap-4 flex-wrap" style={{ borderColor: "var(--accent-light)" }}>
        <button 
          className="px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 active:scale-95"
          style={{
            backgroundColor: "var(--accent)",
            color: "var(--bg-primary)",
          }}
        >
          Explore Work
        </button>
        <button 
          className="px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 active:scale-95"
          style={{
            borderWidth: "1px",
            borderColor: "var(--accent)",
            color: "var(--text-primary)",
          }}
        >
          View Now
        </button>
      </section>

      {/* Signature */}
      <section className="py-12 border-t pt-12" style={{ borderColor: "var(--accent-light)" }}>
        <p style={{ color: "var(--accent)" }} className="text-sm">
          Not a portfolio. Not a blog.<br />
          A system for thinking, building, and becoming.
        </p>
      </section>
    </div>
  );
}