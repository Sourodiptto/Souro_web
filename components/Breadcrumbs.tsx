"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [showEllipsis, setShowEllipsis] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Custom breadcrumb overrides for specific routes
  // Ideas, Lab, Works, Now are all sub-sections of About
  const routeBreadcrumbs: Record<string, { label: string; path: string }[]> = {
    "/about": [
      { label: "Home", path: "/" },
      { label: "About", path: "/about" },
    ],
    "/lab": [
      { label: "Home", path: "/" },
      { label: "About", path: "/about" },
      { label: "Lab", path: "/lab" },
    ],
    "/works": [
      { label: "Home", path: "/" },
      { label: "About", path: "/about" },
      { label: "Works", path: "/works" },
    ],
    "/now": [
      { label: "Home", path: "/" },
      { label: "About", path: "/about" },
      { label: "Now", path: "/now" },
    ],
  };

  // Convert pathname to breadcrumb items
  const getBreadcrumbs = () => {
    if (routeBreadcrumbs[pathname]) {
      return routeBreadcrumbs[pathname];
    }

    const paths = pathname.split("/").filter((path) => path);

    const breadcrumbs = [
      { label: "Home", path: "/" }
    ];

    let currentPath = "";
    paths.forEach((path) => {
      currentPath += `/${path}`;
      const label = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " ");
      breadcrumbs.push({ label, path: currentPath });
    });

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  // Check for overflow on mobile
  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current) {
        setIsOverflowing(
          containerRef.current.scrollWidth > containerRef.current.clientWidth
        );
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [pathname]);

  // Generate JSON-LD schema
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.label,
      "item": `${typeof window !== "undefined" ? window.location.origin : ""}${crumb.path}`
    }))
  };

  // Determine which breadcrumbs to show based on overflow
  const displayBreadcrumbs = isOverflowing && breadcrumbs.length > 3
    ? [breadcrumbs[0], { label: "...", path: "", isEllipsis: true }, breadcrumbs[breadcrumbs.length - 1]]
    : breadcrumbs;

  const hiddenBreadcrumbs = isOverflowing && breadcrumbs.length > 3
    ? breadcrumbs.slice(1, -1)
    : [];

  return (
    <>
      {/* JSON-LD Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <nav
        ref={containerRef}
        aria-label="Breadcrumb"
        className="w-full py-3 px-6 overflow-x-hidden bg-gradient-to-br from-amber-50/90 to-yellow-50/90 border-b border-amber-200/30"
        style={{ marginTop: "60px" }}
      >
        <div className="max-w-3xl mx-auto">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            {displayBreadcrumbs.map((crumb, index) => {
              const isActive = index === displayBreadcrumbs.length - 1;
              const isEllipsis = (crumb as any).isEllipsis;

              if (isEllipsis) {
                return (
                  <li key="ellipsis" className="relative group">
                    <button
                      className="text-gray-400 hover:text-amber-900 transition-colors px-2"
                      onClick={() => setShowEllipsis(!showEllipsis)}
                      aria-label="Show more breadcrumbs"
                    >
                      •••
                    </button>

                    {showEllipsis && (
                      <div className="absolute left-0 mt-2 bg-white border border-amber-200/30 rounded-lg shadow-lg z-50 min-w-max">
                        {hiddenBreadcrumbs.map((item) => (
                          <Link
                            key={item.path}
                            href={item.path}
                            className="block px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-900 transition-colors first:rounded-t-lg last:rounded-b-lg text-sm"
                            onClick={() => setShowEllipsis(false)}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                );
              }

              return (
                <li key={crumb.path} className="flex items-center min-w-0">
                  {index > 0 && (
                    <span className="text-amber-200 mx-1.5 shrink-0" aria-hidden="true">
                      /
                    </span>
                  )}

                  {isActive ? (
                    <span
                      aria-current="page"
                      className="text-gray-700 font-medium truncate"
                    >
                      {crumb.label}
                    </span>
                  ) : (
                    <Link
                      href={crumb.path}
                      className="text-gray-600 hover:text-amber-900 transition-all duration-200 relative group truncate"
                    >
                      {crumb.label}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-900 group-hover:w-full transition-all duration-300" />
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
    </>
  );
}
