"use client";

import { useState } from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import MenuOverlay from "@/components/MenuOverlay";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <Navbar onMenuClick={() => setOpen(true)} />
        <MenuOverlay open={open} setOpen={setOpen} />
        <Breadcrumbs />
        <main className="max-w-3xl mx-auto px-6 py-12 pt-24">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}