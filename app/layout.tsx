"use client";

import { useState } from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import MenuOverlay from "@/components/MenuOverlay";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import SandCanvas from "@/components/SandCanvas";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-amber-50 to-yellow-50 text-gray-900 relative">
        <SandCanvas />
        <Navbar onMenuClick={() => setOpen(true)} />
        <MenuOverlay open={open} setOpen={setOpen} />
        <Breadcrumbs />
        <main className="max-w-3xl mx-auto px-6 py-12 pt-24 relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}