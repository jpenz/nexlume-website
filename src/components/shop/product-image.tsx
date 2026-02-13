"use client";

/**
 * Dynamic SVG product illustrations for fiber optic products.
 * Generates contextual images based on product category and specs.
 */

interface ProductImageProps {
  category: string;
  subcategory?: string;
  specs?: string[];
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: { w: 120, h: 80 },
  md: { w: 200, h: 140 },
  lg: { w: 400, h: 280 },
};

// Color mapping for fiber types
function getFiberColor(specs: string[]): string {
  const specStr = specs.join(" ").toLowerCase();
  if (specStr.includes("om5")) return "#84CC16";
  if (specStr.includes("om4")) return "#8B5CF6";
  if (specStr.includes("om3")) return "#06B6D4";
  if (specStr.includes("om2") || specStr.includes("om1")) return "#F97316";
  if (specStr.includes("apc")) return "#22C55E";
  return "#EAB308"; // default singlemode yellow
}

function getConnectorShape(specs: string[]): string {
  const specStr = specs.join(" ").toLowerCase();
  if (specStr.includes("mpo") || specStr.includes("mtp")) return "mpo";
  if (specStr.includes("sc")) return "sc";
  if (specStr.includes("lc")) return "lc";
  if (specStr.includes("fc")) return "fc";
  if (specStr.includes("st")) return "st";
  return "lc";
}

function PatchCordSVG({ specs, w, h }: { specs: string[]; w: number; h: number }) {
  const color = getFiberColor(specs);
  const connector = getConnectorShape(specs);
  const isDuplex = specs.some((s) => s.toLowerCase().includes("duplex"));
  const cy = h / 2;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full">
      <defs>
        <linearGradient id="cable-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={color} stopOpacity="0.8" />
          <stop offset="50%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.8" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {/* Cable body */}
      <line x1={w * 0.18} y1={cy} x2={w * 0.82} y2={cy} stroke="url(#cable-grad)" strokeWidth={isDuplex ? 4 : 3} strokeLinecap="round" />
      {isDuplex && (
        <line x1={w * 0.18} y1={cy + 5} x2={w * 0.82} y2={cy + 5} stroke={color} strokeWidth={2} strokeLinecap="round" opacity={0.5} />
      )}
      {/* Connector A */}
      <rect x={w * 0.04} y={cy - 14} width={w * 0.14} height={28} rx={3} fill="#1A1A2E" stroke="#5E6AD2" strokeWidth={1.5} />
      <rect x={w * 0.04 + 3} y={cy - 8} width={w * 0.14 - 6} height={16} rx={2} fill="#252545" />
      <circle cx={w * 0.04 + w * 0.07} cy={cy} r={3} fill={color} filter="url(#glow)" />
      {/* Connector B */}
      <rect x={w * 0.82} y={cy - 14} width={w * 0.14} height={28} rx={3} fill="#1A1A2E" stroke="#5E6AD2" strokeWidth={1.5} />
      <rect x={w * 0.82 + 3} y={cy - 8} width={w * 0.14 - 6} height={16} rx={2} fill="#252545" />
      <circle cx={w * 0.82 + w * 0.07} cy={cy} r={3} fill={color} filter="url(#glow)" />
    </svg>
  );
}

function TransceiverSVG({ specs, w, h }: { specs: string[]; w: number; h: number }) {
  const isQSFP = specs.some((s) => /qsfp|40g|100g|400g/i.test(s));
  const cx = w / 2;
  const cy = h / 2;
  const bw = isQSFP ? 70 : 50;
  const bh = isQSFP ? 24 : 18;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full">
      <defs>
        <linearGradient id="sfp-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2A2A4A" />
          <stop offset="100%" stopColor="#1A1A2E" />
        </linearGradient>
        <filter id="sfp-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {/* Module body */}
      <rect x={cx - bw / 2} y={cy - bh / 2} width={bw} height={bh} rx={3} fill="url(#sfp-grad)" stroke="#5E6AD2" strokeWidth={1} />
      {/* Gold contacts */}
      {[...Array(isQSFP ? 8 : 5)].map((_, i) => (
        <rect
          key={i}
          x={cx - bw / 2 + 6 + i * (isQSFP ? 7.5 : 8)}
          y={cy + bh / 2 - 4}
          width={4}
          height={6}
          rx={0.5}
          fill="#D4A843"
          opacity={0.8}
        />
      ))}
      {/* Fiber port */}
      <circle cx={cx - 8} cy={cy - 2} r={2.5} fill="#111" stroke="#5E6AD2" strokeWidth={0.8} />
      <circle cx={cx + 8} cy={cy - 2} r={2.5} fill="#111" stroke="#5E6AD2" strokeWidth={0.8} />
      {/* Status LED */}
      <circle cx={cx - bw / 2 + 8} cy={cy - bh / 2 + 6} r={2} fill="#22C55E" filter="url(#sfp-glow)" />
      {/* Label */}
      <text x={cx + bw / 2 - 8} y={cy + 2} textAnchor="end" fill="#6B7280" fontSize="6" fontFamily="monospace">
        {specs.find((s) => /\dg/i.test(s)) || "10G"}
      </text>
      {/* Bail latch */}
      <path d={`M${cx - bw / 2 + 2} ${cy - bh / 2 - 3} h${bw - 4} v-4 h-8 v4`} fill="none" stroke="#444" strokeWidth={1} />
    </svg>
  );
}

function PanelSVG({ w, h }: { w: number; h: number }) {
  const cx = w / 2;
  const cy = h / 2;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full">
      {/* Panel body */}
      <rect x={w * 0.1} y={cy - 20} width={w * 0.8} height={40} rx={3} fill="#1A1A2E" stroke="#333" strokeWidth={1} />
      {/* Ports */}
      {[...Array(12)].map((_, i) => (
        <rect
          key={i}
          x={w * 0.14 + i * (w * 0.8 - w * 0.12) / 12}
          y={cy - 10}
          width={8}
          height={12}
          rx={1}
          fill="#111"
          stroke="#5E6AD2"
          strokeWidth={0.8}
        />
      ))}
      {/* Mounting ears */}
      <circle cx={w * 0.1 - 5} cy={cy - 12} r={2.5} fill="none" stroke="#444" strokeWidth={1} />
      <circle cx={w * 0.1 - 5} cy={cy + 12} r={2.5} fill="none" stroke="#444" strokeWidth={1} />
      <circle cx={w * 0.9 + 5} cy={cy - 12} r={2.5} fill="none" stroke="#444" strokeWidth={1} />
      <circle cx={w * 0.9 + 5} cy={cy + 12} r={2.5} fill="none" stroke="#444" strokeWidth={1} />
    </svg>
  );
}

function AdapterSVG({ specs, w, h }: { specs: string[]; w: number; h: number }) {
  const color = getFiberColor(specs);
  const cx = w / 2;
  const cy = h / 2;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full">
      <rect x={cx - 18} y={cy - 12} width={36} height={24} rx={3} fill="#1A1A2E" stroke={color} strokeWidth={1.5} />
      <rect x={cx - 12} y={cy - 6} width={10} height={12} rx={1} fill="#111" />
      <rect x={cx + 2} y={cy - 6} width={10} height={12} rx={1} fill="#111" />
      <circle cx={cx - 7} cy={cy} r={2} fill={color} opacity={0.6} />
      <circle cx={cx + 7} cy={cy} r={2} fill={color} opacity={0.6} />
    </svg>
  );
}

function ToolSVG({ w, h }: { w: number; h: number }) {
  const cx = w / 2;
  const cy = h / 2;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full">
      {/* VFL body */}
      <rect x={cx - 8} y={cy - 30} width={16} height={60} rx={4} fill="#1A1A2E" stroke="#5E6AD2" strokeWidth={1} />
      <circle cx={cx} cy={cy - 24} r={3} fill="#EF4444" opacity={0.8} />
      <rect x={cx - 5} y={cy - 12} width={10} height={3} rx={1} fill="#333" />
      <rect x={cx - 5} y={cy - 6} width={10} height={3} rx={1} fill="#333" />
      <text x={cx} y={cy + 10} textAnchor="middle" fill="#5E6AD2" fontSize="5" fontFamily="monospace">VFL</text>
      <rect x={cx - 3} y={cy + 18} width={6} height={12} rx={1} fill="#252545" />
    </svg>
  );
}

function DefaultSVG({ w, h }: { w: number; h: number }) {
  const cx = w / 2;
  const cy = h / 2;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full">
      <rect x={cx - 25} y={cy - 20} width={50} height={40} rx={4} fill="#1A1A2E" stroke="#333" strokeWidth={1} />
      <circle cx={cx} cy={cy} r={8} fill="none" stroke="#5E6AD2" strokeWidth={1.5} />
      <circle cx={cx} cy={cy} r={3} fill="#5E6AD2" opacity={0.6} />
    </svg>
  );
}

export function ProductImage({ category, subcategory, specs = [], className = "", size = "md" }: ProductImageProps) {
  const { w, h } = sizeMap[size];

  const renderSVG = () => {
    switch (category) {
      case "patch-cords":
        return <PatchCordSVG specs={specs} w={w} h={h} />;
      case "transceivers":
        return <TransceiverSVG specs={specs} w={w} h={h} />;
      case "patch-panels":
        return <PanelSVG w={w} h={h} />;
      case "adapters":
        return <AdapterSVG specs={specs} w={w} h={h} />;
      case "test-equipment":
        return <ToolSVG w={w} h={h} />;
      default:
        return <DefaultSVG w={w} h={h} />;
    }
  };

  return (
    <div className={`bg-[#0E0E1A] flex items-center justify-center ${className}`}>
      {renderSVG()}
    </div>
  );
}
