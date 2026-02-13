"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Cable } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { STEPS, type ConfiguratorStep, type CableConfiguration } from "@/types/configurator";

const defaultConfig: CableConfiguration = {
  application: null,
  fiberType: null,
  connectorA: null,
  connectorB: null,
  length: 1,
  jacketType: null,
  jacketColor: "yellow",
  fiberCount: 1,
};

const applications = [
  { id: "data-center", label: "Data Center", description: "Hyperscale, colocation, and enterprise DC interconnects", icon: "🏢" },
  { id: "ftth", label: "FTTH / Broadband", description: "Fiber-to-the-home and BEAD program deployments", icon: "🏠" },
  { id: "5g", label: "5G / Telecom", description: "Small cell fronthaul, backhaul, and tower connections", icon: "📡" },
  { id: "enterprise", label: "Enterprise Campus", description: "Building backbone and horizontal cabling", icon: "🏗️" },
  { id: "industrial", label: "Industrial", description: "Harsh environment, factory, and outdoor applications", icon: "⚙️" },
  { id: "custom", label: "Custom / Other", description: "Specialty applications and unique requirements", icon: "🔧" },
] as const;

const fiberTypes = [
  { id: "OS2", label: "Singlemode OS2", specs: "9/125μm", color: "bg-yellow-500", description: "Long-distance, high-bandwidth. Standard for telecom and data centers." },
  { id: "OM3", label: "Multimode OM3", specs: "50/125μm", color: "bg-cyan-500", description: "Up to 300m at 10Gbps. Cost-effective for short runs." },
  { id: "OM4", label: "Multimode OM4", specs: "50/125μm", color: "bg-violet-500", description: "Up to 400m at 10Gbps. Enhanced bandwidth for data centers." },
  { id: "OM5", label: "Multimode OM5", specs: "50/125μm", color: "bg-lime-500", description: "WBMMF. Optimized for SWDM and 400G applications." },
] as const;

export default function ConfiguratorPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [config, setConfig] = useState<CableConfiguration>(defaultConfig);

  const step = STEPS[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === STEPS.length - 1;

  function next() {
    if (!isLast) setCurrentStep((s) => s + 1);
  }

  function prev() {
    if (!isFirst) setCurrentStep((s) => s - 1);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="mb-12">
        <Badge variant="indigo" className="mb-4">
          <Cable className="w-3 h-3 mr-1" />
          Cable Assembly Configurator
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-bold text-white">
          Build Your Custom Cable
        </h1>
        <p className="mt-2 text-neutral-400">
          Configure your exact specifications. Real-time pricing. Ships in 48 hours.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-8">
        {/* Main Content */}
        <div>
          {/* Step Indicators */}
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
            {STEPS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setCurrentStep(i)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
                  i === currentStep
                    ? "bg-indigo-600/15 text-indigo-400 font-medium"
                    : i < currentStep
                    ? "text-neutral-300 hover:bg-white/5"
                    : "text-neutral-600"
                }`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                  i < currentStep
                    ? "bg-indigo-600 text-white"
                    : i === currentStep
                    ? "bg-indigo-600/20 text-indigo-400 ring-1 ring-indigo-500/50"
                    : "bg-[#1A1A1A] text-neutral-600"
                }`}>
                  {i < currentStep ? <Check className="w-3 h-3" /> : i + 1}
                </span>
                <span className="hidden sm:inline">{s.label}</span>
              </button>
            ))}
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {currentStep === 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-white mb-6">Select Your Application</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {applications.map((app) => (
                      <button
                        key={app.id}
                        onClick={() => {
                          setConfig({ ...config, application: app.id as CableConfiguration["application"] });
                          next();
                        }}
                        className={`text-left p-4 rounded-xl border transition-all ${
                          config.application === app.id
                            ? "border-indigo-500 bg-indigo-600/10"
                            : "border-[#262626] bg-[#141414] hover:border-[#363636]"
                        }`}
                      >
                        <div className="text-2xl mb-2">{app.icon}</div>
                        <div className="font-medium text-white">{app.label}</div>
                        <div className="text-sm text-neutral-500 mt-1">{app.description}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div>
                  <h2 className="text-xl font-semibold text-white mb-6">Select Fiber Type</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {fiberTypes.map((fiber) => (
                      <button
                        key={fiber.id}
                        onClick={() => {
                          setConfig({ ...config, fiberType: fiber.id as CableConfiguration["fiberType"] });
                          next();
                        }}
                        className={`text-left p-4 rounded-xl border transition-all ${
                          config.fiberType === fiber.id
                            ? "border-indigo-500 bg-indigo-600/10"
                            : "border-[#262626] bg-[#141414] hover:border-[#363636]"
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-3 h-3 rounded-full ${fiber.color}`} />
                          <span className="font-medium text-white">{fiber.label}</span>
                        </div>
                        <div className="text-xs text-neutral-500 font-mono mb-1">{fiber.specs}</div>
                        <div className="text-sm text-neutral-400">{fiber.description}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {currentStep >= 2 && currentStep <= 4 && (
                <div className="bg-[#141414] border border-[#262626] rounded-xl p-12 text-center">
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <h2 className="text-xl font-semibold text-white">{step.label}</h2>
                  <p className="text-sm text-neutral-500 mt-2">
                    Full {step.label.toLowerCase()} selection coming soon.
                  </p>
                </div>
              )}

              {currentStep === 5 && (
                <div>
                  <h2 className="text-xl font-semibold text-white mb-6">Review Your Configuration</h2>
                  <Card>
                    {/* SVG Cable Preview */}
                    <div className="bg-[#0A0A0A] rounded-lg p-8 mb-6">
                      <svg viewBox="0 0 600 120" className="w-full h-auto">
                        {/* Connector A */}
                        <rect x="20" y="35" width="60" height="50" rx="4" fill="#1E1E3F" stroke="#5E6AD2" strokeWidth="1.5" />
                        <text x="50" y="65" textAnchor="middle" fill="#9CA3AF" fontSize="12" fontFamily="monospace">
                          {config.connectorA || "LC"}
                        </text>
                        {/* Cable */}
                        <line x1="80" y1="60" x2="520" y2="60" stroke="#EAB308" strokeWidth="3" strokeLinecap="round" />
                        <text x="300" y="45" textAnchor="middle" fill="#6B7280" fontSize="10" fontFamily="monospace">
                          {config.fiberType || "OS2"} · {config.length}m · {config.jacketType || "Plenum"}
                        </text>
                        {/* Connector B */}
                        <rect x="520" y="35" width="60" height="50" rx="4" fill="#1E1E3F" stroke="#5E6AD2" strokeWidth="1.5" />
                        <text x="550" y="65" textAnchor="middle" fill="#9CA3AF" fontSize="12" fontFamily="monospace">
                          {config.connectorB || "LC"}
                        </text>
                      </svg>
                    </div>
                    <div className="text-center">
                      <p className="text-neutral-400 text-sm">Configuration review and pricing will appear here.</p>
                      <Button className="mt-4">Add to Cart</Button>
                    </div>
                  </Card>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <Button variant="ghost" onClick={prev} disabled={isFirst}>
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            {!isLast && (
              <Button onClick={next}>
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Price Sidebar */}
        <div className="hidden lg:block">
          <div className="sticky top-24">
            <Card>
              <h3 className="font-semibold text-white mb-4">Price Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Application</span>
                  <span className="text-white">{config.application || "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Fiber Type</span>
                  <span className="text-white">{config.fiberType || "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Connector A</span>
                  <span className="text-white">{config.connectorA || "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Connector B</span>
                  <span className="text-white">{config.connectorB || "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Length</span>
                  <span className="text-white">{config.length}m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Jacket</span>
                  <span className="text-white">{config.jacketType || "—"}</span>
                </div>
                <div className="border-t border-[#262626] pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="text-neutral-300 font-medium">Unit Price</span>
                    <span className="text-xl font-bold text-white">$—</span>
                  </div>
                  <p className="text-xs text-neutral-600 mt-1">Complete configuration for pricing</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
