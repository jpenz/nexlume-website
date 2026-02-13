import type { ShopProduct } from "@/data/shop-catalog";

/**
 * Group products into "product families" — same connector combo + fiber + config,
 * different lengths. Returns a map of familyKey → products sorted by length.
 */
export interface ProductFamily {
  key: string;
  name: string; // e.g. "LC/UPC-LC/UPC OS2 Duplex Patch Cord"
  category: string;
  subcategory: string;
  connectorA: string;
  connectorB: string;
  fiber: string;
  config: string; // Duplex, Simplex
  jacket: string;
  specs: string[]; // shared specs (minus length)
  variants: ProductVariant[];
}

export interface ProductVariant {
  sku: string;
  length: string; // "1m", "2m", etc.
  lengthNum: number; // for sorting
  price: number;
  compareAt?: number;
  inStock: boolean;
  quickShip: boolean;
  badge?: ShopProduct["badge"];
}

export function groupIntoFamilies(products: ShopProduct[]): ProductFamily[] {
  const map = new Map<string, ProductFamily>();

  for (const p of products) {
    // Extract length from name (e.g., "— 3m")
    const lengthMatch = p.name.match(/—\s*(\d+(?:\.\d+)?m)/);
    if (!lengthMatch) continue; // skip non-length products

    const length = lengthMatch[1];
    const lengthNum = parseFloat(length);

    // Family name = everything before "— Xm"
    const familyName = p.name.replace(/\s*—\s*\d+(?:\.\d+)?m$/, "").trim();

    // Key = category + subcategory + family name
    const key = `${p.category}:${p.subcategory}:${familyName}`;

    if (!map.has(key)) {
      // Parse connector info from name
      const connMatch = familyName.match(/^(.+?)-(.+?)\s+(\w+)\s+(Duplex|Simplex)/);
      const specs = p.specs.filter((s) => !s.match(/^\d+(\.\d+)?m$/));

      map.set(key, {
        key,
        name: familyName,
        category: p.category,
        subcategory: p.subcategory,
        connectorA: connMatch?.[1] || "",
        connectorB: connMatch?.[2] || "",
        fiber: connMatch?.[3] || specs[0] || "",
        config: connMatch?.[4] || specs[1] || "",
        jacket: specs.find((s) => ["LSZH", "PVC", "OFNP", "OFNR", "Plenum"].includes(s)) || "LSZH",
        specs,
        variants: [],
      });
    }

    map.get(key)!.variants.push({
      sku: p.sku,
      length,
      lengthNum,
      price: p.price,
      compareAt: p.compareAt,
      inStock: p.inStock,
      quickShip: p.quickShip,
      badge: p.badge,
    });
  }

  // Sort variants by length
  for (const family of map.values()) {
    family.variants.sort((a, b) => a.lengthNum - b.lengthNum);
  }

  return Array.from(map.values());
}

/** Get a single family by matching a slug/key fragment */
export function findFamily(families: ProductFamily[], slug: string): ProductFamily | undefined {
  const s = slug.toLowerCase();
  return families.find((f) =>
    f.key.toLowerCase().includes(s) ||
    f.name.toLowerCase().replace(/[^a-z0-9]/g, "-").includes(s)
  );
}

/** Generate a URL-safe slug from a product family */
export function familySlug(family: ProductFamily): string {
  return family.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
