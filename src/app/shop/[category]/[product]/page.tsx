"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Zap,
  Check,
  Minus,
  Plus,
  Shield,
  Truck,
  FileText,
  ChevronRight,
  Star,
  Cable,
  ArrowLeft,
  Package,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ProductImage } from "@/components/shop/product-image";
import { TOP_SKUS } from "@/data/shop-catalog";
import { FULL_CATALOG } from "@/data/full-catalog";

export default function ProductDetailPage() {
  const params = useParams();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"specs" | "docs" | "reviews">("specs");

  // Find product by SKU fragment in URL
  const allProducts = [...FULL_CATALOG, ...TOP_SKUS];
  const product = allProducts.find(
    (p) => p.sku.toLowerCase().includes(String(params.product || "").toLowerCase())
  ) || TOP_SKUS[0]; // fallback to first product for demo

  const savings = product.compareAt
    ? Math.round(((product.compareAt - product.price) / product.compareAt) * 100)
    : 0;

  const relatedProducts = allProducts.filter(
    (p) => p.category === product.category && p.sku !== product.sku
  ).slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-[#262626] bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center gap-2 text-sm text-neutral-500">
            <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href={`/shop/${product.category}`} className="hover:text-white transition-colors capitalize">
              {product.category.replace("-", " ")}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-neutral-300 truncate max-w-[300px]">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Product Image */}
          <div>
            <div className="bg-[#141414] border border-[#262626] rounded-2xl overflow-hidden aspect-square relative">
              <ProductImage
                category={product.category}
                subcategory={product.subcategory}
                specs={product.specs}
                size="lg"
                className="w-full h-full"
              />
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <Badge variant="indigo">{product.badge}</Badge>
                </div>
              )}
              {product.quickShip && (
                <div className="absolute top-4 right-4">
                  <span className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                    <Zap className="w-3 h-3" /> Ships Today
                  </span>
                </div>
              )}
            </div>
            {/* Thumbnail row placeholder */}
            <div className="flex gap-3 mt-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`w-20 h-20 rounded-lg border flex items-center justify-center ${
                    i === 1 ? "border-indigo-500 bg-[#141414]" : "border-[#262626] bg-[#111111]"
                  }`}
                >
                  <Cable className="w-8 h-8 text-neutral-700" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div>
            <p className="text-xs font-mono text-neutral-500 mb-2">{product.sku}</p>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {product.name}
            </h1>

            {/* Rating placeholder */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className={`w-4 h-4 ${s <= 4 ? "text-amber-400 fill-amber-400" : "text-neutral-600"}`} />
                ))}
              </div>
              <span className="text-sm text-neutral-400">4.8 (127 reviews)</span>
            </div>

            {/* Specs badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {product.specs.map((spec) => (
                <span
                  key={spec}
                  className="text-xs px-2.5 py-1 bg-[#1A1A1A] border border-[#262626] rounded-lg text-neutral-300"
                >
                  {spec}
                </span>
              ))}
            </div>

            {/* Pricing */}
            <div className="bg-[#141414] border border-[#262626] rounded-xl p-6 mb-6">
              <div className="flex items-end gap-3 mb-2">
                <span className="text-3xl font-bold text-white">${product.price.toFixed(2)}</span>
                {product.compareAt && (
                  <>
                    <span className="text-lg text-neutral-600 line-through">${product.compareAt.toFixed(2)}</span>
                    <Badge variant="indigo" className="text-xs">Save {savings}%</Badge>
                  </>
                )}
              </div>
              {product.compareAt && (
                <p className="text-xs text-neutral-500">
                  vs. ${product.compareAt.toFixed(2)} at FS.com — same specs, same performance
                </p>
              )}

              {/* Quantity */}
              <div className="flex items-center gap-4 mt-6">
                <div className="flex items-center border border-[#333333] rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-white/5 transition-colors"
                  >
                    <Minus className="w-4 h-4 text-neutral-400" />
                  </button>
                  <span className="w-12 text-center text-white text-sm font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-white/5 transition-colors"
                  >
                    <Plus className="w-4 h-4 text-neutral-400" />
                  </button>
                </div>
                <Button size="lg" className="flex-1">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart — ${(product.price * quantity).toFixed(2)}
                </Button>
              </div>

              {/* Volume pricing */}
              <div className="mt-4 pt-4 border-t border-[#262626]">
                <p className="text-xs text-neutral-500 mb-2">Volume pricing:</p>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { qty: "1-9", pct: "" },
                    { qty: "10-49", pct: "-5%" },
                    { qty: "50-99", pct: "-10%" },
                    { qty: "100+", pct: "-15%" },
                  ].map((tier) => (
                    <div key={tier.qty} className="text-center px-2 py-1.5 bg-[#1A1A1A] rounded-lg">
                      <div className="text-xs font-medium text-white">{tier.qty}</div>
                      <div className="text-xs text-indigo-400">{tier.pct || "List"}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { icon: Truck, text: "Same-Day Ship", sub: "Orders before 3PM ET" },
                { icon: Shield, text: "Lifetime Warranty", sub: "Full replacement" },
                { icon: FileText, text: "Test Report", sub: "IL/RL included" },
              ].map((badge) => (
                <div key={badge.text} className="text-center p-3 bg-[#111111] border border-[#262626] rounded-lg">
                  <badge.icon className="w-5 h-5 text-indigo-400 mx-auto mb-1" />
                  <div className="text-xs font-medium text-white">{badge.text}</div>
                  <div className="text-xs text-neutral-500">{badge.sub}</div>
                </div>
              ))}
            </div>

            {/* Stock status */}
            <div className="flex items-center gap-2 text-sm">
              <Check className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 font-medium">In Stock</span>
              <span className="text-neutral-500">— Ships from Michigan</span>
            </div>
          </div>
        </div>

        {/* Tabs: Specs / Docs / Reviews */}
        <div className="mt-16">
          <div className="flex gap-1 border-b border-[#262626] mb-8">
            {[
              { id: "specs" as const, label: "Technical Specifications" },
              { id: "docs" as const, label: "Documents & Downloads" },
              { id: "reviews" as const, label: "Reviews (127)" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3 text-sm font-medium border-b-2 transition-all ${
                  activeTab === tab.id
                    ? "border-indigo-500 text-indigo-400"
                    : "border-transparent text-neutral-500 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "specs" && (
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Optical Specifications</h3>
                <div className="space-y-3">
                  {[
                    ["Fiber Type", product.specs[0] || "OS2 9/125μm"],
                    ["Insertion Loss", "≤ 0.2 dB"],
                    ["Return Loss", "≥ 55 dB (UPC) / ≥ 65 dB (APC)"],
                    ["Operating Wavelength", "1310nm / 1550nm"],
                    ["Operating Temperature", "-20°C to +70°C"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between py-2 border-b border-[#1A1A1A]">
                      <span className="text-sm text-neutral-500">{label}</span>
                      <span className="text-sm text-white font-mono">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Physical Specifications</h3>
                <div className="space-y-3">
                  {[
                    ["Configuration", product.specs[1] || "Duplex"],
                    ["Jacket Material", product.specs[2] || "LSZH"],
                    ["Cable Diameter", "2.0mm"],
                    ["Bend Radius", "≤ 10mm"],
                    ["Connector Polish", "UPC"],
                    ["Housing Material", "Zirconia Ferrule"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between py-2 border-b border-[#1A1A1A]">
                      <span className="text-sm text-neutral-500">{label}</span>
                      <span className="text-sm text-white font-mono">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Compliance & Certifications</h3>
                <div className="flex flex-wrap gap-2">
                  {["RoHS", "REACH", "UL Listed", "TIA/EIA-568", "Telcordia GR-326", "IEC 61753"].map((cert) => (
                    <span key={cert} className="text-xs px-3 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "docs" && (
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { name: "Product Data Sheet", format: "PDF", size: "245 KB" },
                { name: "Test Report Template", format: "PDF", size: "180 KB" },
                { name: "Installation Guide", format: "PDF", size: "1.2 MB" },
                { name: "Compliance Certificates", format: "ZIP", size: "3.4 MB" },
                { name: "AutoCAD Drawing", format: "DWG", size: "520 KB" },
                { name: "3D Model (STEP)", format: "STEP", size: "1.8 MB" },
              ].map((doc) => (
                <button key={doc.name} className="flex items-center gap-4 p-4 bg-[#141414] border border-[#262626] rounded-lg hover:border-indigo-500/40 transition-all text-left">
                  <Download className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white">{doc.name}</div>
                    <div className="text-xs text-neutral-500">{doc.format} · {doc.size}</div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="text-center py-12">
              <Star className="w-12 h-12 text-neutral-700 mx-auto mb-4" />
              <p className="text-neutral-500">Customer reviews will be displayed here.</p>
              <Button variant="outline" className="mt-4">Write a Review</Button>
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 pt-12 border-t border-[#262626]">
            <h2 className="text-xl font-semibold text-white mb-6">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((p) => (
                <Card key={p.sku} className="p-4 hover:border-indigo-500/40 transition-all cursor-pointer">
                  <div className="h-24 bg-[#1A1A1A] rounded-lg flex items-center justify-center mb-3">
                    <Cable className="w-8 h-8 text-neutral-700" />
                  </div>
                  <p className="text-xs text-neutral-500 font-mono mb-1">{p.sku}</p>
                  <h3 className="text-sm text-white mb-2 line-clamp-2">{p.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">${p.price.toFixed(2)}</span>
                    {p.compareAt && (
                      <span className="text-xs text-neutral-600 line-through">${p.compareAt.toFixed(2)}</span>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
