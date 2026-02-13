"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, Image, Table, Sparkles, X, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type UploadState = "idle" | "uploading" | "analyzing" | "complete" | "error";

const acceptedFormats = [
  { ext: "PDF", icon: FileText, desc: "Floor plans, network diagrams, specs" },
  { ext: "CAD", icon: FileText, desc: "DWG, DXF — AutoCAD drawings" },
  { ext: "Images", icon: Image, desc: "PNG, JPG — photos of infrastructure" },
  { ext: "Excel", icon: Table, desc: "CSV, XLSX — cable schedules, BOMs" },
  { ext: "Visio", icon: FileText, desc: "VSDX — network topology diagrams" },
  { ext: "Docs", icon: FileText, desc: "Word, PPT — RFPs and project specs" },
];

export default function UploadPlansPage() {
  const [state, setState] = useState<UploadState>("idle");
  const [files, setFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...droppedFiles]);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  }, []);

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const startAnalysis = () => {
    setState("uploading");
    setTimeout(() => setState("analyzing"), 1500);
    setTimeout(() => setState("complete"), 8000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="mb-12">
        <Badge variant="indigo" className="mb-4">
          <Sparkles className="w-3 h-3 mr-1" />
          AI-Powered Analysis
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-bold text-white">
          Upload Your Deployment Plans
        </h1>
        <p className="mt-2 text-neutral-400 max-w-2xl">
          Drop in any file — floor plans, network diagrams, cable schedules, or
          CAD drawings. Our AI will analyze them and generate a detailed fiber
          optic quote in under 90 seconds.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {(state === "idle" || state === "uploading") && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {/* Drop Zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
                dragOver
                  ? "border-indigo-500 bg-indigo-600/5"
                  : "border-[#262626] hover:border-[#363636]"
              }`}
            >
              <input
                type="file"
                multiple
                onChange={handleFileSelect}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept=".pdf,.dwg,.dxf,.png,.jpg,.jpeg,.xlsx,.csv,.vsdx,.doc,.docx,.pptx"
              />
              <div className="w-16 h-16 bg-indigo-600/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Upload className="w-8 h-8 text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">
                Drop your files here
              </h3>
              <p className="text-sm text-neutral-500 mt-2">
                or click to browse. Any format — PDF, CAD, images, Excel, Visio, Word.
              </p>
            </div>

            {/* Accepted Formats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
              {acceptedFormats.map((fmt) => (
                <div
                  key={fmt.ext}
                  className="flex items-start gap-3 p-3 bg-[#141414] border border-[#1A1A1A] rounded-lg"
                >
                  <fmt.icon className="w-4 h-4 text-neutral-500 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-neutral-300">{fmt.ext}</div>
                    <div className="text-xs text-neutral-600">{fmt.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="mt-8">
                <h3 className="text-sm font-medium text-neutral-300 mb-3">
                  {files.length} file{files.length !== 1 ? "s" : ""} selected
                </h3>
                <div className="space-y-2">
                  {files.map((file, i) => (
                    <div
                      key={`${file.name}-${i}`}
                      className="flex items-center justify-between p-3 bg-[#141414] border border-[#262626] rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-neutral-500" />
                        <div>
                          <div className="text-sm text-white">{file.name}</div>
                          <div className="text-xs text-neutral-600">
                            {(file.size / 1024 / 1024).toFixed(1)} MB
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(i)}
                        className="p-1 text-neutral-600 hover:text-red-400 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <Button className="mt-4 w-full" onClick={startAnalysis}>
                  <Sparkles className="w-4 h-4" />
                  Analyze with AI
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </motion.div>
        )}

        {state === "analyzing" && (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Card className="p-12 text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 mx-auto mb-6"
              >
                <Loader2 className="w-16 h-16 text-indigo-400" />
              </motion.div>
              <h2 className="text-xl font-semibold text-white">
                Analyzing Your Plans...
              </h2>
              <p className="text-sm text-neutral-400 mt-2 max-w-md mx-auto">
                Our AI is reading your documents, identifying fiber connections,
                and calculating quantities. This usually takes 30-90 seconds.
              </p>
              <div className="mt-8 space-y-2 max-w-sm mx-auto">
                {[
                  { label: "Parsing documents", done: true },
                  { label: "Identifying connections", done: true },
                  { label: "Matching products", done: false },
                  { label: "Calculating pricing", done: false },
                ].map((step) => (
                  <div key={step.label} className="flex items-center gap-3 text-sm">
                    {step.done ? (
                      <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full border border-[#363636]" />
                    )}
                    <span className={step.done ? "text-neutral-300" : "text-neutral-600"}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {state === "complete" && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-600/15 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">Analysis Complete</h2>
                  <p className="text-sm text-neutral-400">We identified the following fiber requirements</p>
                </div>
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-[#0A0A0A] rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-indigo-400">156</div>
                  <div className="text-xs text-neutral-500 mt-1">Total Connections</div>
                </div>
                <div className="bg-[#0A0A0A] rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-indigo-400">3</div>
                  <div className="text-xs text-neutral-500 mt-1">Zones Identified</div>
                </div>
                <div className="bg-[#0A0A0A] rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-indigo-400">$24,380</div>
                  <div className="text-xs text-neutral-500 mt-1">Estimated Total</div>
                </div>
              </div>

              {/* Sample Results Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#262626]">
                      <th className="text-left py-3 px-3 text-neutral-500 font-medium">Item</th>
                      <th className="text-left py-3 px-3 text-neutral-500 font-medium">Fiber</th>
                      <th className="text-left py-3 px-3 text-neutral-500 font-medium">Connectors</th>
                      <th className="text-right py-3 px-3 text-neutral-500 font-medium">Qty</th>
                      <th className="text-right py-3 px-3 text-neutral-500 font-medium">Unit</th>
                      <th className="text-right py-3 px-3 text-neutral-500 font-medium">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { item: "LC-LC Patch Cable 3m", fiber: "OS2", conn: "LC-UPC to LC-UPC", qty: 96, unit: 12.50, total: 1200 },
                      { item: "MTP Trunk Cable 30m", fiber: "OS2", conn: "MTP-24 to MTP-24", qty: 12, unit: 485.00, total: 5820 },
                      { item: "LC-LC Patch Cable 10m", fiber: "OM4", conn: "LC-UPC to LC-UPC", qty: 48, unit: 28.50, total: 1368 },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-[#1A1A1A]">
                        <td className="py-3 px-3 text-white">{row.item}</td>
                        <td className="py-3 px-3 text-neutral-400">{row.fiber}</td>
                        <td className="py-3 px-3 text-neutral-400">{row.conn}</td>
                        <td className="py-3 px-3 text-right text-white">{row.qty}</td>
                        <td className="py-3 px-3 text-right text-neutral-400">${row.unit.toFixed(2)}</td>
                        <td className="py-3 px-3 text-right text-white font-medium">${row.total.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center gap-3 mt-8">
                <Button>
                  Convert to Order
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button variant="outline">Download PDF Quote</Button>
                <Button variant="ghost" onClick={() => { setState("idle"); setFiles([]); }}>
                  Start Over
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
