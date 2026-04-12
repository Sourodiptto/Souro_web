"use client";

import { useState } from "react";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import MenuOverlay from "@/components/MenuOverlay";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import ReadingProgress from "@/components/ReadingProgress";
import SpotlightEffect from "@/components/SpotlightEffect";

function RootLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ReadingProgress />
      <SpotlightEffect />
      <Navbar onMenuClick={() => setOpen(true)} />
      <MenuOverlay open={open} setOpen={setOpen} />
      <Breadcrumbs />
      <main className="max-w-3xl mx-auto px-6 py-12 pt-24">
        {children}
      </main>
      <Footer />
    </>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Blocking Theme Script - Prevents White Flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const stored = localStorage.getItem('theme');
                  const isDark = stored 
                    ? stored === 'dark' 
                    : window.matchMedia('(prefers-color-scheme: dark)').matches;
                  
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <div id="reading-progress" />
        <ThemeProvider>
          <RootLayoutContent>{children}</RootLayoutContent>
        </ThemeProvider>
      </body>
    </html>
  );
}