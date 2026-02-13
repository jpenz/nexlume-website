"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Zap, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  {
    name: "Shop",
    href: "/shop",
    children: [
      { name: "All Products", href: "/shop" },
      { name: "Patch Cords & Cables", href: "/shop/patch-cords" },
      { name: "Transceivers & Optics", href: "/shop/transceivers" },
      { name: "Infrastructure & Panels", href: "/shop/patch-panels" },
      { name: "Adapters & Passives", href: "/shop/adapters" },
      { name: "Tools & Test Equipment", href: "/shop/test-equipment" },
      { name: "Bundles & Kits", href: "/shop?tab=bundles" },
    ],
  },
  {
    name: "Products",
    href: "/products",
    children: [
      { name: "Cable Assemblies", href: "/products?category=cable-assemblies" },
      { name: "Connectors & Adapters", href: "/products?category=connectors-adapters" },
      { name: "Patch Panels", href: "/products?category=patch-panels" },
      { name: "Transceivers & Optics", href: "/products?category=transceivers" },
      { name: "Trunk Cables", href: "/products?category=trunk-cables" },
      { name: "MPO/MTP Solutions", href: "/products?category=mpo-mtp" },
    ],
  },
  {
    name: "Solutions",
    href: "/solutions",
    children: [
      { name: "Data Centers", href: "/solutions#data-centers" },
      { name: "5G / Telecom", href: "/solutions#5g" },
      { name: "FTTH / Broadband", href: "/solutions#ftth" },
      { name: "Enterprise Campus", href: "/solutions#enterprise" },
      { name: "Industrial", href: "/solutions#industrial" },
    ],
  },
  { name: "Build Your Cable", href: "/configurator" },
  { name: "Upload Plans", href: "/upload-plans" },
  { name: "Resources", href: "/resources" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">
              Nexlume
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="flex items-center gap-1 px-3 py-2 text-sm text-neutral-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                >
                  {item.name}
                  {item.children && <ChevronDown className="w-3.5 h-3.5" />}
                </Link>
                {item.children && (
                  <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-[#141414] border border-[#262626] rounded-xl p-2 min-w-[220px] shadow-2xl shadow-black/40">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-3 py-2 text-sm text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm text-neutral-500 bg-[#141414] border border-[#262626] rounded-lg hover:border-[#363636] transition-colors">
              <Search className="w-3.5 h-3.5" />
              <span>Search</span>
              <kbd className="text-xs bg-[#0A0A0A] px-1.5 py-0.5 rounded border border-[#262626]">⌘K</kbd>
            </button>
            <Button size="sm" className="hidden sm:inline-flex">
              Get a Quote
            </Button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-neutral-400 hover:text-white"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-[#1A1A1A]"
          >
            <nav className="px-4 py-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 text-sm text-neutral-300 hover:text-white hover:bg-white/5 rounded-lg"
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-3 border-t border-[#1A1A1A]">
                <Button className="w-full">Get a Quote</Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
