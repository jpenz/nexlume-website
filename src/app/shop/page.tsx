"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  Zap,
  Package,
  TrendingUp,
  ArrowRight,
  Cable,
  Cpu,
  Wrench,
  Server,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ProductCard } from "@/components/shop/product-card";
import { BundleCard } from "@/components/shop/bundle-card";
import { SHOP_CATEGORIES, TOP_SKUS, BUNDLES } from "@/data/shop-catalog";

const categoryIcons: Record<string, typeof Cable> = {
  "patch-cords": Cable,
  transceivers: Cpu,
  "patch-panels": Server,
  adapters: Cable,
  "test-equipment": Wrench,
};

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "bundles" | "new" | "bead">("all");

  const filteredProducts = searchQuery
    ? TOP_SKUS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.specs.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : TOP_SKUS;

  const bestSellers = TOP_SKUS.filter((p) => p.badge === "Best Seller");
  const beadReady = TOP_SKUS.filter((p) => p.badge === "BEAD Ready");
  const newProducts = TOP_SKUS.filter((p) => p.badge === "New");

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="border-b border-[#262626] bg-gradient-to-b from-[#0A0A0A] via-[#0F0F1A] to-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="indigo">
              <Zap className="w-3 h-3 mr-1" /> Quick Ship
            </Badge>
            <Badge variant="secondary">
              <Package className="w-3 h-3 mr-1" /> 830+ SKUs In Stock
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Shop Fiber Optics
          </h1>
          <p className="text-lg text-neutral-400 max-w-2xl mb-8">
            Ready-to-ship fiber optic products at up to 95% below OEM pricing.
            In stock in Michigan. Same-day shipping on orders before 3PM ET.
          </p>

          {/* Search */}
          <div className="flex gap-3 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
              <Input
                placeholder="Search by SKU, product name, or spec..."
                className="pl-10 h-12 bg-[#141414] border-[#262626] text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex gap-6 mt-8">
            {[
              { label: "Products In Stock", value: "830+", icon: Package },
              { label: "Same-Day Shipping", value: "Before 3PM ET", icon: Zap },
              { label: "Below OEM Price", value: "Up to 95%", icon: TrendingUp },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2">
                <stat.icon className="w-4 h-4 text-indigo-400" />
                <div>
                  <div className="text-sm font-semibold text-white">{stat.value}</div>
                  <div className="text-xs text-neutral-500">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Category Navigation */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-white mb-6">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {SHOP_CATEGORIES.map((cat, i) => {
              const Icon = categoryIcons[cat.slug] || Cable;
              return (
                <motion.div
                  key={cat.slug}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link href={`/shop/${cat.slug}`}>
                    <Card className="p-4 text-center group hover:border-indigo-500/50 transition-all cursor-pointer h-full">
                      <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                        <span className="text-xl">{cat.icon}</span>
                      </div>
                      <h3 className="text-sm font-medium text-white mb-1">{cat.name}</h3>
                      <p className="text-xs text-neutral-500">{cat.estimatedSKUs} products</p>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mb-6 border-b border-[#262626] pb-4">
          {[
            { id: "all" as const, label: "Best Sellers", count: bestSellers.length },
            { id: "bundles" as const, label: "Bundles & Kits", count: BUNDLES.length },
            { id: "new" as const, label: "New Arrivals", count: newProducts.length },
            { id: "bead" as const, label: "BEAD Ready", count: beadReady.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-indigo-600/15 text-indigo-400"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {tab.label}
              <span className="ml-1.5 text-xs text-neutral-600">({tab.count})</span>
            </button>
          ))}
        </div>

        {/* Bundles Tab */}
        {activeTab === "bundles" && (
          <section className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {BUNDLES.map((bundle, i) => (
                <motion.div
                  key={bundle.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <BundleCard bundle={bundle} />
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Products Grid */}
        {activeTab !== "bundles" && (
          <section>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {(activeTab === "all"
                ? bestSellers
                : activeTab === "new"
                ? newProducts
                : activeTab === "bead"
                ? beadReady
                : filteredProducts
              ).map((product, i) => (
                <motion.div
                  key={product.sku}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>

            {/* Show all products CTA */}
            <div className="text-center mt-12">
              <p className="text-neutral-500 mb-4">
                Showing {activeTab === "all" ? bestSellers.length : activeTab === "new" ? newProducts.length : beadReady.length} of 830+ products
              </p>
              <Button variant="outline" size="lg">
                View All Products
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </section>
        )}

        {/* All Products (when searching) */}
        {searchQuery && (
          <section className="mt-12">
            <h2 className="text-lg font-semibold text-white mb-4">
              Search Results for &ldquo;{searchQuery}&rdquo;
              <span className="text-neutral-500 font-normal ml-2">({filteredProducts.length} found)</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredProducts.map((product, i) => (
                <motion.div
                  key={product.sku}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.02 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <section className="mt-20 border-t border-[#262626] pt-16">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 border-indigo-500/20 bg-indigo-500/5">
              <h3 className="text-xl font-semibold text-white mb-2">Need Custom Assemblies?</h3>
              <p className="text-neutral-400 mb-4">
                Configure exact specifications with our cable builder. Any connector, fiber, length — built in 48 hours.
              </p>
              <Link href="/configurator">
                <Button>Open Configurator <ArrowRight className="w-4 h-4 ml-2" /></Button>
              </Link>
            </Card>
            <Card className="p-8 border-indigo-500/20 bg-indigo-500/5">
              <h3 className="text-xl font-semibold text-white mb-2">Upload Plans for Auto-Quote</h3>
              <p className="text-neutral-400 mb-4">
                Drop your network diagrams, CAD files, or bill of materials. Our AI extracts specs and generates a quote in minutes.
              </p>
              <Link href="/upload-plans">
                <Button variant="outline">Upload Plans <ArrowRight className="w-4 h-4 ml-2" /></Button>
              </Link>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
