"use client";

import { useEffect } from "react";
import EmptyState from "@/components/EmptyState";

export default function NotFound() {
  useEffect(() => {
    document.body.setAttribute("data-frozen", "true");
    return () => {
      document.body.removeAttribute("data-frozen");
    };
  }, []);

  return (
    <EmptyState
      label="404 — The page exists in superposition"
      sub="You opened the box. There&rsquo;s nothing here."
    />
  );
}
