"use client";

import { useEffect } from "react";
import ShodoTimeline, { Milestone } from "@/components/ShodoTimeline";

const milestones: Milestone[] = [
  {
    id: "placeholder-1",
    year: "2026",
    title: "Coming soon",
    description:
      "This is where the work will live. Each milestone traces a line through the things I've built, broken, and understood.",
    tags: ["systems", "design"],
  },
  {
    id: "placeholder-2",
    year: "2025",
    title: "Coming soon",
    description:
      "Projects that taught me more about incentives, architecture, and the patterns hiding inside everyday products.",
    tags: ["product", "research"],
  },
  {
    id: "placeholder-3",
    year: "2024",
    title: "Coming soon",
    description:
      "Early explorations — the first attempts at understanding what systems optimize for when nobody is watching.",
    tags: ["exploration"],
  },
  {
    id: "placeholder-4",
    year: "2023",
    title: "Coming soon",
    description:
      "Early explorations — the first attempts at understanding what systems optimize for when nobody is watching.",
    tags: ["exploration"],
  },
  {
    id: "placeholder-5",
    year: "2022",
    title: "Coming soon",
    description:
      "Early explorations — the first attempts at understanding what systems optimize for when nobody is watching.",
    tags: ["exploration"],
  },
];

export default function WorksPage() {
  useEffect(() => {
    document.body.setAttribute("data-page", "works");
    return () => document.body.removeAttribute("data-page");
  }, []);

  return (
    <div className="relative z-10">
      <section className="mb-16">
        <h1 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-4">
          Works
        </h1>
        <p className="text-xl coffee-text max-w-2xl mb-16">
          A brush stroke through the things I&apos;ve built. Scroll to trace the path.
        </p>
      </section>

      <ShodoTimeline milestones={milestones} />
    </div>
  );
}