/**
 * INTELLIGENT PRODUCT CATALOG STRATEGY
 *
 * The catalog is organized by CUSTOMER BUYING JOURNEY, not by SKU explosion.
 *
 * Principles:
 * 1. PRODUCT FAMILIES, not individual SKUs — a "LC-LC OS2 Duplex Patch Cord"
 *    is ONE product with configurable length, jacket, and color options
 * 2. 80/20 RULE — stock the 20% of configs that drive 80% of sales
 * 3. MARKET SEGMENTS drive navigation — Data Center, FTTH/BEAD, Enterprise, Telecom
 * 4. BUNDLES for use-case purchasing — "I need to deploy a rack" not "I need part #XYZ"
 * 5. TRANSCEIVERS by brand compatibility — "I have Cisco Nexus 9000" not "I need SFP+"
 * 6. MAKE vs BUY — configurator for custom, shop for stock
 *
 * Revenue model (from CellCog research):
 * - Transceivers: 40-60% of revenue, 70-90% margin (THE margin engine)
 * - Patch cords: 15-25% of revenue, 50-65% margin (bread & butter)
 * - Infrastructure: 10-15% of revenue, 40-55% margin
 * - Test/tools: 5-10% of revenue, 55-70% margin
 * - FTTH/passives: 5-15% of revenue, 45-60% margin
 */

/* ─── Product Family (the core unit — NOT individual SKUs) ─── */
export interface ProductFamily {
  id: string;
  name: string;
  shortName: string; // for cards
  category: CategorySlug;
  segment: MarketSegment[];
  description: string;
  baseSpecs: Record<string, string>; // shared across all variants
  options: ProductOption[]; // configurable dimensions
  priceFrom: number;
  priceTo: number;
  compareAtFrom?: number; // competitor price
  margin: number; // estimated gross margin %
  demandTier: "A" | "B" | "C"; // A = top 20%, B = next 30%, C = rest
  stockStrategy: "always-stock" | "stock-popular" | "made-to-order" | "drop-ship";
  tags: string[];
  certifications: string[];
  image: ProductImageType;
}

export interface ProductOption {
  name: string; // "Length", "Jacket", "Brand Compatibility"
  type: "select" | "color" | "number";
  values: OptionValue[];
  affects: "price" | "sku" | "both";
}

export interface OptionValue {
  label: string;
  value: string;
  priceModifier?: number; // +/- from base price
  inStock?: boolean;
  badge?: string;
}

export type CategorySlug =
  | "transceivers"
  | "patch-cords"
  | "mpo-mtp"
  | "infrastructure"
  | "ftth"
  | "adapters-passives"
  | "test-tools"
  | "dac-aoc"
  | "bulk-cable"
  | "bundles";

export type MarketSegment =
  | "data-center"
  | "ftth-bead"
  | "enterprise"
  | "telecom"
  | "industrial"
  | "all";

export type ProductImageType =
  | "patch-cord-sm"
  | "patch-cord-mm"
  | "patch-cord-apc"
  | "patch-cord-armored"
  | "mpo-trunk"
  | "mpo-breakout"
  | "sfp"
  | "sfp-plus"
  | "qsfp28"
  | "qsfp-dd"
  | "dac"
  | "panel-1u"
  | "panel-2u"
  | "wall-mount"
  | "lgx-cassette"
  | "splice-closure"
  | "adapter"
  | "attenuator"
  | "splitter"
  | "vfl"
  | "power-meter"
  | "cleaner"
  | "cleaver"
  | "fdh"
  | "fdt"
  | "bundle-kit";

/* ─── Navigation Structure (customer-first) ─── */

export interface NavCategory {
  name: string;
  slug: CategorySlug;
  icon: string;
  tagline: string;
  revenueWeight: number; // % of total revenue
  featured: boolean; // show prominently
  families: number; // count of product families
}

export const CATEGORIES: NavCategory[] = [
  {
    name: "Transceivers & Optics",
    slug: "transceivers",
    icon: "💡",
    tagline: "Up to 95% below OEM. Lifetime warranty.",
    revenueWeight: 45,
    featured: true,
    families: 0, // populated below
  },
  {
    name: "Patch Cords",
    slug: "patch-cords",
    icon: "🔌",
    tagline: "OS2, OM3, OM4, OM5. Every connector. Ships today.",
    revenueWeight: 20,
    featured: true,
    families: 0,
  },
  {
    name: "MPO/MTP Solutions",
    slug: "mpo-mtp",
    icon: "⚡",
    tagline: "Trunk cables, breakouts, cassettes for high-density.",
    revenueWeight: 8,
    featured: true,
    families: 0,
  },
  {
    name: "DAC & AOC Cables",
    slug: "dac-aoc",
    icon: "🔗",
    tagline: "Direct attach copper and active optical for short runs.",
    revenueWeight: 7,
    featured: false,
    families: 0,
  },
  {
    name: "Infrastructure",
    slug: "infrastructure",
    icon: "🏗️",
    tagline: "Panels, enclosures, cassettes, cable management.",
    revenueWeight: 8,
    featured: true,
    families: 0,
  },
  {
    name: "FTTH & Broadband",
    slug: "ftth",
    icon: "🏠",
    tagline: "BEAD-ready. Drop cables, splitters, FDH, NAPs.",
    revenueWeight: 5,
    featured: true,
    families: 0,
  },
  {
    name: "Adapters & Passives",
    slug: "adapters-passives",
    icon: "🔗",
    tagline: "Couplers, attenuators, splitters, WDM.",
    revenueWeight: 3,
    featured: false,
    families: 0,
  },
  {
    name: "Test & Tools",
    slug: "test-tools",
    icon: "🔧",
    tagline: "VFLs, power meters, cleavers, cleaning.",
    revenueWeight: 4,
    featured: false,
    families: 0,
  },
  {
    name: "Bundles & Kits",
    slug: "bundles",
    icon: "📦",
    tagline: "Pre-packaged kits for common deployments.",
    revenueWeight: 0,
    featured: true,
    families: 0,
  },
];

/* ─── TRANSCEIVERS — organized by brand compatibility (how buyers actually shop) ─── */

const TRANSCEIVER_BRANDS = [
  "Cisco", "Arista", "Juniper", "HP/HPE", "Dell",
  "Brocade", "Huawei", "MikroTik", "Ubiquiti", "Fortinet",
  "Mellanox/NVIDIA", "Extreme", "Palo Alto",
] as const;

const STANDARD_LENGTHS = ["1m", "2m", "3m", "5m", "7m", "10m", "15m", "20m", "25m", "30m", "50m"];
const POPULAR_LENGTHS = ["1m", "2m", "3m", "5m", "10m"]; // stock these

const JACKET_OPTIONS: OptionValue[] = [
  { label: "LSZH", value: "lszh", badge: "Standard" },
  { label: "PVC", value: "pvc" },
  { label: "Plenum (OFNP)", value: "ofnp", priceModifier: 1.5 },
  { label: "Riser (OFNR)", value: "ofnr", priceModifier: 0.5 },
];

export const PRODUCT_FAMILIES: ProductFamily[] = [

  // ════════════════════════════════════════════════════
  // TRANSCEIVERS — THE MARGIN ENGINE (45% of revenue)
  // ════════════════════════════════════════════════════

  // 10G SFP+ (highest volume transceiver)
  {
    id: "sfp-plus-10g-sr",
    name: "10G SFP+ SR Multimode Transceiver",
    shortName: "10G SFP+ SR",
    category: "transceivers",
    segment: ["data-center", "enterprise"],
    description: "Short-reach 10G multimode transceiver. Compatible with Cisco SFP-10G-SR, Arista SFP-10G-SRL, Juniper EX-SFP-10GE-SR.",
    baseSpecs: { speed: "10Gbps", wavelength: "850nm", reach: "300m (OM3) / 400m (OM4)", connector: "LC Duplex", power: "<1W", ddm: "Yes" },
    options: [
      { name: "Brand Compatibility", type: "select", affects: "sku", values: TRANSCEIVER_BRANDS.map(b => ({ label: b, value: b.toLowerCase().replace(/[^a-z]/g, ""), inStock: true })) },
    ],
    priceFrom: 12.99, priceTo: 12.99, compareAtFrom: 45,
    margin: 82, demandTier: "A", stockStrategy: "always-stock",
    tags: ["10G", "SFP+", "SR", "Multimode", "Data Center"],
    certifications: ["MSA Compliant", "RoHS", "FCC Class 1 Laser"],
    image: "sfp-plus",
  },
  {
    id: "sfp-plus-10g-lr",
    name: "10G SFP+ LR Singlemode Transceiver",
    shortName: "10G SFP+ LR",
    category: "transceivers",
    segment: ["data-center", "enterprise", "telecom"],
    description: "Long-reach 10G singlemode transceiver. Compatible with Cisco SFP-10G-LR, Arista SFP-10G-LR, Juniper EX-SFP-10GE-LR.",
    baseSpecs: { speed: "10Gbps", wavelength: "1310nm", reach: "10km", connector: "LC Duplex", power: "<1W", ddm: "Yes" },
    options: [
      { name: "Brand Compatibility", type: "select", affects: "sku", values: TRANSCEIVER_BRANDS.map(b => ({ label: b, value: b.toLowerCase().replace(/[^a-z]/g, ""), inStock: true })) },
    ],
    priceFrom: 15.99, priceTo: 15.99, compareAtFrom: 55,
    margin: 80, demandTier: "A", stockStrategy: "always-stock",
    tags: ["10G", "SFP+", "LR", "Singlemode", "10km"],
    certifications: ["MSA Compliant", "RoHS", "FCC Class 1 Laser"],
    image: "sfp-plus",
  },
  {
    id: "qsfp28-100g-sr4",
    name: "100G QSFP28 SR4 Multimode Transceiver",
    shortName: "100G QSFP28 SR4",
    category: "transceivers",
    segment: ["data-center"],
    description: "100G short-reach for leaf-spine. Compatible with Cisco QSFP-100G-SR4-S, Arista QSFP-100G-SR4.",
    baseSpecs: { speed: "100Gbps", wavelength: "850nm", reach: "100m (OM4)", connector: "MPO-12", power: "<3.5W", ddm: "Yes" },
    options: [
      { name: "Brand Compatibility", type: "select", affects: "sku", values: TRANSCEIVER_BRANDS.slice(0, 8).map(b => ({ label: b, value: b.toLowerCase().replace(/[^a-z]/g, ""), inStock: true })) },
    ],
    priceFrom: 49.99, priceTo: 49.99, compareAtFrom: 180,
    margin: 85, demandTier: "A", stockStrategy: "always-stock",
    tags: ["100G", "QSFP28", "SR4", "Multimode", "Data Center"],
    certifications: ["MSA Compliant", "RoHS", "FCC Class 1 Laser"],
    image: "qsfp28",
  },
  {
    id: "qsfp28-100g-lr4",
    name: "100G QSFP28 LR4 Singlemode Transceiver",
    shortName: "100G QSFP28 LR4",
    category: "transceivers",
    segment: ["data-center", "telecom"],
    description: "100G long-reach singlemode. Compatible with Cisco QSFP-100G-LR4-S.",
    baseSpecs: { speed: "100Gbps", wavelength: "1310nm", reach: "10km", connector: "LC Duplex", power: "<4.5W", ddm: "Yes" },
    options: [
      { name: "Brand Compatibility", type: "select", affects: "sku", values: TRANSCEIVER_BRANDS.slice(0, 8).map(b => ({ label: b, value: b.toLowerCase().replace(/[^a-z]/g, ""), inStock: true })) },
    ],
    priceFrom: 89.99, priceTo: 89.99, compareAtFrom: 350,
    margin: 83, demandTier: "A", stockStrategy: "always-stock",
    tags: ["100G", "QSFP28", "LR4", "Singlemode", "10km"],
    certifications: ["MSA Compliant", "RoHS"],
    image: "qsfp28",
  },
  {
    id: "qsfp-dd-400g-dr4",
    name: "400G QSFP-DD DR4 Singlemode Transceiver",
    shortName: "400G QSFP-DD DR4",
    category: "transceivers",
    segment: ["data-center"],
    description: "400G for next-gen data centers. Compatible with Cisco QDD-400G-DR4-S, Arista.",
    baseSpecs: { speed: "400Gbps", wavelength: "1310nm", reach: "500m", connector: "MPO-12 APC", power: "<10W", ddm: "Yes" },
    options: [
      { name: "Brand Compatibility", type: "select", affects: "sku", values: TRANSCEIVER_BRANDS.slice(0, 5).map(b => ({ label: b, value: b.toLowerCase().replace(/[^a-z]/g, ""), inStock: true })) },
    ],
    priceFrom: 249.99, priceTo: 249.99, compareAtFrom: 800,
    margin: 78, demandTier: "A", stockStrategy: "always-stock",
    tags: ["400G", "QSFP-DD", "DR4", "Singlemode", "Next-Gen"],
    certifications: ["MSA Compliant", "RoHS"],
    image: "qsfp-dd",
  },
  {
    id: "sfp-1g-lx",
    name: "1G SFP LX Singlemode Transceiver",
    shortName: "1G SFP LX",
    category: "transceivers",
    segment: ["enterprise", "all"],
    description: "1G long-reach SFP. Compatible with Cisco GLC-LH-SMD.",
    baseSpecs: { speed: "1Gbps", wavelength: "1310nm", reach: "10km", connector: "LC Duplex", power: "<0.8W", ddm: "Yes" },
    options: [
      { name: "Brand Compatibility", type: "select", affects: "sku", values: TRANSCEIVER_BRANDS.map(b => ({ label: b, value: b.toLowerCase().replace(/[^a-z]/g, ""), inStock: true })) },
    ],
    priceFrom: 9.99, priceTo: 9.99, compareAtFrom: 35,
    margin: 78, demandTier: "A", stockStrategy: "always-stock",
    tags: ["1G", "SFP", "LX", "Singlemode", "Enterprise"],
    certifications: ["MSA Compliant", "RoHS"],
    image: "sfp",
  },

  // ════════════════════════════════════════════════════
  // PATCH CORDS — BREAD & BUTTER (20% of revenue)
  // Each entry = ONE product family with length/jacket/color options
  // ════════════════════════════════════════════════════

  {
    id: "pc-lclc-os2-duplex",
    name: "LC-LC Singlemode OS2 Duplex Patch Cord",
    shortName: "LC-LC OS2 Duplex",
    category: "patch-cords",
    segment: ["data-center", "enterprise", "telecom"],
    description: "The #1 selling fiber patch cord. OS2 singlemode duplex with LC/UPC connectors. LSZH jacket standard.",
    baseSpecs: { fiber: "OS2 9/125μm", config: "Duplex", connector: "LC/UPC – LC/UPC", il: "≤ 0.2dB", rl: "≥ 55dB" },
    options: [
      { name: "Length", type: "select", affects: "both", values: STANDARD_LENGTHS.map((l, i) => ({ label: l, value: l, priceModifier: i * 0.4, inStock: i < 6, badge: i === 0 ? "Most Popular" : undefined })) },
      { name: "Jacket", type: "select", affects: "sku", values: JACKET_OPTIONS },
      { name: "Color", type: "color", affects: "sku", values: [
        { label: "Yellow (Standard)", value: "yellow" },
        { label: "Blue", value: "blue" },
        { label: "White", value: "white" },
      ]},
    ],
    priceFrom: 3.99, priceTo: 24.49, compareAtFrom: 4.50,
    margin: 62, demandTier: "A", stockStrategy: "always-stock",
    tags: ["LC", "OS2", "Singlemode", "Duplex", "Best Seller"],
    certifications: ["RoHS", "UL", "TIA/EIA-568", "Telcordia GR-326"],
    image: "patch-cord-sm",
  },
  {
    id: "pc-lclc-om4-duplex",
    name: "LC-LC Multimode OM4 Duplex Patch Cord",
    shortName: "LC-LC OM4 Duplex",
    category: "patch-cords",
    segment: ["data-center"],
    description: "High-bandwidth OM4 multimode duplex for 10G/40G/100G data center connections.",
    baseSpecs: { fiber: "OM4 50/125μm", config: "Duplex", connector: "LC/UPC – LC/UPC", il: "≤ 0.2dB", rl: "≥ 20dB" },
    options: [
      { name: "Length", type: "select", affects: "both", values: STANDARD_LENGTHS.map((l, i) => ({ label: l, value: l, priceModifier: i * 0.4, inStock: i < 6 })) },
      { name: "Jacket", type: "select", affects: "sku", values: JACKET_OPTIONS },
    ],
    priceFrom: 4.49, priceTo: 24.49, compareAtFrom: 5.50,
    margin: 60, demandTier: "A", stockStrategy: "always-stock",
    tags: ["LC", "OM4", "Multimode", "Duplex", "Data Center", "10G", "40G"],
    certifications: ["RoHS", "UL", "TIA/EIA-568", "Telcordia GR-326"],
    image: "patch-cord-mm",
  },
  {
    id: "pc-scapc-os2-simplex",
    name: "SC/APC Singlemode OS2 Simplex Patch Cord",
    shortName: "SC/APC OS2 Simplex",
    category: "patch-cords",
    segment: ["ftth-bead", "telecom"],
    description: "The standard FTTH/PON patch cord. SC/APC connectors with 8° angle polish for minimal back-reflection.",
    baseSpecs: { fiber: "OS2 9/125μm", config: "Simplex", connector: "SC/APC – SC/APC", il: "≤ 0.2dB", rl: "≥ 65dB" },
    options: [
      { name: "Length", type: "select", affects: "both", values: STANDARD_LENGTHS.map((l, i) => ({ label: l, value: l, priceModifier: i * 0.35, inStock: i < 6 })) },
      { name: "Jacket", type: "select", affects: "sku", values: JACKET_OPTIONS },
    ],
    priceFrom: 2.99, priceTo: 21.49, compareAtFrom: 4.00,
    margin: 65, demandTier: "A", stockStrategy: "always-stock",
    tags: ["SC/APC", "OS2", "Singlemode", "Simplex", "FTTH", "PON", "BEAD"],
    certifications: ["RoHS", "UL", "TIA/EIA-568", "Telcordia GR-326"],
    image: "patch-cord-apc",
  },
  {
    id: "pc-scupc-os2-duplex",
    name: "SC-SC Singlemode OS2 Duplex Patch Cord",
    shortName: "SC-SC OS2 Duplex",
    category: "patch-cords",
    segment: ["enterprise", "telecom"],
    description: "Standard SC duplex singlemode patch cord for enterprise and telecom patch panels.",
    baseSpecs: { fiber: "OS2 9/125μm", config: "Duplex", connector: "SC/UPC – SC/UPC", il: "≤ 0.2dB", rl: "≥ 55dB" },
    options: [
      { name: "Length", type: "select", affects: "both", values: STANDARD_LENGTHS.map((l, i) => ({ label: l, value: l, priceModifier: i * 0.35, inStock: i < 6 })) },
      { name: "Jacket", type: "select", affects: "sku", values: JACKET_OPTIONS },
    ],
    priceFrom: 3.79, priceTo: 23.29, compareAtFrom: 4.80,
    margin: 60, demandTier: "B", stockStrategy: "stock-popular",
    tags: ["SC", "OS2", "Singlemode", "Duplex"],
    certifications: ["RoHS", "UL", "TIA/EIA-568"],
    image: "patch-cord-sm",
  },
  {
    id: "pc-sclc-os2-duplex",
    name: "SC-LC Singlemode OS2 Duplex Patch Cord",
    shortName: "SC-LC OS2 Duplex",
    category: "patch-cords",
    segment: ["enterprise"],
    description: "Cross-connect patch cord between SC and LC patch panels.",
    baseSpecs: { fiber: "OS2 9/125μm", config: "Duplex", connector: "SC/UPC – LC/UPC", il: "≤ 0.3dB", rl: "≥ 55dB" },
    options: [
      { name: "Length", type: "select", affects: "both", values: STANDARD_LENGTHS.map((l, i) => ({ label: l, value: l, priceModifier: i * 0.4, inStock: i < 5 })) },
    ],
    priceFrom: 3.99, priceTo: 23.99, compareAtFrom: 5.50,
    margin: 58, demandTier: "B", stockStrategy: "stock-popular",
    tags: ["SC", "LC", "OS2", "Singlemode", "Duplex", "Cross-Connect"],
    certifications: ["RoHS", "UL", "TIA/EIA-568"],
    image: "patch-cord-sm",
  },

  // ════════════════════════════════════════════════════
  // DAC & AOC (7% — often bought with transceivers)
  // ════════════════════════════════════════════════════

  {
    id: "dac-10g-sfp-plus",
    name: "10G SFP+ Direct Attach Copper Cable",
    shortName: "10G SFP+ DAC",
    category: "dac-aoc",
    segment: ["data-center", "enterprise"],
    description: "Passive copper twinax for short ToR connections. Lower power and cost than transceivers.",
    baseSpecs: { speed: "10Gbps", type: "Passive Copper", gauge: "30AWG" },
    options: [
      { name: "Length", type: "select", affects: "both", values: [
        { label: "0.5m", value: "0.5m", inStock: true },
        { label: "1m", value: "1m", inStock: true, badge: "Most Popular" },
        { label: "2m", value: "2m", priceModifier: 2, inStock: true },
        { label: "3m", value: "3m", priceModifier: 4, inStock: true },
        { label: "5m", value: "5m", priceModifier: 8, inStock: true },
      ]},
      { name: "Brand Compatibility", type: "select", affects: "sku", values: TRANSCEIVER_BRANDS.slice(0, 8).map(b => ({ label: b, value: b.toLowerCase().replace(/[^a-z]/g, ""), inStock: true })) },
    ],
    priceFrom: 8.99, priceTo: 16.99, compareAtFrom: 25,
    margin: 72, demandTier: "A", stockStrategy: "always-stock",
    tags: ["10G", "SFP+", "DAC", "Copper", "Twinax"],
    certifications: ["MSA Compliant", "RoHS"],
    image: "dac",
  },
  {
    id: "dac-100g-qsfp28",
    name: "100G QSFP28 Direct Attach Copper Cable",
    shortName: "100G QSFP28 DAC",
    category: "dac-aoc",
    segment: ["data-center"],
    description: "100G passive copper for leaf-spine within a rack.",
    baseSpecs: { speed: "100Gbps", type: "Passive Copper", gauge: "26AWG" },
    options: [
      { name: "Length", type: "select", affects: "both", values: [
        { label: "0.5m", value: "0.5m", inStock: true },
        { label: "1m", value: "1m", inStock: true, badge: "Most Popular" },
        { label: "2m", value: "2m", priceModifier: 8, inStock: true },
        { label: "3m", value: "3m", priceModifier: 15, inStock: true },
      ]},
      { name: "Brand Compatibility", type: "select", affects: "sku", values: TRANSCEIVER_BRANDS.slice(0, 5).map(b => ({ label: b, value: b.toLowerCase().replace(/[^a-z]/g, ""), inStock: true })) },
    ],
    priceFrom: 29.99, priceTo: 44.99, compareAtFrom: 120,
    margin: 80, demandTier: "A", stockStrategy: "always-stock",
    tags: ["100G", "QSFP28", "DAC", "Copper"],
    certifications: ["MSA Compliant", "RoHS"],
    image: "dac",
  },

  // ════════════════════════════════════════════════════
  // MPO/MTP (8% — high-density data center)
  // ════════════════════════════════════════════════════

  {
    id: "mpo-12-os2-trunk",
    name: "MPO-12 Singlemode OS2 Trunk Cable",
    shortName: "MPO-12 OS2 Trunk",
    category: "mpo-mtp",
    segment: ["data-center"],
    description: "12-fiber MTP/MPO trunk for structured cabling between panels. Elite low-loss connectors.",
    baseSpecs: { fiber: "OS2 9/125μm", fiberCount: "12F", polarity: "Type A", grade: "Elite (≤0.35dB)" },
    options: [
      { name: "Length", type: "select", affects: "both", values: [
        { label: "1m", value: "1m", inStock: true },
        { label: "3m", value: "3m", priceModifier: 10, inStock: true, badge: "Most Popular" },
        { label: "5m", value: "5m", priceModifier: 18, inStock: true },
        { label: "10m", value: "10m", priceModifier: 35, inStock: true },
        { label: "15m", value: "15m", priceModifier: 50 },
        { label: "25m", value: "25m", priceModifier: 80 },
        { label: "50m", value: "50m", priceModifier: 150 },
      ]},
      { name: "Polarity", type: "select", affects: "sku", values: [
        { label: "Type A (Straight)", value: "type-a", badge: "Standard" },
        { label: "Type B (Reversed)", value: "type-b" },
        { label: "Type C (Pair Flip)", value: "type-c" },
      ]},
    ],
    priceFrom: 29.99, priceTo: 179.99, compareAtFrom: 38,
    margin: 58, demandTier: "A", stockStrategy: "stock-popular",
    tags: ["MPO", "MTP", "12F", "OS2", "Trunk", "Data Center"],
    certifications: ["RoHS", "UL", "TIA/EIA-568"],
    image: "mpo-trunk",
  },
  {
    id: "mpo-lc-breakout-12f",
    name: "MPO to 12×LC Breakout Cable",
    shortName: "MPO→12×LC Breakout",
    category: "mpo-mtp",
    segment: ["data-center"],
    description: "Fan-out from MPO-12 to 12 individual LC connectors. For connecting trunk to equipment.",
    baseSpecs: { fiber: "OS2 9/125μm", fiberCount: "12F", connectorA: "MPO-12 Female", connectorB: "12× LC/UPC" },
    options: [
      { name: "Length", type: "select", affects: "both", values: [
        { label: "1m", value: "1m", inStock: true },
        { label: "2m", value: "2m", priceModifier: 10, inStock: true, badge: "Most Popular" },
        { label: "3m", value: "3m", priceModifier: 18, inStock: true },
        { label: "5m", value: "5m", priceModifier: 30, inStock: true },
      ]},
      { name: "Fiber Type", type: "select", affects: "both", values: [
        { label: "OS2 Singlemode", value: "os2", badge: "Standard" },
        { label: "OM4 Multimode", value: "om4", priceModifier: -3 },
      ]},
    ],
    priceFrom: 39.99, priceTo: 69.99, compareAtFrom: 55,
    margin: 55, demandTier: "A", stockStrategy: "stock-popular",
    tags: ["MPO", "LC", "Breakout", "Fan-out", "12F"],
    certifications: ["RoHS", "UL"],
    image: "mpo-breakout",
  },

  // ════════════════════════════════════════════════════
  // TEST & TOOLS (4% — high margin, brand loyalty)
  // ════════════════════════════════════════════════════

  {
    id: "vfl-10mw",
    name: "Visual Fault Locator 10mW",
    shortName: "VFL 10mW",
    category: "test-tools",
    segment: ["all"],
    description: "Essential diagnostic tool. 650nm red laser traces fiber and locates breaks, bends, and bad splices up to 10km.",
    baseSpecs: { power: "10mW", wavelength: "650nm", range: "10km", connector: "2.5mm Universal + 1.25mm Adapter" },
    options: [],
    priceFrom: 18.99, priceTo: 18.99, compareAtFrom: 30,
    margin: 70, demandTier: "A", stockStrategy: "always-stock",
    tags: ["VFL", "Fault Locator", "Red Laser", "Diagnostic"],
    certifications: ["Class II Laser", "CE", "RoHS"],
    image: "vfl",
  },
  {
    id: "opm-pro",
    name: "Optical Power Meter — Pro Series",
    shortName: "Power Meter Pro",
    category: "test-tools",
    segment: ["all"],
    description: "6-wavelength optical power meter with rechargeable battery. Measures -70 to +10 dBm.",
    baseSpecs: { range: "-70 to +10 dBm", wavelengths: "850/1300/1310/1490/1550/1625nm", connector: "FC/SC/ST Interchangeable", battery: "Rechargeable Li-ion" },
    options: [],
    priceFrom: 39.99, priceTo: 39.99, compareAtFrom: 65,
    margin: 72, demandTier: "A", stockStrategy: "always-stock",
    tags: ["Power Meter", "Test", "dBm", "6 Wavelength"],
    certifications: ["CE", "RoHS"],
    image: "power-meter",
  },
  {
    id: "clean-oneclick-lc",
    name: "LC One-Click Fiber Cleaner",
    shortName: "LC One-Click Cleaner",
    category: "test-tools",
    segment: ["all"],
    description: "Push-button fiber endface cleaner for 1.25mm ferrules. 800+ cleans, no alcohol needed.",
    baseSpecs: { ferrule: "1.25mm", cleans: "800+", type: "Dry Clean", compatibility: "LC, MU" },
    options: [],
    priceFrom: 6.99, priceTo: 6.99, compareAtFrom: 10,
    margin: 68, demandTier: "A", stockStrategy: "always-stock",
    tags: ["Cleaning", "One-Click", "LC", "1.25mm"],
    certifications: ["RoHS"],
    image: "cleaner",
  },
];

// Populate family counts
CATEGORIES.forEach((cat) => {
  cat.families = PRODUCT_FAMILIES.filter((f) => f.category === cat.slug).length;
});
