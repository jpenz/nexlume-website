"use client";

import { Package, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Bundle } from "@/data/shop-catalog";

export function BundleCard({ bundle }: { bundle: Bundle }) {
  return (
    <div className="bg-[#141414] border border-[#262626] rounded-xl hover:border-indigo-500/40 transition-all overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600/10 to-purple-600/10 p-5 border-b border-[#262626]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-semibold text-white">{bundle.name}</h3>
          </div>
          {bundle.badge && (
            <Badge variant="indigo" className="text-xs">{bundle.badge}</Badge>
          )}
        </div>
        <p className="text-sm text-neutral-400">{bundle.description}</p>
      </div>

      {/* Items */}
      <div className="p-5">
        <ul className="space-y-2 mb-4">
          {bundle.items.map((item) => (
            <li key={item.name} className="flex items-start gap-2 text-sm">
              <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
              <span className="text-neutral-300">
                {item.name}
                {item.qty > 1 && <span className="text-neutral-500"> ×{item.qty}</span>}
              </span>
              <span className="text-neutral-600 ml-auto text-xs">${item.value}</span>
            </li>
          ))}
        </ul>

        <div className="border-t border-[#262626] pt-4">
          <div className="flex items-end justify-between mb-3">
            <div>
              <span className="text-2xl font-bold text-white">${bundle.bundlePrice.toFixed(2)}</span>
              <span className="text-sm text-emerald-400 ml-2">Save ${bundle.savings}</span>
            </div>
          </div>
          <Button className="w-full">
            Add Bundle to Cart
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
