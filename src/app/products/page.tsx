"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  Cable,
  Radio,
  Cpu,
  Factory,
  ArrowRight,
  Star,
  Filter,
  Grid3X3,
  List,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const categories = [
  { name: "Fiber Patch Cables", count: 84, icon: Cable, slug: "patch-cables" },
  { name: "Trunk Cables", count: 36, icon: Cable, slug: "trunk-cables" },
  { name: "MPO/MTP Assemblies", count: 28, icon: Cpu, slug: "mpo-mtp" },
  { name: "Breakout Cables", count: 22, icon: Radio, slug: "breakout-cables" },
  { name: "Custom Assemblies", count: 150, icon: Factory, slug: "custom" },
  { name: "Connectivity & Adapters", count: 45, icon: SlidersHorizontal, slug: "connectivity" },
];

const featuredProducts = [
  {
    id: "lc-lc-sm-duplex",
    name: "LC-LC Singlemode Duplex Patch Cable",
    category: "Fiber Patch Cables",
    description: "OS2 9/125μm, LSZH jacket, IL ≤0.2dB, RL ≥55dB",
    specs: ["Singlemode OS2", "Duplex", "LSZH", "1-100m"],
    price: "From $8.50",
    badge: "Best Seller",
    image: "/images/products/lc-lc-sm.svg",
  },
  {
    id: "mpo-12-sm",
    name: "MPO-12 Singlemode Trunk Cable",
    category: "MPO/MTP Assemblies",
    description: "12-fiber, Type A polarity, low-loss elite connectors",
    specs: ["12 Fiber", "Type A Polarity", "Elite Grade", "1-300m"],
    price: "From $45.00",
    badge: "Popular",
    image: "/images/products/mpo-12.svg",
  },
  {
    id: "sc-apc-sm-simplex",
    name: "SC/APC Singlemode Simplex Cable",
    category: "Fiber Patch Cables",
    description: "OS2 9/125μm, angled polish, ideal for PON/FTTH",
    specs: ["Singlemode OS2", "Simplex", "APC Polish", "1-50m"],
    price: "From $6.75",
    badge: "FTTH",
    image: "/images/products/sc-apc.svg",
  },
  {
    id: "mtp-24-mm",
    name: "MTP-24 Multimode OM4 Trunk",
    category: "MPO/MTP Assemblies",
    description: "24-fiber, 50/125μm OM4, for 100G/400G data centers",
    specs: ["24 Fiber", "OM4", "100G/400G", "1-500m"],
    price: "From $89.00",
    badge: "Data Center",
    image: "/images/products/mtp-24.svg",
  },
  {
    id: "breakout-lc-12",
    name: "12-Fiber Breakout Cable LC",
    category: "Breakout Cables",
    description: "Individual 900μm legs, singlemode or multimode",
    specs: ["12 Fiber", "900μm Legs", "SM/MM", "Custom Length"],
    price: "From $65.00",
    badge: null,
    image: "/images/products/breakout-12.svg",
  },
  {
    id: "custom-harness",
    name: "Custom Fiber Harness Assembly",
    category: "Custom Assemblies",
    description: "Tailored to your spec — any connector, fiber count, length",
    specs: ["Any Connector", "1-864 Fiber", "Custom Jacket", "2-4 Week Lead"],
    price: "Request Quote",
    badge: "Custom",
    image: "/images/products/custom-harness.svg",
  },
];

const filters = {
  fiberMode: ["Singlemode OS2", "Multimode OM3", "Multimode OM4", "Multimode OM5"],
  connectorType: ["LC", "SC", "ST", "FC", "MPO/MTP", "E2000"],
  jacketType: ["LSZH", "PVC", "OFNP Plenum", "OFNR Riser", "Armored"],
};

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="border-b border-[#262626] bg-gradient-to-b from-[#0A0A0A] to-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <Badge variant="indigo" className="mb-4">Product Catalog</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Fiber Optic Assemblies
          </h1>
          <p className="text-lg text-neutral-400 max-w-2xl mb-8">
            Over 200 SKUs with same-day configuration. Enterprise-grade assemblies built in Michigan.
          </p>

          {/* Search Bar */}
          <div className="flex gap-3 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
              <Input
                placeholder="Search by part number, connector type, fiber mode..."
                className="pl-10 h-12 bg-[#141414] border-[#262626] text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              className="h-12 px-4"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
      </section>

      {/* Filter Panel */}
      {showFilters && (
        <motion.section
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="border-b border-[#262626] bg-[#111111]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-sm font-medium text-neutral-300 mb-3">Fiber Mode</h3>
                <div className="flex flex-wrap gap-2">
                  {filters.fiberMode.map((f) => (
                    <button
                      key={f}
                      className="px-3 py-1.5 text-sm rounded-lg border border-[#333333] text-neutral-400 hover:border-indigo-500 hover:text-white transition-colors"
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-neutral-300 mb-3">Connector Type</h3>
                <div className="flex flex-wrap gap-2">
                  {filters.connectorType.map((f) => (
                    <button
                      key={f}
                      className="px-3 py-1.5 text-sm rounded-lg border border-[#333333] text-neutral-400 hover:border-indigo-500 hover:text-white transition-colors"
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-neutral-300 mb-3">Jacket Type</h3>
                <div className="flex flex-wrap gap-2">
                  {filters.jacketType.map((f) => (
                    <button
                      key={f}
                      className="px-3 py-1.5 text-sm rounded-lg border border-[#333333] text-neutral-400 hover:border-indigo-500 hover:text-white transition-colors"
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Categories */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-white">Browse by Category</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link key={cat.slug} href={`/products/${cat.slug}`}>
                <Card className="p-4 text-center hover:border-indigo-500/50 transition-all group cursor-pointer">
                  <cat.icon className="w-8 h-8 text-indigo-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="text-sm font-medium text-white mb-1">{cat.name}</h3>
                  <p className="text-xs text-neutral-500">{cat.count} products</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-white">Featured Products</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-[#262626] text-white" : "text-neutral-500"}`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg ${viewMode === "list" ? "bg-[#262626] text-white" : "text-neutral-500"}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className={viewMode === "grid"
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          : "flex flex-col gap-4"
        }>
          {featuredProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={`/products/${product.id}`}>
                <Card className={`group hover:border-indigo-500/50 transition-all cursor-pointer ${
                  viewMode === "list" ? "flex items-center" : ""
                }`}>
                  {/* Product Image Placeholder */}
                  <div className={`bg-[#1A1A1A] flex items-center justify-center ${
                    viewMode === "list" ? "w-32 h-32 rounded-l-xl" : "h-48 rounded-t-xl"
                  }`}>
                    <Cable className="w-12 h-12 text-neutral-700" />
                  </div>

                  <div className="p-5 flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs text-neutral-500">{product.category}</span>
                      {product.badge && (
                        <Badge variant={product.badge === "Best Seller" ? "indigo" : "secondary"} className="text-xs">
                          {product.badge}
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-base font-medium text-white mb-1 group-hover:text-indigo-400 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-neutral-500 mb-3">{product.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {product.specs.map((spec) => (
                        <span key={spec} className="text-xs px-2 py-0.5 bg-[#1A1A1A] border border-[#262626] rounded text-neutral-400">
                          {spec}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-indigo-400">{product.price}</span>
                      <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-indigo-400 transition-colors" />
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
