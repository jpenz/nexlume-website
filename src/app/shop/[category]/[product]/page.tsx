"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
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
  Download,
  Cable,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ProductImage } from "@/components/shop/product-image";
import { TOP_SKUS } from "@/data/shop-catalog";
import { FULL_CATALOG } from "@/data/full-catalog";
import { groupIntoFamilies, type ProductFamily, type ProductVariant } from "@/lib/product-utils";

const JACKET_OPTIONS = ["LSZH", "PVC", "OFNP Plenum", "OFNR Riser"];
const COLOR_OPTIONS = [
  { name: "Yellow (SM)", value: "yellow", hex: "#EAB308" },
  { name: "Blue (SM)", value: "blue", hex: "#3B82F6" },
  { name: "Aqua (OM3/OM4)", value: "aqua", hex: "#06B6D4" },
  { name: "Lime (OM5)", value: "lime", hex: "#84CC16" },
  { name: "Orange (OM1/OM2)", value: "orange", hex: "#F97316" },
  { name: "Violet (OM4)", value: "violet", hex: "#8B5CF6" },
];

export default function ProductDetailPage() {
  const params = useParams();
  const slug = String(params.product || "");

  const allProducts = useMemo(() => [...FULL_CATALOG, ...TOP_SKUS], []);
  const families = useMemo(() => groupIntoFamilies(allProducts), [allProducts]);

  // Find the matching family or fall back to a single product
  const family = useMemo(() => {
    // Try matching by slug
    const s = slug.toLowerCase();
    return families.find((f) => {
      const fSlug = f.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      return fSlug.includes(s) || s.includes(fSlug.slice(0, 20));
    }) || families.find((f) =>
      f.variants.some((v) => v.sku.toLowerCase().includes(s))
    ) || null;
  }, [families, slug]);

  // For non-family products (transceivers, adapters, etc.)
  const singleProduct = useMemo(() => {
    if (family) return null;
    return allProducts.find((p) => p.sku.toLowerCase().includes(slug.toLowerCase())) || allProducts[0];
  }, [family, allProducts, slug]);

  // If it's a family product (patch cords with length variants)
  if (family) {
    return <FamilyProductPage family={family} />;
  }

  // Single product (transceivers, adapters, etc.)
  if (singleProduct) {
    return <SingleProductPage product={singleProduct} allProducts={allProducts} />;
  }

  return <div className="p-12 text-center text-neutral-500">Product not found</div>;
}

/* ─── Family Product Page (patch cords with length/jacket/color selectors) ─── */
function FamilyProductPage({ family }: { family: ProductFamily }) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(family.variants[0]);
  const [selectedJacket, setSelectedJacket] = useState(family.jacket || "LSZH");
  const [selectedColor, setSelectedColor] = useState(
    family.fiber.includes("OM") ? "aqua" : "yellow"
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"specs" | "docs" | "reviews">("specs");

  const savings = selectedVariant.compareAt
    ? Math.round(((selectedVariant.compareAt - selectedVariant.price) / selectedVariant.compareAt) * 100)
    : 0;

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-[#262626] bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center gap-2 text-sm text-neutral-500">
            <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href={`/shop/${family.category}`} className="hover:text-white transition-colors capitalize">
              {family.category.replace(/-/g, " ")}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-neutral-300 truncate">{family.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Product Image */}
          <div>
            <div className="bg-[#141414] border border-[#262626] rounded-2xl overflow-hidden aspect-square relative">
              <ProductImage
                category={family.category}
                subcategory={family.subcategory}
                specs={family.specs}
                size="lg"
                className="w-full h-full"
              />
              {selectedVariant.badge && (
                <div className="absolute top-4 left-4">
                  <Badge variant="indigo">{selectedVariant.badge}</Badge>
                </div>
              )}
              {selectedVariant.quickShip && (
                <div className="absolute top-4 right-4">
                  <span className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                    <Zap className="w-3 h-3" /> Ships Today
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right: Product Info */}
          <div>
            <p className="text-xs font-mono text-neutral-500 mb-2">{selectedVariant.sku}</p>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {family.name}
            </h1>
            <p className="text-neutral-400 mb-4">
              {family.specs.join(" · ")}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className={`w-4 h-4 ${s <= 4 ? "text-amber-400 fill-amber-400" : "text-neutral-600"}`} />
                ))}
              </div>
              <span className="text-sm text-neutral-400">4.8 (127 reviews)</span>
            </div>

            {/* ═══ LENGTH SELECTOR ═══ */}
            <div className="mb-6">
              <label className="text-sm font-medium text-neutral-300 mb-3 block">
                Cable Length: <span className="text-indigo-400">{selectedVariant.length}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {family.variants.map((v) => (
                  <button
                    key={v.sku}
                    onClick={() => setSelectedVariant(v)}
                    className={`px-4 py-2.5 rounded-lg text-sm border transition-all relative ${
                      v.sku === selectedVariant.sku
                        ? "border-indigo-500 bg-indigo-600/10 text-indigo-400 font-medium"
                        : v.inStock
                        ? "border-[#333333] text-neutral-300 hover:border-indigo-500/50"
                        : "border-[#262626] text-neutral-600 opacity-60"
                    }`}
                  >
                    {v.length}
                    <span className="block text-xs mt-0.5 text-neutral-500">${v.price.toFixed(2)}</span>
                    {!v.inStock && (
                      <span className="absolute -top-1 -right-1 text-[10px] bg-neutral-800 text-neutral-500 px-1 rounded">
                        PO
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* ═══ JACKET SELECTOR ═══ */}
            <div className="mb-6">
              <label className="text-sm font-medium text-neutral-300 mb-3 block">
                Jacket: <span className="text-indigo-400">{selectedJacket}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {JACKET_OPTIONS.map((j) => (
                  <button
                    key={j}
                    onClick={() => setSelectedJacket(j)}
                    className={`px-3 py-1.5 rounded-lg text-sm border transition-all ${
                      j === selectedJacket
                        ? "border-indigo-500 bg-indigo-600/10 text-indigo-400"
                        : "border-[#333333] text-neutral-400 hover:border-indigo-500/50"
                    }`}
                  >
                    {j}
                  </button>
                ))}
              </div>
            </div>

            {/* ═══ COLOR SELECTOR ═══ */}
            <div className="mb-6">
              <label className="text-sm font-medium text-neutral-300 mb-3 block">
                Cable Color: <span className="text-indigo-400">{COLOR_OPTIONS.find(c => c.value === selectedColor)?.name}</span>
              </label>
              <div className="flex gap-3">
                {COLOR_OPTIONS.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setSelectedColor(c.value)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      c.value === selectedColor
                        ? "border-white scale-110"
                        : "border-transparent hover:border-neutral-500"
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* ═══ PRICING ═══ */}
            <div className="bg-[#141414] border border-[#262626] rounded-xl p-6 mb-6">
              <div className="flex items-end gap-3 mb-2">
                <span className="text-3xl font-bold text-white">${selectedVariant.price.toFixed(2)}</span>
                {selectedVariant.compareAt && (
                  <>
                    <span className="text-lg text-neutral-600 line-through">${selectedVariant.compareAt.toFixed(2)}</span>
                    <Badge variant="indigo" className="text-xs">Save {savings}%</Badge>
                  </>
                )}
              </div>
              <p className="text-xs text-neutral-500 mb-4">
                vs. ${selectedVariant.compareAt?.toFixed(2)} at FS.com — same specs, same performance
              </p>

              {/* Quantity + Add to Cart */}
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-[#333333] rounded-lg">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:bg-white/5">
                    <Minus className="w-4 h-4 text-neutral-400" />
                  </button>
                  <span className="w-12 text-center text-white text-sm font-medium">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:bg-white/5">
                    <Plus className="w-4 h-4 text-neutral-400" />
                  </button>
                </div>
                <Button size="lg" className="flex-1">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart — ${(selectedVariant.price * quantity).toFixed(2)}
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

            {/* Stock */}
            <div className="flex items-center gap-2 text-sm">
              {selectedVariant.inStock ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">In Stock</span>
                  <span className="text-neutral-500">— Ships from Michigan</span>
                </>
              ) : (
                <>
                  <span className="text-amber-400 font-medium">Made to Order</span>
                  <span className="text-neutral-500">— 2-4 week lead time</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
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
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Optical</h3>
                <div className="space-y-3">
                  {[
                    ["Fiber Type", family.specs[0] || "OS2 9/125μm"],
                    ["Insertion Loss", "≤ 0.2 dB"],
                    ["Return Loss", family.specs.some(s => s.includes("APC")) ? "≥ 65 dB (APC)" : "≥ 55 dB (UPC)"],
                    ["Wavelength", "1310nm / 1550nm"],
                    ["Temp Range", "-20°C to +70°C"],
                  ].map(([l, v]) => (
                    <div key={l} className="flex justify-between py-2 border-b border-[#1A1A1A]">
                      <span className="text-sm text-neutral-500">{l}</span>
                      <span className="text-sm text-white font-mono">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Physical</h3>
                <div className="space-y-3">
                  {[
                    ["Configuration", family.config],
                    ["Jacket", selectedJacket],
                    ["Cable OD", "2.0mm"],
                    ["Bend Radius", "≤ 10mm"],
                    ["Connector Polish", family.specs.some(s => s.includes("APC")) ? "APC (8°)" : "UPC (0°)"],
                    ["Ferrule", "Zirconia Ceramic"],
                    ["Available Lengths", family.variants.map(v => v.length).join(", ")],
                  ].map(([l, v]) => (
                    <div key={l} className="flex justify-between py-2 border-b border-[#1A1A1A]">
                      <span className="text-sm text-neutral-500">{l}</span>
                      <span className="text-sm text-white font-mono">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Compliance</h3>
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
              ].map((doc) => (
                <button key={doc.name} className="flex items-center gap-4 p-4 bg-[#141414] border border-[#262626] rounded-lg hover:border-indigo-500/40 transition-all text-left">
                  <Download className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                  <div>
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
      </div>
    </div>
  );
}

/* ─── Single Product Page (transceivers, adapters, tools — no length variants) ─── */
function SingleProductPage({ product, allProducts }: { product: import("@/data/shop-catalog").ShopProduct; allProducts: import("@/data/shop-catalog").ShopProduct[] }) {
  const [quantity, setQuantity] = useState(1);
  const savings = product.compareAt
    ? Math.round(((product.compareAt - product.price) / product.compareAt) * 100)
    : 0;
  const related = allProducts.filter(p => p.category === product.category && p.sku !== product.sku).slice(0, 4);

  return (
    <div className="min-h-screen">
      <div className="border-b border-[#262626] bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center gap-2 text-sm text-neutral-500">
            <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href={`/shop/${product.category}`} className="hover:text-white transition-colors capitalize">
              {product.category.replace(/-/g, " ")}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-neutral-300 truncate max-w-[300px]">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-[#141414] border border-[#262626] rounded-2xl overflow-hidden aspect-square relative">
            <ProductImage category={product.category} subcategory={product.subcategory} specs={product.specs} size="lg" className="w-full h-full" />
            {product.badge && <div className="absolute top-4 left-4"><Badge variant="indigo">{product.badge}</Badge></div>}
          </div>

          <div>
            <p className="text-xs font-mono text-neutral-500 mb-2">{product.sku}</p>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">{product.name}</h1>
            <div className="flex flex-wrap gap-2 mb-6">
              {product.specs.map((s) => (
                <span key={s} className="text-xs px-2.5 py-1 bg-[#1A1A1A] border border-[#262626] rounded-lg text-neutral-300">{s}</span>
              ))}
            </div>

            <div className="bg-[#141414] border border-[#262626] rounded-xl p-6 mb-6">
              <div className="flex items-end gap-3 mb-4">
                <span className="text-3xl font-bold text-white">${product.price.toFixed(2)}</span>
                {product.compareAt && (
                  <>
                    <span className="text-lg text-neutral-600 line-through">${product.compareAt.toFixed(2)}</span>
                    <Badge variant="indigo" className="text-xs">Save {savings}%</Badge>
                  </>
                )}
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-[#333333] rounded-lg">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:bg-white/5"><Minus className="w-4 h-4 text-neutral-400" /></button>
                  <span className="w-12 text-center text-white text-sm font-medium">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:bg-white/5"><Plus className="w-4 h-4 text-neutral-400" /></button>
                </div>
                <Button size="lg" className="flex-1">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart — ${(product.price * quantity).toFixed(2)}
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Check className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 font-medium">In Stock</span>
              <span className="text-neutral-500">— Ships from Michigan</span>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-16 pt-12 border-t border-[#262626]">
            <h2 className="text-xl font-semibold text-white mb-6">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p) => (
                <Card key={p.sku} className="p-4 hover:border-indigo-500/40 transition-all cursor-pointer">
                  <div className="h-24 rounded-lg overflow-hidden mb-3">
                    <ProductImage category={p.category} specs={p.specs} size="sm" className="w-full h-full" />
                  </div>
                  <p className="text-xs text-neutral-500 font-mono mb-1">{p.sku}</p>
                  <h3 className="text-sm text-white mb-2 line-clamp-2">{p.name}</h3>
                  <span className="text-sm font-bold text-white">${p.price.toFixed(2)}</span>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
