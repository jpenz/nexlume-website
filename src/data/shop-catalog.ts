/* ─── Off-the-Shelf Product Catalog ─── */

export interface ShopProduct {
  sku: string;
  name: string;
  category: string;
  subcategory: string;
  specs: string[];
  price: number;
  compareAt?: number; // competitor price
  inStock: boolean;
  quickShip: boolean;
  tier: "A" | "B" | "C";
  badge?: "Best Seller" | "New" | "Sale" | "BEAD Ready" | "Quick Ship";
  image?: string;
}

export interface ShopCategory {
  name: string;
  slug: string;
  description: string;
  icon: string;
  estimatedSKUs: number;
  subcategories: ShopSubcategory[];
}

export interface ShopSubcategory {
  name: string;
  slug: string;
  estimatedSKUs: number;
  priceRange: [number, number];
}

export interface Bundle {
  id: string;
  name: string;
  description: string;
  targetCustomer: string;
  items: { name: string; qty: number; value: number }[];
  bundlePrice: number;
  savings: number;
  badge?: string;
}

/* ─── Categories (from CellCog research) ─── */

export const SHOP_CATEGORIES: ShopCategory[] = [
  {
    name: "Patch Cords & Cables",
    slug: "patch-cords",
    description: "Pre-terminated fiber optic patch cords in standard lengths. Same-day shipping on all stock items.",
    icon: "🔌",
    estimatedSKUs: 280,
    subcategories: [
      { name: "Singlemode OS2 Duplex", slug: "sm-duplex", estimatedSKUs: 60, priceRange: [3.50, 45] },
      { name: "Singlemode OS2 Simplex", slug: "sm-simplex", estimatedSKUs: 30, priceRange: [2.50, 35] },
      { name: "Multimode OM3 Duplex", slug: "om3-duplex", estimatedSKUs: 30, priceRange: [3, 40] },
      { name: "Multimode OM4 Duplex", slug: "om4-duplex", estimatedSKUs: 30, priceRange: [4, 50] },
      { name: "Multimode OM5 Duplex", slug: "om5-duplex", estimatedSKUs: 15, priceRange: [8, 65] },
      { name: "MPO/MTP Trunk Cables", slug: "mpo-trunk", estimatedSKUs: 40, priceRange: [25, 350] },
      { name: "MPO Breakout Cables", slug: "mpo-breakout", estimatedSKUs: 25, priceRange: [35, 250] },
      { name: "Armored Patch Cords", slug: "armored", estimatedSKUs: 20, priceRange: [8, 55] },
      { name: "Bend-Insensitive (G.657A2)", slug: "bend-insensitive", estimatedSKUs: 15, priceRange: [4, 40] },
      { name: "Mode Conditioning", slug: "mode-conditioning", estimatedSKUs: 10, priceRange: [15, 65] },
      { name: "Pigtails", slug: "pigtails", estimatedSKUs: 25, priceRange: [2, 20] },
    ],
  },
  {
    name: "Transceivers & Optics",
    slug: "transceivers",
    description: "Compatible SFP, SFP+, SFP28, QSFP+, QSFP28, and QSFP-DD modules. 70-95% below OEM pricing.",
    icon: "💡",
    estimatedSKUs: 200,
    subcategories: [
      { name: "1G SFP", slug: "sfp-1g", estimatedSKUs: 25, priceRange: [8, 35] },
      { name: "10G SFP+", slug: "sfp-plus-10g", estimatedSKUs: 40, priceRange: [12, 65] },
      { name: "25G SFP28", slug: "sfp28-25g", estimatedSKUs: 20, priceRange: [25, 120] },
      { name: "40G QSFP+", slug: "qsfp-plus-40g", estimatedSKUs: 20, priceRange: [35, 180] },
      { name: "100G QSFP28", slug: "qsfp28-100g", estimatedSKUs: 30, priceRange: [45, 350] },
      { name: "400G QSFP-DD", slug: "qsfp-dd-400g", estimatedSKUs: 15, priceRange: [150, 800] },
      { name: "CWDM/DWDM", slug: "cwdm-dwdm", estimatedSKUs: 20, priceRange: [35, 250] },
      { name: "BiDi Transceivers", slug: "bidi", estimatedSKUs: 15, priceRange: [20, 150] },
      { name: "Media Converters", slug: "media-converters", estimatedSKUs: 15, priceRange: [25, 200] },
    ],
  },
  {
    name: "Infrastructure & Panels",
    slug: "patch-panels",
    description: "Rack-mount panels, wall-mount enclosures, LGX cassettes, and cable management solutions.",
    icon: "🏗️",
    estimatedSKUs: 150,
    subcategories: [
      { name: "Rack-Mount Patch Panels", slug: "rack-mount", estimatedSKUs: 30, priceRange: [25, 350] },
      { name: "Wall-Mount Enclosures", slug: "wall-mount", estimatedSKUs: 15, priceRange: [30, 200] },
      { name: "LGX Cassettes & Modules", slug: "lgx-cassettes", estimatedSKUs: 25, priceRange: [20, 150] },
      { name: "Splice Closures", slug: "splice-closures", estimatedSKUs: 15, priceRange: [25, 400] },
      { name: "Splice Trays", slug: "splice-trays", estimatedSKUs: 10, priceRange: [5, 30] },
      { name: "FDH / FDT / NAP", slug: "distribution", estimatedSKUs: 20, priceRange: [50, 800] },
      { name: "Cable Management", slug: "cable-management", estimatedSKUs: 20, priceRange: [5, 80] },
      { name: "Racks & Cabinets", slug: "racks", estimatedSKUs: 15, priceRange: [80, 600] },
    ],
  },
  {
    name: "Adapters, Attenuators & Passives",
    slug: "adapters",
    description: "Fiber adapters, couplers, fixed/variable attenuators, splitters, and WDM modules.",
    icon: "🔗",
    estimatedSKUs: 120,
    subcategories: [
      { name: "Fiber Adapters (Couplers)", slug: "fiber-adapters", estimatedSKUs: 35, priceRange: [1, 15] },
      { name: "Hybrid Adapters", slug: "hybrid-adapters", estimatedSKUs: 10, priceRange: [3, 20] },
      { name: "Fixed Attenuators", slug: "fixed-attenuators", estimatedSKUs: 25, priceRange: [3, 25] },
      { name: "Variable Attenuators", slug: "variable-attenuators", estimatedSKUs: 5, priceRange: [25, 120] },
      { name: "PLC Splitters", slug: "plc-splitters", estimatedSKUs: 15, priceRange: [10, 80] },
      { name: "FBT Splitters", slug: "fbt-splitters", estimatedSKUs: 10, priceRange: [8, 50] },
      { name: "WDM Modules (MUX/DEMUX)", slug: "wdm", estimatedSKUs: 15, priceRange: [20, 200] },
      { name: "Loopback Plugs", slug: "loopbacks", estimatedSKUs: 5, priceRange: [5, 20] },
    ],
  },
  {
    name: "Tools, Test & Cleaning",
    slug: "test-equipment",
    description: "Visual fault locators, power meters, OTDRs, cleavers, cleaning kits, and field tools.",
    icon: "🔧",
    estimatedSKUs: 80,
    subcategories: [
      { name: "Visual Fault Locators", slug: "vfl", estimatedSKUs: 8, priceRange: [15, 80] },
      { name: "Optical Power Meters", slug: "power-meters", estimatedSKUs: 10, priceRange: [30, 250] },
      { name: "Light Sources", slug: "light-sources", estimatedSKUs: 8, priceRange: [50, 300] },
      { name: "OTDRs", slug: "otdr", estimatedSKUs: 5, priceRange: [800, 5000] },
      { name: "Fiber Identifiers", slug: "identifiers", estimatedSKUs: 5, priceRange: [100, 500] },
      { name: "Cleaning Tools & Kits", slug: "cleaning", estimatedSKUs: 15, priceRange: [5, 80] },
      { name: "Fiber Cleavers", slug: "cleavers", estimatedSKUs: 5, priceRange: [50, 400] },
      { name: "Stripping & Prep Tools", slug: "stripping", estimatedSKUs: 10, priceRange: [10, 60] },
      { name: "Inspection Scopes", slug: "inspection", estimatedSKUs: 8, priceRange: [150, 2000] },
      { name: "Connector Kits", slug: "connector-kits", estimatedSKUs: 6, priceRange: [20, 150] },
    ],
  },
];

/* ─── Top 30 Best-Selling SKUs (Tier A — must stock for launch) ─── */

export const TOP_SKUS: ShopProduct[] = [
  // Patch Cords — the bread & butter
  { sku: "NX-PC-LCLC-SM-DX-1M", name: "LC-LC OS2 Singlemode Duplex Patch Cord — 1m", category: "patch-cords", subcategory: "sm-duplex", specs: ["OS2 9/125μm", "Duplex", "LSZH", "IL ≤0.2dB"], price: 3.99, compareAt: 4.50, inStock: true, quickShip: true, tier: "A", badge: "Best Seller" },
  { sku: "NX-PC-LCLC-SM-DX-2M", name: "LC-LC OS2 Singlemode Duplex Patch Cord — 2m", category: "patch-cords", subcategory: "sm-duplex", specs: ["OS2 9/125μm", "Duplex", "LSZH", "IL ≤0.2dB"], price: 4.49, compareAt: 5.20, inStock: true, quickShip: true, tier: "A", badge: "Best Seller" },
  { sku: "NX-PC-LCLC-SM-DX-3M", name: "LC-LC OS2 Singlemode Duplex Patch Cord — 3m", category: "patch-cords", subcategory: "sm-duplex", specs: ["OS2 9/125μm", "Duplex", "LSZH", "IL ≤0.2dB"], price: 4.99, compareAt: 5.80, inStock: true, quickShip: true, tier: "A" },
  { sku: "NX-PC-LCLC-SM-DX-5M", name: "LC-LC OS2 Singlemode Duplex Patch Cord — 5m", category: "patch-cords", subcategory: "sm-duplex", specs: ["OS2 9/125μm", "Duplex", "LSZH", "IL ≤0.2dB"], price: 5.99, compareAt: 7.00, inStock: true, quickShip: true, tier: "A" },
  { sku: "NX-PC-LCLC-OM4-DX-1M", name: "LC-LC OM4 Multimode Duplex Patch Cord — 1m", category: "patch-cords", subcategory: "om4-duplex", specs: ["OM4 50/125μm", "Duplex", "LSZH", "Aqua"], price: 4.49, compareAt: 5.50, inStock: true, quickShip: true, tier: "A", badge: "Best Seller" },
  { sku: "NX-PC-LCLC-OM4-DX-3M", name: "LC-LC OM4 Multimode Duplex Patch Cord — 3m", category: "patch-cords", subcategory: "om4-duplex", specs: ["OM4 50/125μm", "Duplex", "LSZH", "Aqua"], price: 5.49, compareAt: 6.80, inStock: true, quickShip: true, tier: "A" },
  { sku: "NX-PC-SCAPC-SM-SX-1M", name: "SC/APC OS2 Singlemode Simplex Patch Cord — 1m", category: "patch-cords", subcategory: "sm-simplex", specs: ["OS2 9/125μm", "Simplex", "LSZH", "APC"], price: 3.29, compareAt: 4.00, inStock: true, quickShip: true, tier: "A", badge: "BEAD Ready" },
  { sku: "NX-PC-SCAPC-SM-SX-3M", name: "SC/APC OS2 Singlemode Simplex Patch Cord — 3m", category: "patch-cords", subcategory: "sm-simplex", specs: ["OS2 9/125μm", "Simplex", "LSZH", "APC"], price: 3.99, compareAt: 4.80, inStock: true, quickShip: true, tier: "A", badge: "BEAD Ready" },
  { sku: "NX-PC-SCLC-SM-DX-2M", name: "SC-LC OS2 Singlemode Duplex Patch Cord — 2m", category: "patch-cords", subcategory: "sm-duplex", specs: ["OS2 9/125μm", "Duplex", "LSZH"], price: 4.49, compareAt: 5.50, inStock: true, quickShip: true, tier: "A" },
  { sku: "NX-PC-MPO12-SM-3M", name: "MPO-12 OS2 Singlemode Trunk Cable — 3m", category: "patch-cords", subcategory: "mpo-trunk", specs: ["12F OS2", "Type A", "Elite Grade", "LSZH"], price: 29.99, compareAt: 38.00, inStock: true, quickShip: true, tier: "A", badge: "Best Seller" },

  // Transceivers — the margin engine
  { sku: "NX-SFP-10G-SR", name: "10G SFP+ SR Multimode Transceiver — 850nm 300m", category: "transceivers", subcategory: "sfp-plus-10g", specs: ["10Gbps", "850nm", "OM3 300m / OM4 400m", "DDM"], price: 12.99, compareAt: 45.00, inStock: true, quickShip: true, tier: "A", badge: "Best Seller" },
  { sku: "NX-SFP-10G-LR", name: "10G SFP+ LR Singlemode Transceiver — 1310nm 10km", category: "transceivers", subcategory: "sfp-plus-10g", specs: ["10Gbps", "1310nm", "OS2 10km", "DDM"], price: 15.99, compareAt: 55.00, inStock: true, quickShip: true, tier: "A", badge: "Best Seller" },
  { sku: "NX-SFP-1G-SX", name: "1G SFP SX Multimode Transceiver — 850nm 550m", category: "transceivers", subcategory: "sfp-1g", specs: ["1Gbps", "850nm", "OM2 550m", "DDM"], price: 8.99, compareAt: 30.00, inStock: true, quickShip: true, tier: "A" },
  { sku: "NX-SFP-1G-LX", name: "1G SFP LX Singlemode Transceiver — 1310nm 10km", category: "transceivers", subcategory: "sfp-1g", specs: ["1Gbps", "1310nm", "OS2 10km", "DDM"], price: 9.99, compareAt: 35.00, inStock: true, quickShip: true, tier: "A" },
  { sku: "NX-QSFP28-100G-SR4", name: "100G QSFP28 SR4 Transceiver — 850nm 100m", category: "transceivers", subcategory: "qsfp28-100g", specs: ["100Gbps", "850nm", "OM4 100m", "MPO-12"], price: 49.99, compareAt: 180.00, inStock: true, quickShip: true, tier: "A", badge: "Best Seller" },
  { sku: "NX-QSFP28-100G-LR4", name: "100G QSFP28 LR4 Transceiver — 1310nm 10km", category: "transceivers", subcategory: "qsfp28-100g", specs: ["100Gbps", "1310nm", "OS2 10km", "LC Duplex"], price: 89.99, compareAt: 350.00, inStock: true, quickShip: true, tier: "A" },
  { sku: "NX-QSFP-DD-400G-SR8", name: "400G QSFP-DD SR8 Transceiver — 850nm 100m", category: "transceivers", subcategory: "qsfp-dd-400g", specs: ["400Gbps", "850nm", "OM4 100m", "MPO-16"], price: 189.99, compareAt: 600.00, inStock: true, quickShip: true, tier: "A", badge: "New" },

  // Adapters & Passives
  { sku: "NX-AD-LCLC-SM-DX", name: "LC-LC Singlemode Duplex Adapter — Blue", category: "adapters", subcategory: "fiber-adapters", specs: ["Singlemode", "Duplex", "Zirconia Sleeve", "Blue"], price: 1.49, compareAt: 2.50, inStock: true, quickShip: true, tier: "A" },
  { sku: "NX-AD-SCAPC-SM-SX", name: "SC/APC Singlemode Simplex Adapter — Green", category: "adapters", subcategory: "fiber-adapters", specs: ["Singlemode", "Simplex", "APC", "Green"], price: 1.29, compareAt: 2.00, inStock: true, quickShip: true, tier: "A" },
  { sku: "NX-AT-LC-5DB", name: "LC/UPC Fixed Attenuator — 5dB", category: "adapters", subcategory: "fixed-attenuators", specs: ["LC/UPC", "5dB", "Singlemode", "Male-Female"], price: 3.99, compareAt: 6.50, inStock: true, quickShip: true, tier: "A" },
  { sku: "NX-SPL-PLC-1X8-SC", name: "PLC Splitter 1×8 SC/APC — Blockless", category: "adapters", subcategory: "plc-splitters", specs: ["1×8", "SC/APC", "Blockless", "IL ≤10.5dB"], price: 12.99, compareAt: 20.00, inStock: true, quickShip: true, tier: "A", badge: "BEAD Ready" },

  // Infrastructure
  { sku: "NX-PP-1U-24-LC", name: "1U 24-Port LC Duplex Patch Panel — Loaded", category: "patch-panels", subcategory: "rack-mount", specs: ["1U 19\"", "24 LC Duplex", "Pre-loaded", "SM/MM"], price: 45.99, compareAt: 65.00, inStock: true, quickShip: true, tier: "A", badge: "Best Seller" },
  { sku: "NX-PP-1U-48-LC", name: "1U 48-Port LC Duplex Patch Panel — Loaded", category: "patch-panels", subcategory: "rack-mount", specs: ["1U 19\"", "48 LC Duplex", "Pre-loaded", "High Density"], price: 79.99, compareAt: 110.00, inStock: true, quickShip: true, tier: "A" },
  { sku: "NX-WM-12-SC", name: "Wall-Mount Enclosure 12-Port SC", category: "patch-panels", subcategory: "wall-mount", specs: ["12 Port", "SC Simplex", "Indoor", "Lockable"], price: 32.99, compareAt: 45.00, inStock: true, quickShip: true, tier: "B" },

  // Tools & Test
  { sku: "NX-VFL-10MW", name: "Visual Fault Locator 10mW — Red Laser", category: "test-equipment", subcategory: "vfl", specs: ["10mW", "650nm Red", "2.5mm + 1.25mm", "10km Range"], price: 18.99, compareAt: 30.00, inStock: true, quickShip: true, tier: "A", badge: "Best Seller" },
  { sku: "NX-OPM-PRO", name: "Optical Power Meter — Pro Series", category: "test-equipment", subcategory: "power-meters", specs: ["-70 to +10 dBm", "850/1310/1550nm", "FC/SC/ST", "Rechargeable"], price: 39.99, compareAt: 65.00, inStock: true, quickShip: true, tier: "A" },
  { sku: "NX-CLEAN-LC-CLICK", name: "LC One-Click Cleaner — 1.25mm", category: "test-equipment", subcategory: "cleaning", specs: ["1.25mm Ferrule", "800+ Cleans", "LC/MU", "No Alcohol"], price: 6.99, compareAt: 10.00, inStock: true, quickShip: true, tier: "A" },
  { sku: "NX-CLEAN-SC-CLICK", name: "SC One-Click Cleaner — 2.5mm", category: "test-equipment", subcategory: "cleaning", specs: ["2.5mm Ferrule", "500+ Cleans", "SC/FC/ST", "No Alcohol"], price: 6.99, compareAt: 10.00, inStock: true, quickShip: true, tier: "A" },
  { sku: "NX-KIT-CLEAN-PRO", name: "Fiber Cleaning Kit — Professional", category: "test-equipment", subcategory: "cleaning", specs: ["LC + SC Cleaners", "IPA Wipes", "Lint-Free Swabs", "Carrying Case"], price: 34.99, compareAt: 55.00, inStock: true, quickShip: true, tier: "A" },
];

/* ─── Bundles ─── */

export const BUNDLES: Bundle[] = [
  {
    id: "ftth-installer",
    name: "FTTH Installer Kit",
    description: "Everything a fiber installer needs for FTTH drop installations. BEAD program ready.",
    targetCustomer: "ISP field technicians, FTTH contractors",
    items: [
      { name: "SC/APC Patch Cords (10-pack, mixed lengths)", qty: 1, value: 35 },
      { name: "Visual Fault Locator 10mW", qty: 1, value: 19 },
      { name: "Optical Power Meter", qty: 1, value: 40 },
      { name: "SC/APC One-Click Cleaner", qty: 1, value: 7 },
      { name: "Fiber Stripping Tool Set", qty: 1, value: 15 },
      { name: "Splice-on Connectors SC/APC (20-pack)", qty: 1, value: 40 },
      { name: "Carrying Case", qty: 1, value: 20 },
    ],
    bundlePrice: 139.99,
    savings: 36,
    badge: "BEAD Ready",
  },
  {
    id: "datacenter-starter",
    name: "Data Center Starter Pack",
    description: "Core connectivity kit for new rack deployments. Includes patch cords, panel, and optics.",
    targetCustomer: "Data center engineers, colo providers",
    items: [
      { name: "1U 24-Port LC Patch Panel", qty: 1, value: 46 },
      { name: "LC-LC OS2 Duplex 2m (12-pack)", qty: 1, value: 48 },
      { name: "10G SFP+ SR Transceiver (4-pack)", qty: 1, value: 52 },
      { name: "LC One-Click Cleaner", qty: 2, value: 14 },
      { name: "Cable Management D-Rings (10-pack)", qty: 1, value: 12 },
    ],
    bundlePrice: 149.99,
    savings: 22,
  },
  {
    id: "technician-tool",
    name: "Fiber Technician Tool Kit",
    description: "Complete testing and termination toolkit for field and shop work.",
    targetCustomer: "Network technicians, contractors",
    items: [
      { name: "Visual Fault Locator 10mW", qty: 1, value: 19 },
      { name: "Optical Power Meter Pro", qty: 1, value: 40 },
      { name: "Fiber Inspection Scope 400×", qty: 1, value: 180 },
      { name: "Fiber Cleaver", qty: 1, value: 65 },
      { name: "Professional Cleaning Kit", qty: 1, value: 35 },
      { name: "Stripping & Prep Tool Set", qty: 1, value: 25 },
      { name: "Hard-Shell Carrying Case", qty: 1, value: 35 },
    ],
    bundlePrice: 349.99,
    savings: 49,
  },
  {
    id: "cleaning-maintenance",
    name: "Cleaning & Maintenance Kit",
    description: "Keep your fiber connections clean and performing at spec. Essentials for any fiber environment.",
    targetCustomer: "Any fiber optic user",
    items: [
      { name: "LC One-Click Cleaner", qty: 2, value: 14 },
      { name: "SC One-Click Cleaner", qty: 2, value: 14 },
      { name: "MPO One-Click Cleaner", qty: 1, value: 12 },
      { name: "IPA Cleaning Wipes (100-pack)", qty: 1, value: 8 },
      { name: "Lint-Free Swabs (200-pack)", qty: 1, value: 6 },
      { name: "Dust Caps Assortment (50-pack)", qty: 1, value: 5 },
    ],
    bundlePrice: 49.99,
    savings: 9,
  },
  {
    id: "enterprise-network",
    name: "Enterprise Network Kit",
    description: "Everything to deploy a new floor or building fiber backbone. Panels, cords, and management.",
    targetCustomer: "IT managers, enterprise network teams",
    items: [
      { name: "1U 48-Port LC Patch Panel", qty: 2, value: 160 },
      { name: "LC-LC OS2 Duplex 3m (24-pack)", qty: 1, value: 108 },
      { name: "LC-LC OM4 Duplex 3m (12-pack)", qty: 1, value: 60 },
      { name: "1G SFP LX Transceiver (8-pack)", qty: 1, value: 80 },
      { name: "Horizontal Cable Manager 1U", qty: 2, value: 30 },
      { name: "Professional Cleaning Kit", qty: 1, value: 35 },
    ],
    bundlePrice: 399.99,
    savings: 73,
  },
];
