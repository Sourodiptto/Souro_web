"use client";

import Link from "next/link";
import { useState } from "react";

interface MenuOverlayProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function MenuOverlay({ open, setOpen }: MenuOverlayProps) {
  const [expandedAbout, setExpandedAbout] = useState(false);
  const [expandedConnect, setExpandedConnect] = useState(false);

  if (!open) return null;

  return (
    <div
      className="menu-container fixed inset-0 backdrop-blur-[10px] z-50 flex flex-col items-center justify-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
      onClick={() => setOpen(false)}
    >
      <div
        className="menu-content flex flex-col space-y-6 w-full max-w-2xl px-6"
        onClick={(e) => e.stopPropagation()}
      >
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="menu-link text-4xl font-bold transition-colors duration-300 hover:opacity-70"
          style={{ color: "var(--text-primary)" }}
        >
          Home
        </Link>
        
        <div>
          <button
            onClick={() => setExpandedAbout(!expandedAbout)}
            className="w-full text-left text-4xl font-bold transition-colors duration-300 flex items-center justify-between gap-4 hover:opacity-70"
            style={{ color: "var(--text-primary)" }}
          >
            About
            <span className={`inline-flex items-center justify-center w-6 h-6 transition-transform duration-300 ${expandedAbout ? "rotate-180" : ""}`} style={{ color: "var(--accent)" }}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </span>
          </button>

          {expandedAbout && (
            <div className="mt-6 ml-4 space-y-6 border-l-2 pl-6" style={{ borderColor: "var(--accent-light)" }}>
              <Link
                href="/works"
                onClick={() => setOpen(false)}
                className="block group"
              >
                <h3 className="text-2xl font-bold transition-colors duration-300 group-hover:opacity-70" style={{ color: "var(--text-primary)" }}>→ Work</h3>
                <p className="text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: "var(--accent)" }}>What I've built and explored. Products, projects, and the patterns behind them.</p>
              </Link>

              <Link
                href="/now"
                onClick={() => setOpen(false)}
                className="block group"
              >
                <h3 className="text-2xl font-bold transition-colors duration-300 group-hover:opacity-70" style={{ color: "var(--text-primary)" }}>→ Now</h3>
                <p className="text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: "var(--accent)" }}>What currently has my attention. Real-time glimpses into what I'm thinking about and building.</p>
              </Link>

              <Link
                href="/ideas"
                onClick={() => setOpen(false)}
                className="block group"
              >
                <h3 className="text-2xl font-bold transition-colors duration-300 group-hover:opacity-70" style={{ color: "var(--text-primary)" }}>→ Ideas</h3>
                <p className="text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: "var(--accent)" }}>Patterns, essays, and thinking. Longer-form explorations of how systems work.</p>
              </Link>

              <Link
                href="/lab"
                onClick={() => setOpen(false)}
                className="block group"
              >
                <h3 className="text-2xl font-bold transition-colors duration-300 group-hover:opacity-70" style={{ color: "var(--text-primary)" }}>→ Lab</h3>
                <p className="text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: "var(--accent)" }}>Where I test and validate new directions. Ideas before they become products.</p>
              </Link>
            </div>
          )}
        </div>

        <div>
          <button
            onClick={() => setExpandedConnect(!expandedConnect)}
            className="w-full text-left text-4xl font-bold transition-colors duration-300 flex items-center justify-between gap-4 hover:opacity-70"
            style={{ color: "var(--text-primary)" }}
          >
            Connect
            <span className={`inline-flex items-center justify-center w-6 h-6 transition-transform duration-300 ${expandedConnect ? "rotate-180" : ""}`} style={{ color: "var(--accent)" }}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </span>
          </button>

          {expandedConnect && (
            <div className="mt-4 ml-4 border-l-2 pl-6 space-y-4" style={{ borderColor: "var(--accent-light)" }}>
              <p className="text-sm" style={{ color: "var(--accent)" }}>Let's talk. Share ideas, collaborate, or just say hello.</p>
              <div className="space-y-3">
                <a
                  href="https://www.linkedin.com/in/sourodipttomondal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition-colors duration-300 hover:opacity-70"
                  style={{ color: "var(--text-primary)" }}
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/Sourodiptto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition-colors duration-300 hover:opacity-70"
                  style={{ color: "var(--text-primary)" }}
                >
                  GitHub
                </a>
                <a
                  href="mailto:msourodiptto@gmail.com"
                  className="block transition-colors duration-300 hover:opacity-70"
                  style={{ color: "var(--text-primary)" }}
                >
                  Email
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}