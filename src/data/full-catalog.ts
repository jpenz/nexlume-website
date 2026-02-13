import type { ShopProduct } from "./shop-catalog";

/**
 * Extended product catalog — all categories fully populated.
 * This supplements TOP_SKUS with the full range of products.
 */

// Helper to generate patch cord variants
function patchCordSeries(
  connA: string,
  connB: string,
  fiber: string,
  config: string,
  fiberSpec: string,
  jacket: string,
  basePrice: number,
  category: string,
  subcategory: string,
  badge?: ShopProduct["badge"],
): ShopProduct[] {
  const lengths = [1, 2, 3, 5, 7, 10, 15, 20, 25, 30, 50];
  const sku_a = connA.replace(/\//g, "").replace(/\s/g, "");
  const sku_b = connB.replace(/\//g, "").replace(/\s/g, "");
  const fiberSku = fiber.replace(/[^A-Z0-9]/gi, "");
  const cfgSku = config === "Duplex" ? "DX" : config === "Simplex" ? "SX" : "DX";

  return lengths.map((len, i) => ({
    sku: `NX-PC-${sku_a}${sku_b}-${fiberSku}-${cfgSku}-${len}M`,
    name: `${connA}-${connB} ${fiber} ${config} Patch Cord — ${len}m`,
    category,
    subcategory,
    specs: [fiberSpec, config, jacket, `${len}m`],
    price: +(basePrice + len * 0.4).toFixed(2),
    compareAt: +((basePrice + len * 0.4) * 1.25).toFixed(2),
    inStock: i < 8, // first 8 lengths in stock
    quickShip: i < 6,
    tier: i < 4 ? "A" : i < 8 ? "B" : "C",
    badge: i === 0 ? badge : undefined,
  }));
}

// Helper to generate transceiver variants
function transceiverVariant(
  speed: string,
  type: string,
  reach: string,
  wavelength: string,
  connector: string,
  fiberType: string,
  price: number,
  compareAt: number,
  subcategory: string,
  badge?: ShopProduct["badge"],
): ShopProduct {
  const skuSpeed = speed.replace(/\s/g, "");
  const skuType = type.replace(/\s/g, "-");
  return {
    sku: `NX-${skuSpeed}-${skuType}`,
    name: `${speed} ${type} Transceiver — ${wavelength} ${reach}`,
    category: "transceivers",
    subcategory,
    specs: [speed, wavelength, `${fiberType} ${reach}`, connector, "DDM"],
    price,
    compareAt,
    inStock: true,
    quickShip: true,
    tier: "A",
    badge,
  };
}

/* ─── Singlemode Patch Cords ─── */
export const SM_DUPLEX_CORDS: ShopProduct[] = [
  ...patchCordSeries("LC/UPC", "LC/UPC", "OS2", "Duplex", "OS2 9/125μm", "LSZH", 3.99, "patch-cords", "sm-duplex", "Best Seller"),
  ...patchCordSeries("SC/UPC", "SC/UPC", "OS2", "Duplex", "OS2 9/125μm", "LSZH", 3.79, "patch-cords", "sm-duplex"),
  ...patchCordSeries("SC/UPC", "LC/UPC", "OS2", "Duplex", "OS2 9/125μm", "LSZH", 3.99, "patch-cords", "sm-duplex"),
  ...patchCordSeries("LC/APC", "LC/APC", "OS2", "Duplex", "OS2 9/125μm", "LSZH", 4.49, "patch-cords", "sm-duplex"),
  ...patchCordSeries("SC/APC", "LC/APC", "OS2", "Duplex", "OS2 9/125μm", "LSZH", 4.29, "patch-cords", "sm-duplex"),
];

export const SM_SIMPLEX_CORDS: ShopProduct[] = [
  ...patchCordSeries("SC/APC", "SC/APC", "OS2", "Simplex", "OS2 9/125μm", "LSZH", 2.99, "patch-cords", "sm-simplex", "BEAD Ready"),
  ...patchCordSeries("LC/UPC", "LC/UPC", "OS2", "Simplex", "OS2 9/125μm", "LSZH", 2.79, "patch-cords", "sm-simplex"),
  ...patchCordSeries("SC/UPC", "SC/UPC", "OS2", "Simplex", "OS2 9/125μm", "LSZH", 2.69, "patch-cords", "sm-simplex"),
  ...patchCordSeries("FC/UPC", "FC/UPC", "OS2", "Simplex", "OS2 9/125μm", "PVC", 3.29, "patch-cords", "sm-simplex"),
  ...patchCordSeries("ST", "ST", "OS2", "Simplex", "OS2 9/125μm", "PVC", 3.49, "patch-cords", "sm-simplex"),
];

export const OM4_DUPLEX_CORDS: ShopProduct[] = [
  ...patchCordSeries("LC/UPC", "LC/UPC", "OM4", "Duplex", "OM4 50/125μm", "LSZH", 4.49, "patch-cords", "om4-duplex", "Best Seller"),
  ...patchCordSeries("SC/UPC", "SC/UPC", "OM4", "Duplex", "OM4 50/125μm", "LSZH", 4.29, "patch-cords", "om4-duplex"),
  ...patchCordSeries("LC/UPC", "SC/UPC", "OM4", "Duplex", "OM4 50/125μm", "LSZH", 4.49, "patch-cords", "om4-duplex"),
];

export const OM3_DUPLEX_CORDS: ShopProduct[] = [
  ...patchCordSeries("LC/UPC", "LC/UPC", "OM3", "Duplex", "OM3 50/125μm", "LSZH", 3.49, "patch-cords", "om3-duplex"),
  ...patchCordSeries("SC/UPC", "SC/UPC", "OM3", "Duplex", "OM3 50/125μm", "LSZH", 3.29, "patch-cords", "om3-duplex"),
];

/* ─── Transceivers (full range) ─── */
export const ALL_TRANSCEIVERS: ShopProduct[] = [
  // 1G SFP
  transceiverVariant("1G", "SFP-SX", "550m", "850nm", "LC Duplex", "OM2", 8.99, 30, "sfp-1g"),
  transceiverVariant("1G", "SFP-LX", "10km", "1310nm", "LC Duplex", "OS2", 9.99, 35, "sfp-1g"),
  transceiverVariant("1G", "SFP-EX", "40km", "1310nm", "LC Duplex", "OS2", 18.99, 65, "sfp-1g"),
  transceiverVariant("1G", "SFP-ZX", "80km", "1550nm", "LC Duplex", "OS2", 35.99, 120, "sfp-1g"),
  transceiverVariant("1G", "SFP-T", "100m", "RJ45", "RJ45", "Cat6a", 12.99, 40, "sfp-1g"),
  transceiverVariant("1G", "SFP-BXU", "20km", "1310nm TX/1490nm RX", "LC Simplex", "OS2", 14.99, 50, "bidi"),
  transceiverVariant("1G", "SFP-BXD", "20km", "1490nm TX/1310nm RX", "LC Simplex", "OS2", 14.99, 50, "bidi"),

  // 10G SFP+
  transceiverVariant("10G", "SFP+-SR", "300m", "850nm", "LC Duplex", "OM3", 12.99, 45, "sfp-plus-10g", "Best Seller"),
  transceiverVariant("10G", "SFP+-LR", "10km", "1310nm", "LC Duplex", "OS2", 15.99, 55, "sfp-plus-10g", "Best Seller"),
  transceiverVariant("10G", "SFP+-ER", "40km", "1550nm", "LC Duplex", "OS2", 45.99, 150, "sfp-plus-10g"),
  transceiverVariant("10G", "SFP+-ZR", "80km", "1550nm", "LC Duplex", "OS2", 79.99, 250, "sfp-plus-10g"),
  transceiverVariant("10G", "SFP+-T", "30m", "RJ45", "RJ45", "Cat6a", 24.99, 80, "sfp-plus-10g"),
  transceiverVariant("10G", "SFP+-CWDM-1270", "40km", "1270nm", "LC Duplex", "OS2", 39.99, 130, "cwdm-dwdm"),
  transceiverVariant("10G", "SFP+-CWDM-1290", "40km", "1290nm", "LC Duplex", "OS2", 39.99, 130, "cwdm-dwdm"),
  transceiverVariant("10G", "SFP+-CWDM-1310", "40km", "1310nm", "LC Duplex", "OS2", 39.99, 130, "cwdm-dwdm"),
  transceiverVariant("10G", "SFP+-CWDM-1330", "40km", "1330nm", "LC Duplex", "OS2", 39.99, 130, "cwdm-dwdm"),

  // 25G SFP28
  transceiverVariant("25G", "SFP28-SR", "100m", "850nm", "LC Duplex", "OM3", 24.99, 85, "sfp28-25g"),
  transceiverVariant("25G", "SFP28-LR", "10km", "1310nm", "LC Duplex", "OS2", 39.99, 130, "sfp28-25g"),

  // 40G QSFP+
  transceiverVariant("40G", "QSFP+-SR4", "150m", "850nm", "MPO-12", "OM3", 35.99, 120, "qsfp-plus-40g"),
  transceiverVariant("40G", "QSFP+-LR4", "10km", "1310nm", "LC Duplex", "OS2", 89.99, 300, "qsfp-plus-40g"),
  transceiverVariant("40G", "QSFP+-PSM4", "10km", "1310nm", "MPO-12", "OS2", 69.99, 220, "qsfp-plus-40g"),

  // 100G QSFP28
  transceiverVariant("100G", "QSFP28-SR4", "100m", "850nm", "MPO-12", "OM4", 49.99, 180, "qsfp28-100g", "Best Seller"),
  transceiverVariant("100G", "QSFP28-LR4", "10km", "1310nm", "LC Duplex", "OS2", 89.99, 350, "qsfp28-100g"),
  transceiverVariant("100G", "QSFP28-CWDM4", "2km", "1271-1331nm", "LC Duplex", "OS2", 65.99, 250, "qsfp28-100g"),
  transceiverVariant("100G", "QSFP28-PSM4", "500m", "1310nm", "MPO-12", "OS2", 55.99, 200, "qsfp28-100g"),

  // 400G QSFP-DD
  transceiverVariant("400G", "QSFP-DD-SR8", "100m", "850nm", "MPO-16", "OM4", 189.99, 600, "qsfp-dd-400g", "New"),
  transceiverVariant("400G", "QSFP-DD-DR4", "500m", "1310nm", "MPO-12", "OS2", 249.99, 800, "qsfp-dd-400g", "New"),
  transceiverVariant("400G", "QSFP-DD-FR4", "2km", "1271-1331nm", "LC Duplex", "OS2", 299.99, 950, "qsfp-dd-400g", "New"),
  transceiverVariant("400G", "QSFP-DD-LR4", "10km", "1310nm", "LC Duplex", "OS2", 449.99, 1400, "qsfp-dd-400g"),
];

/* ─── Infrastructure ─── */
export const INFRASTRUCTURE: ShopProduct[] = [
  // Patch Panels
  { sku: "NX-PP-1U-12-LC", name: "1U 12-Port LC Duplex Patch Panel — Loaded", category: "patch-panels", subcategory: "rack-mount", specs: ["1U 19\"", "12 LC Duplex", "24 Fibers", "Pre-loaded"], price: 29.99, compareAt: 42, inStock: true, quickShip: true, tier: "A" },
  { sku: "NX-PP-1U-24-LC", name: "1U 24-Port LC Duplex Patch Panel — Loaded", category: "patch-panels", subcategory: "rack-mount", specs: ["1U 19\"", "24 LC Duplex", "48 Fibers", "Pre-loaded"], price: 45.99, compareAt: 65, inStock: true, quickShip: true, tier: "A", badge: "Best Seller" },
  { sku: "NX-PP-1U-48-LC", name: "1U 48-Port LC Duplex Patch Panel — High Density", category: "patch-panels", subcategory: "rack-mount", specs: ["1U 19\"", "48 LC Duplex", "96 Fibers", "Pre-loaded"], price: 79.99, compareAt: 110, inStock: true, quickShip: true, tier: "A" },
  { sku: "NX-PP-2U-72-LC", name: "2U 72-Port LC Duplex Patch Panel", category: "patch-panels", subcategory: "rack-mount", specs: ["2U 19\"", "72 LC Duplex", "144 Fibers", "Pre-loaded"], price: 129.99, compareAt: 180, inStock: true, quickShip: true, tier: "B" },
  { sku: "NX-PP-4U-96-LC", name: "4U 96-Port LC Duplex Patch Panel", category: "patch-panels", subcategory: "rack-mount", specs: ["4U 19\"", "96 LC Duplex", "192 Fibers", "Pre-loaded"], price: 189.99, compareAt: 260, inStock: true, quickShip: true, tier: "B" },
  { sku: "NX-PP-1U-24-SC", name: "1U 24-Port SC Simplex Patch Panel", category: "patch-panels", subcategory: "rack-mount", specs: ["1U 19\"", "24 SC Simplex", "24 Fibers", "Pre-loaded"], price: 39.99, compareAt: 55, inStock: true, quickShip: true, tier: "B" },
  { sku: "NX-PP-1U-EMPTY-4LGX", name: "1U Empty Patch Panel — 4 LGX Slots", category: "patch-panels", subcategory: "rack-mount", specs: ["1U 19\"", "4 LGX Slots", "Empty", "Modular"], price: 22.99, compareAt: 32, inStock: true, quickShip: true, tier: "B" },

  // Wall-Mount
  { sku: "NX-WM-4P-SC", name: "Wall-Mount Enclosure 4-Port", category: "patch-panels", subcategory: "wall-mount", specs: ["4 Port", "SC/LC", "Indoor", "Lockable"], price: 18.99, compareAt: 28, inStock: true, quickShip: true, tier: "B" },
  { sku: "NX-WM-12P-SC", name: "Wall-Mount Enclosure 12-Port", category: "patch-panels", subcategory: "wall-mount", specs: ["12 Port", "SC/LC", "Indoor", "Lockable"], price: 32.99, compareAt: 45, inStock: true, quickShip: true, tier: "A" },
  { sku: "NX-WM-24P-LC", name: "Wall-Mount Enclosure 24-Port", category: "patch-panels", subcategory: "wall-mount", specs: ["24 Port", "LC Duplex", "Indoor", "Lockable"], price: 49.99, compareAt: 68, inStock: true, quickShip: true, tier: "B" },

  // LGX Cassettes
  { sku: "NX-LGX-12LC-SM", name: "LGX Cassette 12-Port LC SM — Pre-loaded", category: "patch-panels", subcategory: "lgx-cassettes", specs: ["12 LC Duplex", "Singlemode", "24 Fibers", "Blue"], price: 24.99, compareAt: 35, inStock: true, quickShip: true, tier: "A" },
  { sku: "NX-LGX-12LC-MM", name: "LGX Cassette 12-Port LC MM — Pre-loaded", category: "patch-panels", subcategory: "lgx-cassettes", specs: ["12 LC Duplex", "Multimode", "24 Fibers", "Aqua"], price: 24.99, compareAt: 35, inStock: true, quickShip: true, tier: "A" },
  { sku: "NX-LGX-MPO-12LC", name: "LGX MPO to 12×LC Cassette Module", category: "patch-panels", subcategory: "lgx-cassettes", specs: ["1×MPO to 12×LC", "OS2", "Type A", "Pre-loaded"], price: 39.99, compareAt: 55, inStock: true, quickShip: true, tier: "A" },

  // Cable Management
  { sku: "NX-CM-DRING-10PK", name: "D-Ring Cable Manager — 10 Pack", category: "patch-panels", subcategory: "cable-management", specs: ["1.5\" D-Ring", "Steel", "Black", "10 Pack"], price: 9.99, compareAt: 15, inStock: true, quickShip: true, tier: "B" },
  { sku: "NX-CM-1U-HORIZ", name: "1U Horizontal Cable Manager", category: "patch-panels", subcategory: "cable-management", specs: ["1U 19\"", "Finger Duct", "Steel", "Black"], price: 14.99, compareAt: 22, inStock: true, quickShip: true, tier: "B" },
];

/* ─── Adapters & Passives ─── */
export const ADAPTERS_PASSIVES: ShopProduct[] = [
  // Adapters
  { sku: "NX-AD-LCLC-SM-DX", name: "LC-LC SM Duplex Adapter — Blue", category: "adapters", subcategory: "fiber-adapters", specs: ["Singlemode", "Duplex", "Zirconia", "Blue"], price: 1.49, compareAt: 2.50, inStock: true, quickShip: true, tier: "A" },
  { sku: "NX-AD-LCLC-MM-DX", name: "LC-LC MM Duplex Adapter — Aqua", category: "adapters", subcategory: "fiber-adapters", specs: ["Multimode", "Duplex", "Zirconia", "Aqua"], price: 1.49, compareAt: 2.50, inStock: true, quickShip: true, tier: "A" },
  { sku: "NX-AD-SCSC-SM-SX", name: "SC-SC SM Simplex Adapter — Blue", category: "adapters", subcategory: "fiber-adapters", specs: ["Singlemode", "Simplex", "Zirconia", "Blue"], price: 0.99, compareAt: 1.80, inStock: true, quickShip: true, tier: "A" },
  { sku: "NX-AD-SCAPC-SM-SX", name: "SC/APC SM Simplex Adapter — Green", category: "adapters", subcategory: "fiber-adapters", specs: ["Singlemode", "Simplex", "APC", "Green"], price: 1.29, compareAt: 2.00, inStock: true, quickShip: true, tier: "A" },
  { sku: "NX-AD-FCFC-SM-SX", name: "FC-FC SM Simplex Adapter", category: "adapters", subcategory: "fiber-adapters", specs: ["Singlemode", "Simplex", "Zirconia", "Threaded"], price: 1.49, compareAt: 2.50, inStock: true, quickShip: true, tier: "B" },
  { sku: "NX-AD-STST-MM-SX", name: "ST-ST MM Simplex Adapter", category: "adapters", subcategory: "fiber-adapters", specs: ["Multimode", "Simplex", "Zirconia", "Bayonet"], price: 1.29, compareAt: 2.20, inStock: true, quickShip: true, tier: "B" },
  { sku: "NX-AD-SCLC-HYB-SX", name: "SC-LC Hybrid Adapter — Singlemode", category: "adapters", subcategory: "hybrid-adapters", specs: ["SC to LC", "Singlemode", "Simplex", "Blue"], price: 3.49, compareAt: 5.50, inStock: true, quickShip: true, tier: "B" },
  { sku: "NX-AD-FCLC-HYB-SX", name: "FC-LC Hybrid Adapter — Singlemode", category: "adapters", subcategory: "hybrid-adapters", specs: ["FC to LC", "Singlemode", "Simplex"], price: 3.99, compareAt: 6.00, inStock: true, quickShip: true, tier: "B" },

  // Attenuators
  { sku: "NX-AT-LC-1DB", name: "LC/UPC Fixed Attenuator — 1dB", category: "adapters", subcategory: "fixed-attenuators", specs: ["LC/UPC", "1dB", "SM", "Male-Female"], price: 3.49, compareAt: 5.50, inStock: true, quickShip: true, tier: "B" },
  { sku: "NX-AT-LC-3DB", name: "LC/UPC Fixed Attenuator — 3dB", category: "adapters", subcategory: "fixed-attenuators", specs: ["LC/UPC", "3dB", "SM", "Male-Female"], price: 3.49, compareAt: 5.50, inStock: true, quickShip: true, tier: "A" },
  { sku: "NX-AT-LC-5DB", name: "LC/UPC Fixed Attenuator — 5dB", category: "adapters", subcategory: "fixed-attenuators", specs: ["LC/UPC", "5dB", "SM", "Male-Female"], price: 3.99, compareAt: 6.50, inStock: true, quickShip: true, tier: "A" },
  { sku: "NX-AT-LC-10DB", name: "LC/UPC Fixed Attenuator — 10dB", category: "adapters", subcategory: "fixed-attenuators", specs: ["LC/UPC", "10dB", "SM", "Male-Female"], price: 3.99, compareAt: 6.50, inStock: true, quickShip: true, tier: "A" },
  { sku: "NX-AT-SC-5DB", name: "SC/UPC Fixed Attenuator — 5dB", category: "adapters", subcategory: "fixed-attenuators", specs: ["SC/UPC", "5dB", "SM", "Male-Female"], price: 3.99, compareAt: 6.50, inStock: true, quickShip: true, tier: "B" },

  // Splitters
  { sku: "NX-SPL-PLC-1X2-SC", name: "PLC Splitter 1×2 SC/APC — Blockless", category: "adapters", subcategory: "plc-splitters", specs: ["1×2", "SC/APC", "Blockless", "IL ≤4.0dB"], price: 6.99, compareAt: 11, inStock: true, quickShip: true, tier: "A" },
  { sku: "NX-SPL-PLC-1X4-SC", name: "PLC Splitter 1×4 SC/APC — Blockless", category: "adapters", subcategory: "plc-splitters", specs: ["1×4", "SC/APC", "Blockless", "IL ≤7.4dB"], price: 8.99, compareAt: 14, inStock: true, quickShip: true, tier: "A" },
  { sku: "NX-SPL-PLC-1X8-SC", name: "PLC Splitter 1×8 SC/APC — Blockless", category: "adapters", subcategory: "plc-splitters", specs: ["1×8", "SC/APC", "Blockless", "IL ≤10.5dB"], price: 12.99, compareAt: 20, inStock: true, quickShip: true, tier: "A", badge: "BEAD Ready" },
  { sku: "NX-SPL-PLC-1X16-SC", name: "PLC Splitter 1×16 SC/APC — Rack-Mount", category: "adapters", subcategory: "plc-splitters", specs: ["1×16", "SC/APC", "1U Rack", "IL ≤13.5dB"], price: 29.99, compareAt: 45, inStock: true, quickShip: true, tier: "A" },
  { sku: "NX-SPL-PLC-1X32-SC", name: "PLC Splitter 1×32 SC/APC — Rack-Mount", category: "adapters", subcategory: "plc-splitters", specs: ["1×32", "SC/APC", "1U Rack", "IL ≤16.5dB"], price: 49.99, compareAt: 75, inStock: true, quickShip: true, tier: "B" },
  { sku: "NX-SPL-PLC-1X64-SC", name: "PLC Splitter 1×64 SC/APC — Rack-Mount", category: "adapters", subcategory: "plc-splitters", specs: ["1×64", "SC/APC", "2U Rack", "IL ≤20.5dB"], price: 89.99, compareAt: 130, inStock: true, quickShip: true, tier: "B" },

  // Loopbacks
  { sku: "NX-LB-LC-SM", name: "LC/UPC Singlemode Loopback Plug", category: "adapters", subcategory: "loopbacks", specs: ["LC/UPC", "Singlemode", "9/125μm", "Test"], price: 4.99, compareAt: 8, inStock: true, quickShip: true, tier: "B" },
  { sku: "NX-LB-SC-SM", name: "SC/UPC Singlemode Loopback Plug", category: "adapters", subcategory: "loopbacks", specs: ["SC/UPC", "Singlemode", "9/125μm", "Test"], price: 4.99, compareAt: 8, inStock: true, quickShip: true, tier: "B" },
  { sku: "NX-LB-MPO-12-SM", name: "MPO-12 Singlemode Loopback", category: "adapters", subcategory: "loopbacks", specs: ["MPO-12", "Singlemode", "Type A", "Test"], price: 19.99, compareAt: 30, inStock: true, quickShip: true, tier: "B" },
];

/* ─── Test Equipment & Tools ─── */
export const TEST_EQUIPMENT: ShopProduct[] = [
  { sku: "NX-VFL-5MW", name: "Visual Fault Locator 5mW — Pen Style", category: "test-equipment", subcategory: "vfl", specs: ["5mW", "650nm Red", "2.5mm Universal", "5km Range"], price: 12.99, compareAt: 22, inStock: true, quickShip: true, tier: "A" },
  { sku: "NX-VFL-10MW", name: "Visual Fault Locator 10mW — Pro", category: "test-equipment", subcategory: "vfl", specs: ["10mW", "650nm Red", "2.5mm + 1.25mm", "10km Range"], price: 18.99, compareAt: 30, inStock: true, quickShip: true, tier: "A", badge: "Best Seller" },
  { sku: "NX-VFL-30MW", name: "Visual Fault Locator 30mW — Long Range", category: "test-equipment", subcategory: "vfl", specs: ["30mW", "650nm Red", "2.5mm + 1.25mm", "25km Range"], price: 29.99, compareAt: 48, inStock: true, quickShip: true, tier: "A" },
  { sku: "NX-OPM-BASIC", name: "Optical Power Meter — Basic", category: "test-equipment", subcategory: "power-meters", specs: ["-50 to +26 dBm", "850/1300/1310/1490/1550/1625nm", "FC/SC/ST", "Battery"], price: 29.99, compareAt: 50, inStock: true, quickShip: true, tier: "A" },
  { sku: "NX-OPM-PRO", name: "Optical Power Meter — Pro Series", category: "test-equipment", subcategory: "power-meters", specs: ["-70 to +10 dBm", "6 Wavelengths", "FC/SC/ST", "Rechargeable"], price: 39.99, compareAt: 65, inStock: true, quickShip: true, tier: "A" },
  { sku: "NX-LS-SM-1310-1550", name: "Stabilized Light Source SM — 1310/1550nm", category: "test-equipment", subcategory: "light-sources", specs: ["1310nm + 1550nm", "Singlemode", "SC/FC/ST", "CW/Modulated"], price: 59.99, compareAt: 95, inStock: true, quickShip: true, tier: "A" },
  { sku: "NX-LS-MM-850-1300", name: "Stabilized Light Source MM — 850/1300nm", category: "test-equipment", subcategory: "light-sources", specs: ["850nm + 1300nm", "Multimode", "SC/FC/ST", "CW/Modulated"], price: 59.99, compareAt: 95, inStock: true, quickShip: true, tier: "A" },
  { sku: "NX-FI-400", name: "Fiber Identifier — Live Traffic Detection", category: "test-equipment", subcategory: "identifiers", specs: ["250/900μm + Jacketed", "Directional", "Live Traffic Safe", "Rechargeable"], price: 129.99, compareAt: 200, inStock: true, quickShip: true, tier: "A" },
  { sku: "NX-SCOPE-400X", name: "Fiber Inspection Scope 400× — Handheld", category: "test-equipment", subcategory: "inspection", specs: ["400× Magnification", "2.5mm + 1.25mm", "LED Illumination", "Portable"], price: 149.99, compareAt: 240, inStock: true, quickShip: true, tier: "A" },
  { sku: "NX-SCOPE-VIDEO", name: "Video Fiber Inspection Probe — USB", category: "test-equipment", subcategory: "inspection", specs: ["400× Digital", "USB-C", "Auto-Focus", "Pass/Fail Analysis"], price: 399.99, compareAt: 650, inStock: true, quickShip: true, tier: "B" },
  // Cleaning
  { sku: "NX-CLEAN-LC-CLICK", name: "LC One-Click Cleaner — 1.25mm", category: "test-equipment", subcategory: "cleaning", specs: ["1.25mm Ferrule", "800+ Cleans", "LC/MU", "No Alcohol"], price: 6.99, compareAt: 10, inStock: true, quickShip: true, tier: "A" },
  { sku: "NX-CLEAN-SC-CLICK", name: "SC One-Click Cleaner — 2.5mm", category: "test-equipment", subcategory: "cleaning", specs: ["2.5mm Ferrule", "500+ Cleans", "SC/FC/ST", "No Alcohol"], price: 6.99, compareAt: 10, inStock: true, quickShip: true, tier: "A" },
  { sku: "NX-CLEAN-MPO-CLICK", name: "MPO One-Click Cleaner", category: "test-equipment", subcategory: "cleaning", specs: ["MPO/MTP", "500+ Cleans", "12/24 Fiber", "No Alcohol"], price: 11.99, compareAt: 18, inStock: true, quickShip: true, tier: "A" },
  { sku: "NX-CLEAN-CASSETTE", name: "Cassette Cleaner — Reel Type", category: "test-equipment", subcategory: "cleaning", specs: ["All Ferrule Sizes", "500+ Cleans", "Dry Clean", "Compact"], price: 14.99, compareAt: 22, inStock: true, quickShip: true, tier: "A" },
  { sku: "NX-KIT-CLEAN-PRO", name: "Fiber Cleaning Kit — Professional", category: "test-equipment", subcategory: "cleaning", specs: ["LC + SC Cleaners", "IPA Wipes", "Lint-Free Swabs", "Case"], price: 34.99, compareAt: 55, inStock: true, quickShip: true, tier: "A" },
  // Cleavers & Tools
  { sku: "NX-CLEAVE-BASIC", name: "Fiber Cleaver — 16-Position Blade", category: "test-equipment", subcategory: "cleavers", specs: ["16 Positions", "125μm Fiber", "Cleave Angle ≤0.5°", "48K Cleaves"], price: 49.99, compareAt: 80, inStock: true, quickShip: true, tier: "A" },
  { sku: "NX-CLEAVE-PRO", name: "Fiber Cleaver — Auto-Rotate 36-Position", category: "test-equipment", subcategory: "cleavers", specs: ["36 Positions", "Auto-Rotate", "250/900μm", "100K+ Cleaves"], price: 129.99, compareAt: 200, inStock: true, quickShip: true, tier: "A" },
  { sku: "NX-STRIP-3HOLE", name: "Fiber Stripping Tool — 3-Hole", category: "test-equipment", subcategory: "stripping", specs: ["125μm, 250μm, 900μm", "Adjustable", "Ergonomic Grip"], price: 12.99, compareAt: 20, inStock: true, quickShip: true, tier: "A" },
  { sku: "NX-STRIP-CFS2", name: "Buffer Tube / Cable Jacket Stripper", category: "test-equipment", subcategory: "stripping", specs: ["Adjustable Depth", "Round Cable", "Rip Cord Slot"], price: 18.99, compareAt: 30, inStock: true, quickShip: true, tier: "A" },
];

/* ─── Aggregate ─── */
export const FULL_CATALOG: ShopProduct[] = [
  ...SM_DUPLEX_CORDS,
  ...SM_SIMPLEX_CORDS,
  ...OM4_DUPLEX_CORDS,
  ...OM3_DUPLEX_CORDS,
  ...ALL_TRANSCEIVERS,
  ...INFRASTRUCTURE,
  ...ADAPTERS_PASSIVES,
  ...TEST_EQUIPMENT,
];
