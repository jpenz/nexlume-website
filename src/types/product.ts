export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  description: string;
  shortDescription: string;
  price: number;
  salePrice?: number;
  category: ProductCategory;
  subcategory: string;
  images: ProductImage[];
  specs: Record<string, string>;
  fiberType?: FiberType;
  connectorType?: ConnectorType;
  inStock: boolean;
  leadTimeDays: number;
  certifications: string[];
  datasheetUrl?: string;
  relatedProducts?: string[];
}

export interface ProductImage {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export type ProductCategory =
  | "cable-assemblies"
  | "connectors-adapters"
  | "patch-panels"
  | "transceivers"
  | "trunk-cables"
  | "mpo-mtp"
  | "structured-cabling"
  | "tools-accessories";

export type FiberType = "OS2" | "OM3" | "OM4" | "OM5";

export type ConnectorType = "LC" | "SC" | "ST" | "FC" | "MTP" | "MPO";

export interface ProductFilter {
  fiberType?: FiberType[];
  connectorType?: ConnectorType[];
  category?: ProductCategory[];
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  certifications?: string[];
  dataRate?: string[];
}
