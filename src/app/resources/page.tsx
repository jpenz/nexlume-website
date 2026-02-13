"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  FileText,
  Video,
  Download,
  Calculator,
  HelpCircle,
  ArrowRight,
  Search,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const resourceCategories = [
  {
    name: "Technical Guides",
    icon: BookOpen,
    count: 24,
    description: "Installation guides, best practices, and design references.",
    items: [
      "Fiber Optic Cable Selection Guide",
      "MPO/MTP Polarity Explained",
      "Singlemode vs Multimode: When to Use Each",
      "LSZH vs PVC vs Plenum Jacket Comparison",
    ],
  },
  {
    name: "Spec Sheets & Data",
    icon: FileText,
    count: 48,
    description: "Detailed specifications, compliance docs, and test data for every product.",
    items: [
      "LC Connector Specifications",
      "MPO-12 Trunk Cable Data Sheet",
      "Insertion Loss & Return Loss Standards",
      "Fiber Color Code Reference (TIA-598)",
    ],
  },
  {
    name: "Video Library",
    icon: Video,
    count: 12,
    description: "Installation tutorials, product demos, and factory tour content.",
    items: [
      "How to Terminate LC Connectors",
      "MPO Trunk Cable Installation Guide",
      "Factory Tour: How We Build Assemblies",
      "OTDR Testing Best Practices",
    ],
  },
  {
    name: "Tools & Calculators",
    icon: Calculator,
    count: 6,
    description: "Link budget calculators, cable length estimators, and fiber count planners.",
    items: [
      "Fiber Link Budget Calculator",
      "Cable Length Estimator",
      "Fiber Count Planner",
      "Attenuation Calculator",
    ],
  },
  {
    name: "Downloads",
    icon: Download,
    count: 32,
    description: "CAD files, Revit families, Visio stencils, and product catalogs.",
    items: [
      "2026 Product Catalog (PDF)",
      "AutoCAD Fiber Symbols Library",
      "Revit Connector Families",
      "Visio Network Stencils",
    ],
  },
  {
    name: "FAQ & Support",
    icon: HelpCircle,
    count: 40,
    description: "Frequently asked questions, warranty info, and how to get support.",
    items: [
      "Ordering & Lead Times",
      "Custom Assembly Process",
      "Warranty & Returns Policy",
      "How to Request a Quote",
    ],
  },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="border-b border-[#262626] bg-gradient-to-b from-[#0A0A0A] to-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <Badge variant="indigo" className="mb-4">Resources</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Knowledge Base
          </h1>
          <p className="text-lg text-neutral-400 max-w-2xl mb-8">
            Technical guides, spec sheets, calculators, and everything you need to design
            and deploy fiber optic infrastructure.
          </p>
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
            <Input
              placeholder="Search resources..."
              className="pl-10 h-12 bg-[#141414] border-[#262626] text-white"
            />
          </div>
        </div>
      </section>

      {/* Resource Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resourceCategories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="h-full group hover:border-indigo-500/50 transition-all">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                        <cat.icon className="w-5 h-5 text-indigo-400" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-white">{cat.name}</h3>
                        <span className="text-xs text-neutral-500">{cat.count} resources</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-400 mb-4">{cat.description}</p>
                  <ul className="space-y-2">
                    {cat.items.map((item) => (
                      <li key={item}>
                        <Link
                          href="#"
                          className="flex items-center gap-2 text-sm text-neutral-300 hover:text-indigo-400 transition-colors"
                        >
                          <ArrowRight className="w-3 h-3 text-neutral-600" />
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
