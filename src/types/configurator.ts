export type ConfiguratorStep =
  | "application"
  | "fiber-type"
  | "connector-a"
  | "connector-b"
  | "cable-specs"
  | "review";

export type Application =
  | "data-center"
  | "ftth"
  | "5g"
  | "enterprise"
  | "industrial"
  | "custom";

export type FiberType = "OS2" | "OM3" | "OM4" | "OM5";

export type ConnectorType = "LC-UPC" | "LC-APC" | "SC-UPC" | "SC-APC" | "MTP-12" | "MTP-24" | "MPO-12" | "MPO-24" | "ST" | "FC";

export type JacketType = "PVC" | "LSZH" | "Plenum" | "Armored";

export interface CableConfiguration {
  application: Application | null;
  fiberType: FiberType | null;
  connectorA: ConnectorType | null;
  connectorB: ConnectorType | null;
  length: number; // meters
  jacketType: JacketType | null;
  jacketColor: string;
  fiberCount: number;
}

export interface PricingResult {
  unitPrice: number;
  volumeBreaks: VolumeBreak[];
  leadTimeDays: number;
  available: boolean;
  configurationId: string;
}

export interface VolumeBreak {
  quantity: number;
  unitPrice: number;
  savings: string; // percentage
}

export const STEPS: { id: ConfiguratorStep; label: string; icon: string }[] = [
  { id: "application", label: "Application", icon: "🎯" },
  { id: "fiber-type", label: "Fiber Type", icon: "💡" },
  { id: "connector-a", label: "Connector A", icon: "🔌" },
  { id: "connector-b", label: "Connector B", icon: "🔌" },
  { id: "cable-specs", label: "Cable Specs", icon: "📏" },
  { id: "review", label: "Review & Price", icon: "✅" },
];
