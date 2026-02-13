"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Search, SlidersHorizontal, Grid3X3, List } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/shop/product-card";
import { SHOP_CATEGORIES, TOP_SKUS } from "@/data/shop-catalog";

export default function CategoryPage() {
  const params = useParams();
  const slug = String(params.category || "");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const category = SHOP_CATEGORIES.find((c) => c.slug === slug);
  const products = TOP_SKUS.filter((p) => p.category === slug);

  const filteredProducts = searchQuery
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.sku.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-[#262626] bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center gap-2 text-sm text-neutral-500">
            <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-neutral-300">{category?.name || slug}</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <section className="border-b border-[#262626]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{category?.icon || "📦"}</span>
            <h1 className="text-3xl font-bold text-white">{category?.name || slug}</h1>
          </div>
          <p className="text-neutral-400 mb-6 max-w-2xl">{category?.description}</p>

          <div className="flex gap-3 max-w-xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <Input
                placeholder={`Search ${category?.name || "products"}...`}
                className="pl-9 h-10 bg-[#141414] border-[#262626] text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-[240px_1fr] gap-8">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block">
            <h3 className="text-sm font-semibold text-white mb-4">Subcategories</h3>
            <ul className="space-y-1">
              {category?.subcategories.map((sub) => (
                <li key={sub.slug}>
                  <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-neutral-400 hover:text-white hover:bg-white/5 transition-all flex justify-between">
                    <span>{sub.name}</span>
                    <span className="text-xs text-neutral-600">{sub.estimatedSKUs}</span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <h3 className="text-sm font-semibold text-white mb-4">Price Range</h3>
              <div className="space-y-2">
                {["Under $10", "$10 - $25", "$25 - $50", "$50 - $100", "$100+"].map((range) => (
                  <label key={range} className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white cursor-pointer">
                    <input type="checkbox" className="rounded border-[#333333] bg-[#1A1A1A] accent-indigo-500" />
                    {range}
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-semibold text-white mb-4">Availability</h3>
              <label className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-[#333333] bg-[#1A1A1A] accent-indigo-500" />
                In Stock Only
              </label>
            </div>
          </aside>

          {/* Products */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-neutral-500">
                {filteredProducts.length} products
                {category && <span className="text-neutral-600"> of {category.estimatedSKUs} total</span>}
              </p>
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

            {filteredProducts.length > 0 ? (
              <div className={
                viewMode === "grid"
                  ? "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
                  : "flex flex-col gap-3"
              }>
                {filteredProducts.map((product, i) => (
                  <motion.div
                    key={product.sku}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-neutral-500 mb-4">No products found. Full catalog coming soon.</p>
                <Link href="/shop">
                  <Button variant="outline">Back to Shop</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
