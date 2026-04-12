"use client";

import { useState } from "react";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import MenuOverlay from "@/components/MenuOverlay";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";

function RootLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
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
      <body className="bg-amber-50 text-gray-900 dark:bg-gray-900 dark:text-gray-50 transition-colors duration-300">
        <ThemeProvider>
          <RootLayoutContent>{children}</RootLayoutContent>
        </ThemeProvider>
      </body>
    </html>
  );
}