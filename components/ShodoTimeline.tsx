"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const pathname = usePathname();
  
  // Define the path segments
  // This logic ensures "Home" is always the root, and we build from there.
  const pathSegments = pathname.split("/").filter((v) => v.length > 0);

  // For your specific request of Home / About / Ideas:
  // We manually prepend 'About' if we are in the 'Ideas' section 
  // to show the intellectual hierarchy.
  const breadcrumbs = [
    { label: "Home", href: "/" },
    ...(pathSegments.includes("ideas") ? [{ label: "About", href: "/about" }] : []),
    ...pathSegments.map((segment, index) => {
      const href = "/" + pathSegments.slice(0, index + 1).join("/");
      return {
        label: segment.charAt(0).toUpperCase() + segment.slice(1),
        href,
      };
    }),
  ];

  return (
    <nav aria-label="Breadcrumb" className="breadcrumb-container">
      <ol className="breadcrumb-list">
        {breadcrumbs.map((crumb, i) => (
          <li key={crumb.href} className="breadcrumb-item">
            <Link href={crumb.href} className="breadcrumb-link">
              {crumb.label}
            </Link>
            {i < breadcrumbs.length - 1 && (
              <span className="breadcrumb-separator">/</span>
            )}
          </li>
        ))}
      </ol>

      <style jsx>{`
        .breadcrumb-container {
          padding: 2rem 0;
          font-family: var(--font-mono); /* Keeping the technical/studio feel */
          font-size: 0.8rem;
          letter-spacing: 0.05em;
          text-transform: lowercase; /* Zen styling preference */
        }
        .breadcrumb-list {
          display: flex;
          list-style: none;
          gap: 0.5rem;
          opacity: 0.6;
          transition: opacity 0.3s ease;
        }
        .breadcrumb-list:hover {
          opacity: 1;
        }
        .breadcrumb-link {
          text-decoration: none;
          color: inherit;
          transition: color 0.2s ease;
        }
        .breadcrumb-link:hover {
          color: var(--accent-color);
        }
        .breadcrumb-separator {
          opacity: 0.4;
          margin-left: 0.5rem;
        }
      `}</style>
    </nav>
  );
}