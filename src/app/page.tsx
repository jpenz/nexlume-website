"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Cable,
  Cpu,
  Radio,
  Globe,
  Factory,
  Wrench,
  ArrowRight,
  Zap,
  Shield,
  Clock,
  Upload,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const categories = [
  { name: "Cable Assemblies", icon: Cable, count: "500+", href: "/products?category=cable-assemblies" },
  { name: "Transceivers & Optics", icon: Cpu, count: "200+", href: "/products?category=transceivers" },
  { name: "MPO/MTP Solutions", icon: Radio, count: "150+", href: "/products?category=mpo-mtp" },
  { name: "Structured Cabling", icon: Globe, count: "300+", href: "/products?category=structured-cabling" },
  { name: "Patch Panels", icon: Factory, count: "100+", href: "/products?category=patch-panels" },
  { name: "Tools & Testing", icon: Wrench, count: "50+", href: "/products?category=tools-accessories" },
];

const valueProps = [
  {
    icon: Zap,
    title: "48-Hour Custom Assembly",
    description: "Standard lead times that beat the industry. Rush orders available for critical deployments.",
  },
  {
    icon: Shield,
    title: "100% Tested & Certified",
    description: "Every assembly tested to TIA/EIA standards. TAA compliant. OFNR/OFNP plenum rated.",
  },
  {
    icon: Clock,
    title: "AI-Powered Quoting",
    description: "Upload your deployment plans and get an instant, accurate quote. No waiting for callbacks.",
  },
  {
    icon: Factory,
    title: "Made in Michigan",
    description: "Assembled in our SE Michigan facility. Buy American Act compliant. Supporting US manufacturing.",
  },
];

const certifications = [
  "TAA Compliant",
  "ISO 9001",
  "TIA/EIA Certified",
  "UL Listed",
  "RoHS",
  "Buy American Act",
];

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/5 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-indigo-600/8 rounded-full blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-20 sm:pt-32 sm:pb-28">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial="initial"
            animate="animate"
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <Badge variant="indigo" className="mb-6">
                <Sparkles className="w-3 h-3 mr-1" />
                Now with AI-Powered Plan Analysis
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]"
            >
              Precision Fiber Optic
              <br />
              <span className="bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text text-transparent">
                Solutions
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 text-lg sm:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed"
            >
              Custom cable assemblies for data centers, 5G networks, and
              broadband deployments. Configure online, upload your plans, or get
              a quote in 60 seconds.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/configurator">
                <Button size="lg">
                  <Cable className="w-4 h-4" />
                  Build Your Cable
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/upload-plans">
                <Button variant="secondary" size="lg">
                  <Upload className="w-4 h-4" />
                  Upload Plans for Quote
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-y border-[#1A1A1A] bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {certifications.map((cert) => (
              <span key={cert} className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                {cert}
              </span>
            ))}
            <span className="text-xs font-medium text-indigo-400 uppercase tracking-wider">
              25+ Years Experience
            </span>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Everything Fiber Optic
            </h2>
            <p className="mt-4 text-neutral-400 max-w-xl mx-auto">
              From standard patch cables to custom high-density trunk assemblies.
              Configure any product to your exact specifications.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <motion.div key={category.name} variants={fadeUp}>
                <Link href={category.href}>
                  <Card hover className="group cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="p-2.5 bg-indigo-600/10 rounded-lg">
                        <category.icon className="w-5 h-5 text-indigo-400" />
                      </div>
                      <Badge>{category.count} products</Badge>
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors">
                      {category.name}
                    </h3>
                    <div className="mt-3 flex items-center text-sm text-neutral-500 group-hover:text-neutral-300 transition-colors">
                      Browse catalog
                      <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* AI Plan Analysis Feature */}
      <section className="bg-[#080808] border-y border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge variant="indigo" className="mb-4">
                <Sparkles className="w-3 h-3 mr-1" />
                Industry First
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Upload Plans.
                <br />
                Get Instant Quotes.
              </h2>
              <p className="mt-4 text-neutral-400 leading-relaxed">
                Our AI analyzes your deployment plans — floor plans, network
                diagrams, cable schedules, or CAD drawings — and generates a
                detailed fiber optic quote in under 90 seconds.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  "Accepts PDF, CAD, Excel, Visio, images — any format",
                  "AI identifies every fiber connection in your plans",
                  "Interactive review — adjust quantities and specs",
                  "One-click convert to order",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-neutral-300">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/upload-plans" className="inline-block mt-8">
                <Button>
                  <Upload className="w-4 h-4" />
                  Try AI Quoting
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Placeholder for AI analysis demo/screenshot */}
              <div className="bg-[#141414] border border-[#262626] rounded-2xl p-8 aspect-[4/3] flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-indigo-600/10 rounded-2xl flex items-center justify-center mb-6">
                  <Sparkles className="w-8 h-8 text-indigo-400" />
                </div>
                <p className="text-lg font-medium text-white">AI Plan Analysis</p>
                <p className="text-sm text-neutral-500 mt-2">Demo coming soon</p>
                <div className="mt-6 grid grid-cols-3 gap-4 w-full max-w-xs">
                  <div className="bg-[#0A0A0A] rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-indigo-400">156</div>
                    <div className="text-xs text-neutral-500 mt-1">Connections</div>
                  </div>
                  <div className="bg-[#0A0A0A] rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-indigo-400">3</div>
                    <div className="text-xs text-neutral-500 mt-1">Floors</div>
                  </div>
                  <div className="bg-[#0A0A0A] rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-indigo-400">$24K</div>
                    <div className="text-xs text-neutral-500 mt-1">Estimate</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Why Nexlume
            </h2>
            <p className="mt-4 text-neutral-400 max-w-xl mx-auto">
              Speed, quality, and technology that no other fiber optic assembler can match.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valueProps.map((prop) => (
              <motion.div key={prop.title} variants={fadeUp}>
                <Card className="h-full">
                  <div className="p-2.5 bg-indigo-600/10 rounded-lg w-fit">
                    <prop.icon className="w-5 h-5 text-indigo-400" />
                  </div>
                  <h3 className="mt-4 font-semibold text-white">{prop.title}</h3>
                  <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
                    {prop.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-b from-[#0A0A0A] to-indigo-600/5 border-t border-[#1A1A1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Ready to Build?
            </h2>
            <p className="mt-4 text-lg text-neutral-400 max-w-xl mx-auto">
              Configure your custom cable assembly, upload deployment plans for
              an AI-powered quote, or talk to our engineering team.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/configurator">
                <Button size="lg">
                  <Cable className="w-4 h-4" />
                  Configure a Cable
                </Button>
              </Link>
              <Link href="/upload-plans">
                <Button variant="outline" size="lg">
                  <Upload className="w-4 h-4" />
                  Upload Plans
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
