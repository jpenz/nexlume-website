/* ─── Cable Configurator Types ─── */

export interface ConfiguratorStep {
  id: string;
  label: string;
  icon: string;
}

export const STEPS: ConfiguratorStep[] = [
  { id: "application", label: "Application", icon: "🎯" },
  { id: "fiber-type", label: "Fiber Type", icon: "💡" },
  { id: "construction", label: "Construction", icon: "🏗️" },
  { id: "connector-a", label: "Connector A", icon: "🔌" },
  { id: "connector-b", label: "Connector B", icon: "🔌" },
  { id: "specs", label: "Specs & Length", icon: "📐" },
  { id: "review", label: "Review", icon: "✅" },
];

/* ─── Connector Options (observed from CoreLinc data) ─── */

export const CONNECTORS = [
  { id: "SC/APC", label: "SC/APC", family: "SC", polish: "APC", description: "Standard in FTTH/PON, angled polish for low back-reflection" },
  { id: "SC/UPC", label: "SC/UPC", family: "SC", polish: "UPC", description: "Push-pull snap-in, common in enterprise and patch panels" },
  { id: "LC/APC", label: "LC/APC", family: "LC", polish: "APC", description: "Small form factor, angled polish, ideal for high-density" },
  { id: "LC/UPC", label: "LC/UPC", family: "LC", polish: "UPC", description: "Most popular data center connector, SFP+ compatible" },
  { id: "FC/APC", label: "FC/APC", family: "FC", polish: "APC", description: "Threaded coupling, vibration-resistant, test equipment" },
  { id: "FC/UPC", label: "FC/UPC", family: "FC", polish: "UPC", description: "Threaded coupling, legacy telecom and CATV" },
  { id: "ST", label: "ST", family: "ST", polish: "UPC", description: "Bayonet-style, legacy LAN and military applications" },
  { id: "MPO/APC", label: "MPO/APC", family: "MPO", polish: "APC", description: "Multi-fiber push-on, 12/24 fiber, angled polish" },
  { id: "MTP/APC", label: "MTP/APC", family: "MTP", polish: "APC", description: "US Conec elite grade, 12/24 fiber trunk & breakout" },
  { id: "MPO/UPC", label: "MPO/UPC", family: "MPO", polish: "UPC", description: "Multi-fiber push-on, standard polish for data center" },
  { id: "MTP/UPC", label: "MTP/UPC", family: "MTP", polish: "UPC", description: "US Conec elite grade, standard polish" },
  { id: "OptiTap-SCA", label: "OptiTap (SC/APC)", family: "OptiTap", polish: "APC", description: "Hardened drop connector, FDT/OptiTap deployments" },
  { id: "E2000", label: "E2000", family: "E2000", polish: "APC", description: "Spring-loaded dust cap, high-density European standard" },
  { id: "MU", label: "MU", family: "MU", polish: "UPC", description: "Miniature unit, 1.25mm ferrule, compact patch panels" },
] as const;

/* Common connector pair presets */
export const COMMON_PAIRS = [
  { a: "SC/APC", b: "SC/APC", label: "SC/APC – SC/APC", use: "FTTH, PON" },
  { a: "SC/UPC", b: "SC/UPC", label: "SC/UPC – SC/UPC", use: "Enterprise, Patch Panels" },
  { a: "LC/UPC", b: "LC/UPC", label: "LC/UPC – LC/UPC", use: "Data Center, SFP+" },
  { a: "SC/APC", b: "LC/APC", label: "SC/APC – LC/APC", use: "FTTH to Equipment" },
  { a: "SC/UPC", b: "LC/UPC", label: "SC/UPC – LC/UPC", use: "Cross-connect" },
  { a: "SC/UPC", b: "LC/APC", label: "SC/UPC – LC/APC", use: "Mixed Plant" },
  { a: "LC/UPC", b: "ST", label: "LC – ST", use: "Legacy Upgrade" },
  { a: "LC/UPC", b: "FC/UPC", label: "LC – FC", use: "Test Equipment" },
  { a: "SC/UPC", b: "ST", label: "SC – ST", use: "Legacy Upgrade" },
  { a: "MTP/APC", b: "MTP/APC", label: "MTP – MTP", use: "Trunk Cable" },
  { a: "MPO/APC", b: "MTP/APC", label: "MPO – MTP", use: "Trunk Cable" },
  { a: "MPO/APC", b: "LC/UPC", label: "MPO → 4×LC Breakout", use: "Breakout / Harness" },
] as const;

/* ─── Fiber Types (observed from CoreLinc data) ─── */

export const FIBER_TYPES = [
  // Singlemode
  { id: "OS2", label: "Singlemode OS2", coreClad: "9/125μm", color: "#EAB308", category: "singlemode",
    description: "Standard singlemode, long-haul to campus. G.652D compatible.",
    specs: ["1310/1550nm", "Up to 200km", "Low attenuation"] },
  { id: "SMF-28", label: "SMF-28 (Corning)", coreClad: "9/125μm", color: "#EAB308", category: "singlemode",
    description: "Industry-standard singlemode fiber. G.652D.",
    specs: ["1310/1550nm", "Lowest loss", "Universal compatibility"] },
  { id: "SMF-28e+", label: "SMF-28e+ (Corning)", coreClad: "9/125μm", color: "#EAB308", category: "singlemode",
    description: "Enhanced bend performance singlemode. G.652D + G.657A1.",
    specs: ["1310/1550nm", "Bend-optimized", "Macro-bend resistant"] },
  { id: "SMF-28-Ultra", label: "SMF-28 Ultra (Corning)", coreClad: "9/125μm", color: "#EAB308", category: "singlemode",
    description: "Lowest-loss singlemode for submarine and ultra-long-haul.",
    specs: ["1310/1550nm", "Ultra-low loss", "G.652D + G.657A2"] },
  { id: "G.657A1", label: "G.657A1 Bend-Insensitive", coreClad: "9/125μm", color: "#F59E0B", category: "singlemode",
    description: "Bend-insensitive for FTTH and tight indoor routing.",
    specs: ["10mm bend radius", "FTTH standard", "G.652D compatible"] },
  { id: "G.657A2", label: "G.657A2 Enhanced Bend", coreClad: "9/125μm", color: "#F59E0B", category: "singlemode",
    description: "Tightest bend radius singlemode. MDU and drop cable.",
    specs: ["7.5mm bend radius", "MDU/drop cable", "Extreme routing"] },
  // Multimode
  { id: "OM1", label: "Multimode OM1", coreClad: "62.5/125μm", color: "#F97316", category: "multimode",
    description: "Legacy multimode. 100Mbps to 1Gbps, short runs.",
    specs: ["850nm", "Up to 275m @1G", "Legacy systems"] },
  { id: "OM2", label: "Multimode OM2", coreClad: "50/125μm", color: "#F97316", category: "multimode",
    description: "Standard 50μm multimode. Up to 550m at 1Gbps.",
    specs: ["850nm", "Up to 550m @1G", "Building backbone"] },
  { id: "OM3", label: "Multimode OM3", coreClad: "50/125μm", color: "#06B6D4", category: "multimode",
    description: "Laser-optimized 10G multimode. Up to 300m at 10Gbps.",
    specs: ["850nm", "Up to 300m @10G", "Data center cost-effective"] },
  { id: "OM4", label: "Multimode OM4", coreClad: "50/125μm", color: "#8B5CF6", category: "multimode",
    description: "High-bandwidth 10G/40G/100G multimode. Data center standard.",
    specs: ["850nm", "Up to 400m @10G", "40G/100G ready"] },
  { id: "OM5", label: "Multimode OM5 (WBMMF)", coreClad: "50/125μm", color: "#84CC16", category: "multimode",
    description: "Wideband multimode for SWDM, 400G, and future speeds.",
    specs: ["850-953nm", "SWDM optimized", "400G/800G future-ready"] },
] as const;

/* ─── Construction Types ─── */

export const CONSTRUCTION_TYPES = [
  { id: "simplex", label: "Simplex", fiberCount: 1, description: "Single fiber, one direction" },
  { id: "duplex", label: "Duplex", fiberCount: 2, description: "Two fibers, bidirectional" },
  { id: "zipcord", label: "Zipcord", fiberCount: 2, description: "Two bonded fibers, easy separation" },
  { id: "breakout", label: "Breakout / Fan-out", fiberCount: null, description: "Individual jacketed fibers in outer jacket" },
  { id: "flat-drop", label: "Flat Drop", fiberCount: null, description: "Flat profile for FTTH drop cables" },
  { id: "round-drop", label: "Round Drop", fiberCount: null, description: "Round profile drop cable" },
  { id: "tight-buffer", label: "Tight-Buffered", fiberCount: null, description: "900μm buffer over fiber, indoor use" },
  { id: "loose-tube", label: "Loose Tube", fiberCount: null, description: "Gel-filled or dry, outdoor plant" },
  { id: "micro-armored", label: "Micro-Armored", fiberCount: null, description: "Interlocking steel armor, rodent protection" },
  { id: "armored", label: "Armored", fiberCount: null, description: "Full corrugated steel armor, direct burial" },
  { id: "adss", label: "All-Dielectric Self-Supporting (ADSS)", fiberCount: null, description: "Aerial span, no metallic elements" },
  { id: "indoor-outdoor", label: "Indoor/Outdoor", fiberCount: null, description: "Dual-rated for transition without splice" },
  { id: "toneable", label: "Toneable", fiberCount: null, description: "Metallic element for toning/locating" },
] as const;

/* ─── Jacket / Rating ─── */

export const JACKET_TYPES = [
  { id: "OFNP", label: "OFNP / Plenum", description: "Air handling spaces, lowest smoke/flame", fire: "highest" },
  { id: "OFNR", label: "OFNR / Riser", description: "Vertical runs between floors", fire: "high" },
  { id: "LSZH", label: "LSZH", description: "Low smoke zero halogen, transit and confined spaces", fire: "high" },
  { id: "PVC", label: "PVC", description: "General purpose indoor, cost-effective", fire: "standard" },
  { id: "MDPE", label: "MDPE", description: "Outdoor, direct burial, duct", fire: "outdoor" },
] as const;

/* ─── Fiber Counts ─── */

export const FIBER_COUNTS = [1, 2, 4, 6, 8, 12, 20, 24, 72, 96, 144, 216, 288] as const;

/* ─── Common Outer Diameters (mm) ─── */

export const CABLE_DIAMETERS = [0.9, 1.2, 1.6, 2.0, 2.5, 3.0, 4.8, 5.8, 6.2, 8.4, 9.7, 12.7] as const;

/* ─── Performance ─── */

export const PERFORMANCE_SPECS = {
  wavelengths: [850, 1310, 1550] as const,
  maxInsertionLoss: 0.35, // dB
  speeds: ["1G", "10G", "25G", "40G", "100G", "400G", "800G"] as const,
};

/* ─── Cable Configuration State ─── */

export interface CableConfiguration {
  application: "data-center" | "ftth" | "5g" | "enterprise" | "industrial" | "custom" | null;
  fiberType: string | null;
  construction: string | null;
  connectorA: string | null;
  connectorB: string | null;
  length: number;
  jacketType: string | null;
  jacketColor: string;
  fiberCount: number;
  cableDiameter: number | null;
  polishA: "APC" | "UPC" | "PC" | null;
  polishB: "APC" | "UPC" | "PC" | null;
}

/* ─── Cable Profiles (context-aware generation) ─── */

export type CableProfile = "patch-cord" | "drop-cable" | "trunk" | "breakout" | "closure-tail";

export const PROFILE_DEFAULTS: Record<CableProfile, Partial<CableConfiguration>> = {
  "patch-cord": {
    construction: "duplex",
    fiberCount: 2,
    jacketType: "OFNP",
    cableDiameter: 2.0,
  },
  "drop-cable": {
    construction: "flat-drop",
    fiberType: "G.657A2",
    fiberCount: 1,
    jacketType: "LSZH",
    cableDiameter: 3.0,
  },
  "trunk": {
    construction: "loose-tube",
    connectorA: "MTP/APC",
    connectorB: "MTP/APC",
    fiberCount: 12,
    jacketType: "OFNP",
    cableDiameter: 4.8,
  },
  "breakout": {
    construction: "breakout",
    connectorA: "MPO/APC",
    connectorB: "LC/UPC",
    fiberCount: 12,
    jacketType: "OFNP",
    cableDiameter: 6.2,
  },
  "closure-tail": {
    construction: "tight-buffer",
    fiberCount: 1,
    jacketType: "PVC",
    cableDiameter: 0.9,
  },
};
