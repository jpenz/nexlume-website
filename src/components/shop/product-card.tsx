"use client";

import Link from "next/link";
import { ShoppingCart, Zap, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductImage } from "@/components/shop/product-image";
import type { ShopProduct } from "@/data/shop-catalog";

const badgeVariant: Record<string, "indigo" | "secondary"> = {
  "Best Seller": "indigo",
  "New": "indigo",
  "Sale": "indigo",
  "BEAD Ready": "secondary",
  "Quick Ship": "secondary",
};

export function ProductCard({ product }: { product: ShopProduct }) {
  const savings = product.compareAt
    ? Math.round(((product.compareAt - product.price) / product.compareAt) * 100)
    : 0;

  return (
    <div className="group bg-[#141414] border border-[#262626] rounded-xl hover:border-indigo-500/40 transition-all">
      {/* Product Image */}
      <div className="h-40 rounded-t-xl relative overflow-hidden">
        <ProductImage
          category={product.category}
          subcategory={product.subcategory}
          specs={product.specs}
          className="w-full h-full"
        />
        {product.badge && (
          <div className="absolute top-3 left-3">
            <Badge variant={badgeVariant[product.badge] || "secondary"} className="text-xs">
              {product.badge}
            </Badge>
          </div>
        )}
        {product.quickShip && (
          <div className="absolute top-3 right-3">
            <span className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
              <Zap className="w-3 h-3" /> Ships Today
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <p className="text-xs text-neutral-500 mb-1 font-mono">{product.sku}</p>
        <h3 className="text-sm font-medium text-white mb-2 line-clamp-2 group-hover:text-indigo-400 transition-colors">
          {product.name}
        </h3>

        <div className="flex flex-wrap gap-1 mb-3">
          {product.specs.slice(0, 3).map((s) => (
            <span key={s} className="text-xs px-1.5 py-0.5 bg-[#1A1A1A] border border-[#262626] rounded text-neutral-500">
              {s}
            </span>
          ))}
        </div>

        <div className="flex items-end gap-2 mb-3">
          <span className="text-lg font-bold text-white">${product.price.toFixed(2)}</span>
          {product.compareAt && (
            <>
              <span className="text-sm text-neutral-600 line-through">${product.compareAt.toFixed(2)}</span>
              <span className="text-xs text-emerald-400 font-medium">-{savings}%</span>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" className="flex-1 text-xs h-8">
            <ShoppingCart className="w-3 h-3 mr-1" />
            Add to Cart
          </Button>
          {product.inStock && (
            <span className="flex items-center gap-1 text-xs text-emerald-400">
              <Check className="w-3 h-3" /> In Stock
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
