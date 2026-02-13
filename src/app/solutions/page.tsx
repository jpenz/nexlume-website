"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Building2,
  Radio,
  Server,
  Hospital,
  Factory,
  GraduationCap,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const industries = [
  {
    name: "Data Centers & Cloud",
    slug: "data-centers",
    icon: Server,
    description: "High-density MPO/MTP trunk cables and breakout assemblies for hyperscale and colocation facilities.",
    stats: "400G/800G Ready",
    highlights: ["MPO-12/24 trunk cables", "Type A/B/C polarity options", "OM4/OM5 & OS2 support", "Same-day config for stock SKUs"],
  },
  {
    name: "Telecommunications",
    slug: "telecom",
    icon: Radio,
    description: "FTTH drop cables, distribution cables, and splice-on connectors for ISPs and telcos.",
    stats: "BEAD Program Ready",
    highlights: ["FTTH drop cable assemblies", "SC/APC & LC/APC connectors", "Outdoor-rated & armored", "BEAD/RDOF compliant"],
  },
  {
    name: "Enterprise Campus",
    slug: "enterprise",
    icon: Building2,
    description: "Backbone and horizontal fiber for corporate campuses, high-rises, and multi-tenant buildings.",
    stats: "Plenum & Riser Rated",
    highlights: ["OFNP plenum cables", "Pre-terminated cassettes", "LC/SC patch panels", "Custom length runs"],
  },
  {
    name: "Healthcare",
    slug: "healthcare",
    icon: Hospital,
    description: "Reliable, low-latency fiber for hospital networks, imaging systems, and telemedicine.",
    stats: "HIPAA Infrastructure",
    highlights: ["LSZH jacket (low smoke)", "Armored for protection", "Redundant path designs", "Clean-room compatible"],
  },
  {
    name: "Manufacturing & Industrial",
    slug: "manufacturing",
    icon: Factory,
    description: "Ruggedized fiber assemblies for factory floors, SCADA networks, and harsh environments.",
    stats: "IP67+ Options",
    highlights: ["Armored & ruggedized", "Extended temp range", "Oil/chemical resistant", "Custom connector configs"],
  },
  {
    name: "Education & Government",
    slug: "education",
    icon: GraduationCap,
    description: "E-Rate eligible fiber solutions for K-12 schools, universities, and government facilities.",
    stats: "E-Rate Eligible",
    highlights: ["E-Rate compliant", "Campus backbone", "Budget-friendly options", "Volume pricing"],
  },
];

const whyNexlume = [
  { icon: Zap, title: "48-Hour Turnaround", description: "Stock configurations ship same day. Custom assemblies in 48 hours." },
  { icon: Shield, title: "100% Tested", description: "Every assembly IL/RL tested. Test reports included with every order." },
  { icon: Factory, title: "Made in Michigan", description: "Manufactured in our Detroit-area facility. Buy American compliant." },
];

export default function SolutionsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="border-b border-[#262626] bg-gradient-to-b from-[#0A0A0A] to-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <Badge variant="indigo" className="mb-4">Industry Solutions</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Fiber for Every Industry
          </h1>
          <p className="text-lg text-neutral-400 max-w-2xl">
            Purpose-built fiber optic assemblies for data centers, telecom, healthcare,
            enterprise, and industrial applications.
          </p>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, i) => (
            <motion.div
              key={industry.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={`/solutions/${industry.slug}`}>
                <Card className="h-full group hover:border-indigo-500/50 transition-all cursor-pointer">
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                        <industry.icon className="w-5 h-5 text-indigo-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors">
                          {industry.name}
                        </h3>
                        <span className="text-xs text-indigo-400">{industry.stats}</span>
                      </div>
                    </div>
                    <p className="text-sm text-neutral-400 mb-4">{industry.description}</p>
                    <ul className="space-y-2">
                      {industry.highlights.map((h) => (
                        <li key={h} className="flex items-center gap-2 text-sm text-neutral-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 flex items-center text-sm text-indigo-400 group-hover:gap-2 transition-all">
                      View solutions <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Nexlume */}
      <section className="border-t border-[#262626] bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <h2 className="text-2xl font-semibold text-white text-center mb-10">Why Nexlume</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyNexlume.map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#262626]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Need a Custom Solution?</h2>
          <p className="text-neutral-400 mb-8 max-w-lg mx-auto">
            Upload your plans and get an AI-powered quote in minutes, or talk to our engineering team.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/upload-plans">
              <Button>Upload Plans</Button>
            </Link>
            <Link href="/configurator">
              <Button variant="outline">Configure Online</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
