"use client";

import Link from "next/link";
import { Zap, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductImage } from "@/components/shop/product-image";
import type { ProductFamily } from "@/lib/product-utils";

export function FamilyCard({ family }: { family: ProductFamily }) {
  const lowestPrice = Math.min(...family.variants.map((v) => v.price));
  const highestCompare = Math.max(...family.variants.filter(v => v.compareAt).map((v) => v.compareAt!));
  const inStockCount = family.variants.filter((v) => v.inStock).length;
  const lengths = family.variants.map((v) => v.length);
  const badge = family.variants.find((v) => v.badge)?.badge;

  const slug = family.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  return (
    <Link href={`/shop/${family.category}/${slug}`}>
      <div className="group bg-[#141414] border border-[#262626] rounded-xl hover:border-indigo-500/40 transition-all">
        {/* Image */}
        <div className="h-40 rounded-t-xl relative overflow-hidden">
          <ProductImage
            category={family.category}
            subcategory={family.subcategory}
            specs={family.specs}
            className="w-full h-full"
          />
          {badge && (
            <div className="absolute top-3 left-3">
              <Badge variant="indigo" className="text-xs">{badge}</Badge>
            </div>
          )}
          <div className="absolute top-3 right-3">
            <span className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
              <Zap className="w-3 h-3" /> {inStockCount} lengths in stock
            </span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-sm font-medium text-white mb-2 group-hover:text-indigo-400 transition-colors">
            {family.name}
          </h3>

          <div className="flex flex-wrap gap-1 mb-2">
            {family.specs.slice(0, 3).map((s) => (
              <span key={s} className="text-xs px-1.5 py-0.5 bg-[#1A1A1A] border border-[#262626] rounded text-neutral-500">
                {s}
              </span>
            ))}
          </div>

          {/* Length options preview */}
          <div className="flex flex-wrap gap-1 mb-3">
            {lengths.slice(0, 6).map((l) => (
              <span key={l} className="text-[10px] px-1.5 py-0.5 bg-[#1A1A1A] rounded text-neutral-400">
                {l}
              </span>
            ))}
            {lengths.length > 6 && (
              <span className="text-[10px] px-1.5 py-0.5 text-neutral-600">+{lengths.length - 6} more</span>
            )}
          </div>

          <div className="flex items-end gap-2">
            <span className="text-base font-bold text-white">From ${lowestPrice.toFixed(2)}</span>
            {highestCompare > 0 && (
              <span className="text-xs text-neutral-600">vs ${highestCompare.toFixed(2)}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
