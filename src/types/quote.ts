export interface AIAnalysisResult {
  id: string;
  status: "processing" | "complete" | "error";
  fileName: string;
  fileType: string;
  uploadedAt: string;
  completedAt?: string;
  summary: string;
  totalConnections: number;
  estimatedTotal: number;
  items: QuoteItem[];
  zones: AnalysisZone[];
  confidence: number; // 0-100
}

export interface QuoteItem {
  id: string;
  description: string;
  fiberType: string;
  connectorA: string;
  connectorB: string;
  length: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  zone?: string;
  notes?: string;
}

export interface AnalysisZone {
  name: string; // e.g., "Floor 1", "MDA", "IDF-A"
  connectionCount: number;
  items: QuoteItem[];
}

export interface Quote {
  id: string;
  customerId?: string;
  status: "draft" | "pending" | "approved" | "expired" | "converted";
  items: QuoteItem[];
  subtotal: number;
  tax: number;
  total: number;
  validUntil: string;
  createdAt: string;
  notes?: string;
  aiAnalysisId?: string;
}
