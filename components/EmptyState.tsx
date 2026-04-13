"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

function MagneticLink({ href, label }: { href: string; label: string }) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const radius = 80;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < radius) {
        const pull = 1 - dist / radius;
        el.style.transform = `translate(${dx * pull * 0.35}px, ${dy * pull * 0.35}px)`;
      } else {
        el.style.transform = "translate(0, 0)";
      }
    };

    const onLeave = () => {
      el.style.transform = "translate(0, 0)";
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <Link ref={ref} href={href} className="magnetic-link">
      {label}
    </Link>
  );
}

export default function EmptyState({
  label = "This page exists in superposition",
  sub = "You opened the box. There\u2019s nothing here.",
  linkHref = "/",
  linkLabel = "\u2192 Origin",
}: {
  label?: string;
  sub?: string;
  linkHref?: string;
  linkLabel?: string;
}) {
  return (
    <div className="not-found-container">
      <p className="not-found-label">{label}</p>

      <div className="schrodinger-wrapper">
        <Image
          src="/schrodinger.png.png"
          alt="Schrödinger's cat in a box"
          width={720}
          height={720}
          priority
          draggable={false}
        />
      </div>

      <p className="not-found-sub">{sub}</p>

      <div className="not-found-link-wrapper">
        <MagneticLink href={linkHref} label={linkLabel} />
      </div>
    </div>
  );
}
