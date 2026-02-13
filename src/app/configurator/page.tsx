"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Cable, Zap, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  STEPS,
  CONNECTORS,
  COMMON_PAIRS,
  FIBER_TYPES,
  CONSTRUCTION_TYPES,
  JACKET_TYPES,
  FIBER_COUNTS,
  CABLE_DIAMETERS,
  PERFORMANCE_SPECS,
  PROFILE_DEFAULTS,
  type CableConfiguration,
  type CableProfile,
} from "@/types/configurator";

const defaultConfig: CableConfiguration = {
  application: null,
  fiberType: null,
  construction: null,
  connectorA: null,
  connectorB: null,
  length: 1,
  jacketType: null,
  jacketColor: "yellow",
  fiberCount: 2,
  cableDiameter: null,
  polishA: null,
  polishB: null,
};

const applications = [
  { id: "data-center", label: "Data Center", description: "Hyperscale, colocation, and enterprise DC interconnects", icon: "🏢", profile: "trunk" as CableProfile },
  { id: "ftth", label: "FTTH / Broadband", description: "Fiber-to-the-home, BEAD program, and ISP deployments", icon: "🏠", profile: "drop-cable" as CableProfile },
  { id: "5g", label: "5G / Telecom", description: "Small cell fronthaul, backhaul, and tower connections", icon: "📡", profile: "trunk" as CableProfile },
  { id: "enterprise", label: "Enterprise Campus", description: "Building backbone and horizontal cabling", icon: "🏗️", profile: "patch-cord" as CableProfile },
  { id: "industrial", label: "Industrial", description: "Harsh environment, factory, and outdoor applications", icon: "⚙️", profile: "patch-cord" as CableProfile },
  { id: "custom", label: "Custom / Other", description: "Specialty applications and unique requirements", icon: "🔧", profile: "patch-cord" as CableProfile },
] as const;

function OptionCard({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-left p-4 rounded-xl border transition-all ${
        selected
          ? "border-indigo-500 bg-indigo-600/10"
          : "border-[#262626] bg-[#141414] hover:border-[#363636]"
      }`}
    >
      {children}
    </button>
  );
}

export default function ConfiguratorPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [config, setConfig] = useState<CableConfiguration>(defaultConfig);
  const [showCommonPairs, setShowCommonPairs] = useState(true);

  const step = STEPS[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === STEPS.length - 1;

  // Filter fiber types based on application
  const filteredFibers = useMemo(() => {
    if (config.application === "ftth") {
      return FIBER_TYPES.filter((f) => f.category === "singlemode");
    }
    return [...FIBER_TYPES];
  }, [config.application]);

  // Determine relevant constructions based on application
  const filteredConstructions = useMemo(() => {
    if (config.application === "ftth") {
      return CONSTRUCTION_TYPES.filter((c) =>
        ["simplex", "duplex", "flat-drop", "round-drop", "toneable"].includes(c.id)
      );
    }
    if (config.application === "data-center") {
      return CONSTRUCTION_TYPES.filter((c) =>
        ["duplex", "breakout", "tight-buffer", "micro-armored"].includes(c.id)
      );
    }
    return [...CONSTRUCTION_TYPES];
  }, [config.application]);

  function next() {
    if (!isLast) setCurrentStep((s) => s + 1);
  }
  function prev() {
    if (!isFirst) setCurrentStep((s) => s - 1);
  }
  function reset() {
    setConfig(defaultConfig);
    setCurrentStep(0);
  }

  // Get cable color based on fiber type
  const cableColor = useMemo(() => {
    const fiber = FIBER_TYPES.find((f) => f.id === config.fiberType);
    return fiber?.color || "#EAB308";
  }, [config.fiberType]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <Badge variant="indigo" className="mb-4">
          <Cable className="w-3 h-3 mr-1" />
          Cable Assembly Configurator
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-bold text-white">
          Build Your Custom Cable
        </h1>
        <p className="mt-2 text-neutral-400">
          Configure exact specifications from real inventory. Real-time pricing. Ships in 48 hours.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-8">
        {/* Main Content */}
        <div>
          {/* Step Indicators */}
          <div className="flex items-center gap-1 mb-8 overflow-x-auto pb-2">
            {STEPS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => i <= currentStep && setCurrentStep(i)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
                  i === currentStep
                    ? "bg-indigo-600/15 text-indigo-400 font-medium"
                    : i < currentStep
                    ? "text-neutral-300 hover:bg-white/5 cursor-pointer"
                    : "text-neutral-600 cursor-default"
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                    i < currentStep
                      ? "bg-indigo-600 text-white"
                      : i === currentStep
                      ? "bg-indigo-600/20 text-indigo-400 ring-1 ring-indigo-500/50"
                      : "bg-[#1A1A1A] text-neutral-600"
                  }`}
                >
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
              {/* Step 0: Application */}
              {currentStep === 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-white mb-2">Select Your Application</h2>
                  <p className="text-sm text-neutral-500 mb-6">This pre-fills recommended defaults for fiber type, construction, and jacket.</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {applications.map((app) => (
                      <OptionCard
                        key={app.id}
                        selected={config.application === app.id}
                        onClick={() => {
                          const profile = PROFILE_DEFAULTS[app.profile];
                          setConfig({
                            ...defaultConfig,
                            ...profile,
                            application: app.id as CableConfiguration["application"],
                          });
                          next();
                        }}
                      >
                        <div className="text-2xl mb-2">{app.icon}</div>
                        <div className="font-medium text-white">{app.label}</div>
                        <div className="text-sm text-neutral-500 mt-1">{app.description}</div>
                      </OptionCard>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 1: Fiber Type */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-xl font-semibold text-white mb-2">Select Fiber Type</h2>
                  <p className="text-sm text-neutral-500 mb-6">
                    {config.application === "ftth" ? "Singlemode fibers for FTTH deployment." : "Choose singlemode or multimode based on distance and speed requirements."}
                  </p>
                  {/* Singlemode */}
                  <h3 className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-3">Singlemode</h3>
                  <div className="grid sm:grid-cols-2 gap-3 mb-6">
                    {filteredFibers.filter((f) => f.category === "singlemode").map((fiber) => (
                      <OptionCard
                        key={fiber.id}
                        selected={config.fiberType === fiber.id}
                        onClick={() => {
                          setConfig({ ...config, fiberType: fiber.id });
                          next();
                        }}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: fiber.color }} />
                          <span className="font-medium text-white">{fiber.label}</span>
                        </div>
                        <div className="text-xs text-neutral-500 font-mono mb-1">{fiber.coreClad}</div>
                        <div className="text-sm text-neutral-400 mb-2">{fiber.description}</div>
                        <div className="flex flex-wrap gap-1.5">
                          {fiber.specs.map((s) => (
                            <span key={s} className="text-xs px-2 py-0.5 bg-[#1A1A1A] border border-[#262626] rounded text-neutral-500">{s}</span>
                          ))}
                        </div>
                      </OptionCard>
                    ))}
                  </div>
                  {/* Multimode */}
                  {filteredFibers.some((f) => f.category === "multimode") && (
                    <>
                      <h3 className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-3">Multimode</h3>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {filteredFibers.filter((f) => f.category === "multimode").map((fiber) => (
                          <OptionCard
                            key={fiber.id}
                            selected={config.fiberType === fiber.id}
                            onClick={() => {
                              setConfig({ ...config, fiberType: fiber.id });
                              next();
                            }}
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: fiber.color }} />
                              <span className="font-medium text-white">{fiber.label}</span>
                            </div>
                            <div className="text-xs text-neutral-500 font-mono mb-1">{fiber.coreClad}</div>
                            <div className="text-sm text-neutral-400 mb-2">{fiber.description}</div>
                            <div className="flex flex-wrap gap-1.5">
                              {fiber.specs.map((s) => (
                                <span key={s} className="text-xs px-2 py-0.5 bg-[#1A1A1A] border border-[#262626] rounded text-neutral-500">{s}</span>
                              ))}
                            </div>
                          </OptionCard>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Step 2: Construction */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-xl font-semibold text-white mb-2">Cable Construction</h2>
                  <p className="text-sm text-neutral-500 mb-6">How the fibers are packaged and protected.</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {filteredConstructions.map((c) => (
                      <OptionCard
                        key={c.id}
                        selected={config.construction === c.id}
                        onClick={() => {
                          setConfig({
                            ...config,
                            construction: c.id,
                            fiberCount: c.fiberCount || config.fiberCount,
                          });
                          next();
                        }}
                      >
                        <div className="font-medium text-white">{c.label}</div>
                        <div className="text-sm text-neutral-500 mt-1">{c.description}</div>
                        {c.fiberCount && (
                          <div className="text-xs text-indigo-400 mt-2">{c.fiberCount} fiber{c.fiberCount > 1 ? "s" : ""}</div>
                        )}
                      </OptionCard>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Connector A */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-xl font-semibold text-white mb-2">Connector A (Near End)</h2>

                  {/* Common Pairs shortcut */}
                  {showCommonPairs && (
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-neutral-400">Quick pick — common pairs</span>
                        <button onClick={() => setShowCommonPairs(false)} className="text-xs text-neutral-600 hover:text-neutral-400">Hide</button>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {COMMON_PAIRS.map((pair) => (
                          <button
                            key={pair.label}
                            onClick={() => {
                              const connA = CONNECTORS.find((c) => c.id === pair.a);
                              const connB = CONNECTORS.find((c) => c.id === pair.b);
                              setConfig({
                                ...config,
                                connectorA: pair.a,
                                connectorB: pair.b,
                                polishA: connA?.polish as "APC" | "UPC" | "PC" || null,
                                polishB: connB?.polish as "APC" | "UPC" | "PC" || null,
                              });
                              setCurrentStep(5); // skip to specs
                            }}
                            className="text-left px-3 py-2 rounded-lg border border-[#262626] bg-[#141414] hover:border-indigo-500/50 transition-all"
                          >
                            <div className="text-sm font-medium text-white">{pair.label}</div>
                            <div className="text-xs text-neutral-500">{pair.use}</div>
                          </button>
                        ))}
                      </div>
                      <div className="border-t border-[#262626] mt-4 pt-4">
                        <span className="text-sm text-neutral-400">Or pick individually:</span>
                      </div>
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-3">
                    {CONNECTORS.map((conn) => (
                      <OptionCard
                        key={conn.id}
                        selected={config.connectorA === conn.id}
                        onClick={() => {
                          setConfig({
                            ...config,
                            connectorA: conn.id,
                            polishA: conn.polish as "APC" | "UPC" | "PC",
                          });
                          next();
                        }}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-white">{conn.label}</span>
                          <span className={`text-xs px-1.5 py-0.5 rounded ${
                            conn.polish === "APC" ? "bg-emerald-500/10 text-emerald-400" : "bg-blue-500/10 text-blue-400"
                          }`}>{conn.polish}</span>
                        </div>
                        <div className="text-sm text-neutral-500">{conn.description}</div>
                      </OptionCard>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Connector B */}
              {currentStep === 4 && (
                <div>
                  <h2 className="text-xl font-semibold text-white mb-2">Connector B (Far End)</h2>
                  <p className="text-sm text-neutral-500 mb-6">
                    Connector A is <span className="text-indigo-400 font-medium">{config.connectorA}</span>. Select the far-end connector.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {CONNECTORS.map((conn) => (
                      <OptionCard
                        key={conn.id}
                        selected={config.connectorB === conn.id}
                        onClick={() => {
                          setConfig({
                            ...config,
                            connectorB: conn.id,
                            polishB: conn.polish as "APC" | "UPC" | "PC",
                          });
                          next();
                        }}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-white">{conn.label}</span>
                          <span className={`text-xs px-1.5 py-0.5 rounded ${
                            conn.polish === "APC" ? "bg-emerald-500/10 text-emerald-400" : "bg-blue-500/10 text-blue-400"
                          }`}>{conn.polish}</span>
                        </div>
                        <div className="text-sm text-neutral-500">{conn.description}</div>
                      </OptionCard>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5: Specs & Length */}
              {currentStep === 5 && (
                <div>
                  <h2 className="text-xl font-semibold text-white mb-6">Specifications & Length</h2>
                  <div className="space-y-6">
                    {/* Fiber Count */}
                    <div>
                      <label className="text-sm font-medium text-neutral-300 mb-3 block">Fiber Count</label>
                      <div className="flex flex-wrap gap-2">
                        {FIBER_COUNTS.map((count) => (
                          <button
                            key={count}
                            onClick={() => setConfig({ ...config, fiberCount: count })}
                            className={`px-4 py-2 rounded-lg text-sm border transition-all ${
                              config.fiberCount === count
                                ? "border-indigo-500 bg-indigo-600/10 text-indigo-400"
                                : "border-[#262626] text-neutral-400 hover:border-[#363636]"
                            }`}
                          >
                            {count}F
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Length */}
                    <div>
                      <label className="text-sm font-medium text-neutral-300 mb-3 block">
                        Cable Length: <span className="text-indigo-400">{config.length}m</span>
                        <span className="text-neutral-600 ml-2">({(config.length * 3.281).toFixed(1)} ft)</span>
                      </label>
                      <input
                        type="range"
                        min={0.5}
                        max={500}
                        step={0.5}
                        value={config.length}
                        onChange={(e) => setConfig({ ...config, length: parseFloat(e.target.value) })}
                        className="w-full accent-indigo-500"
                      />
                      <div className="flex justify-between text-xs text-neutral-600 mt-1">
                        <span>0.5m</span>
                        <span>500m</span>
                      </div>
                      <div className="flex gap-2 mt-3">
                        {[1, 2, 3, 5, 10, 15, 25, 50, 100].map((len) => (
                          <button
                            key={len}
                            onClick={() => setConfig({ ...config, length: len })}
                            className={`px-3 py-1 text-xs rounded-lg border ${
                              config.length === len
                                ? "border-indigo-500 text-indigo-400"
                                : "border-[#262626] text-neutral-500 hover:border-[#363636]"
                            }`}
                          >
                            {len}m
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Jacket */}
                    <div>
                      <label className="text-sm font-medium text-neutral-300 mb-3 block">Jacket / Fire Rating</label>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {JACKET_TYPES.map((j) => (
                          <OptionCard
                            key={j.id}
                            selected={config.jacketType === j.id}
                            onClick={() => setConfig({ ...config, jacketType: j.id })}
                          >
                            <div className="font-medium text-white text-sm">{j.label}</div>
                            <div className="text-xs text-neutral-500">{j.description}</div>
                          </OptionCard>
                        ))}
                      </div>
                    </div>

                    {/* Cable Diameter */}
                    <div>
                      <label className="text-sm font-medium text-neutral-300 mb-3 block">Cable Outer Diameter</label>
                      <div className="flex flex-wrap gap-2">
                        {CABLE_DIAMETERS.map((d) => (
                          <button
                            key={d}
                            onClick={() => setConfig({ ...config, cableDiameter: d })}
                            className={`px-3 py-1.5 rounded-lg text-sm border transition-all ${
                              config.cableDiameter === d
                                ? "border-indigo-500 bg-indigo-600/10 text-indigo-400"
                                : "border-[#262626] text-neutral-400 hover:border-[#363636]"
                            }`}
                          >
                            {d}mm
                          </button>
                        ))}
                      </div>
                    </div>

                    <Button onClick={next} className="mt-4">
                      Review Configuration
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 6: Review */}
              {currentStep === 6 && (
                <div>
                  <h2 className="text-xl font-semibold text-white mb-6">Review Your Configuration</h2>

                  {/* SVG Cable Preview */}
                  <Card className="mb-6">
                    <div className="bg-[#0A0A0A] rounded-lg p-8">
                      <svg viewBox="0 0 640 140" className="w-full h-auto">
                        {/* Connector A */}
                        <rect x="20" y="35" width="80" height="70" rx="6" fill="#111111" stroke="#5E6AD2" strokeWidth="1.5" />
                        <text x="60" y="62" textAnchor="middle" fill="#E5E5E5" fontSize="11" fontFamily="monospace" fontWeight="bold">
                          {config.connectorA || "—"}
                        </text>
                        <text x="60" y="78" textAnchor="middle" fill="#6B7280" fontSize="9" fontFamily="monospace">
                          {config.polishA || ""}
                        </text>
                        <text x="60" y="96" textAnchor="middle" fill="#4B5563" fontSize="8" fontFamily="monospace">
                          Near End
                        </text>

                        {/* Cable */}
                        <line x1="100" y1="70" x2="540" y2="70" stroke={cableColor} strokeWidth="4" strokeLinecap="round" />
                        {config.fiberCount > 1 && (
                          <line x1="100" y1="74" x2="540" y2="74" stroke={cableColor} strokeWidth="2" strokeLinecap="round" opacity="0.4" />
                        )}
                        {/* Cable label */}
                        <text x="320" y="52" textAnchor="middle" fill="#9CA3AF" fontSize="10" fontFamily="monospace">
                          {config.fiberType || "OS2"} · {config.fiberCount}F · {config.length}m
                        </text>
                        <text x="320" y="98" textAnchor="middle" fill="#6B7280" fontSize="9" fontFamily="monospace">
                          {config.construction || "duplex"} · {config.jacketType || "—"} · {config.cableDiameter ? `${config.cableDiameter}mm OD` : ""}
                        </text>

                        {/* Connector B */}
                        <rect x="540" y="35" width="80" height="70" rx="6" fill="#111111" stroke="#5E6AD2" strokeWidth="1.5" />
                        <text x="580" y="62" textAnchor="middle" fill="#E5E5E5" fontSize="11" fontFamily="monospace" fontWeight="bold">
                          {config.connectorB || "—"}
                        </text>
                        <text x="580" y="78" textAnchor="middle" fill="#6B7280" fontSize="9" fontFamily="monospace">
                          {config.polishB || ""}
                        </text>
                        <text x="580" y="96" textAnchor="middle" fill="#4B5563" fontSize="8" fontFamily="monospace">
                          Far End
                        </text>
                      </svg>
                    </div>
                  </Card>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button className="flex-1">
                      <Zap className="w-4 h-4 mr-2" />
                      Add to Cart — Get Instant Price
                    </Button>
                    <Button variant="outline" onClick={() => {}}>
                      Request Formal Quote
                    </Button>
                    <Button variant="ghost" onClick={reset}>
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          {currentStep !== 0 && (
            <div className="flex items-center justify-between mt-8">
              <Button variant="ghost" onClick={prev}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              {!isLast && currentStep !== 5 && (
                <Button onClick={next}>
                  Skip
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Price Sidebar */}
        <div className="hidden lg:block">
          <div className="sticky top-24 space-y-4">
            <Card>
              <h3 className="font-semibold text-white mb-4">Configuration Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Application</span>
                  <span className="text-white">{config.application || "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Fiber</span>
                  <span className="text-white">{config.fiberType || "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Construction</span>
                  <span className="text-white">{config.construction || "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Connector A</span>
                  <span className="text-white">{config.connectorA || "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Connector B</span>
                  <span className="text-white">{config.connectorB || "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Fiber Count</span>
                  <span className="text-white">{config.fiberCount}F</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Length</span>
                  <span className="text-white">{config.length}m ({(config.length * 3.281).toFixed(1)} ft)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Jacket</span>
                  <span className="text-white">{config.jacketType || "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">OD</span>
                  <span className="text-white">{config.cableDiameter ? `${config.cableDiameter}mm` : "—"}</span>
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

            {/* Performance specs card */}
            <Card>
              <h3 className="font-semibold text-white mb-3 text-sm">Guaranteed Performance</h3>
              <div className="space-y-2 text-xs text-neutral-400">
                <div className="flex justify-between">
                  <span>Max Insertion Loss</span>
                  <span className="text-emerald-400">≤ {PERFORMANCE_SPECS.maxInsertionLoss} dB</span>
                </div>
                <div className="flex justify-between">
                  <span>Wavelengths</span>
                  <span>{PERFORMANCE_SPECS.wavelengths.join("/")} nm</span>
                </div>
                <div className="flex justify-between">
                  <span>Test Report</span>
                  <span className="text-emerald-400">Included</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
