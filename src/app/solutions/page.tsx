import { Badge } from "@/components/ui/badge";
export default function SolutionsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <Badge variant="indigo" className="mb-4">Solutions by Industry</Badge>
      <h1 className="text-3xl font-bold text-white">Industry Solutions</h1>
      <p className="mt-2 text-neutral-400">Data Centers · 5G / Telecom · FTTH / Broadband · Enterprise · Industrial</p>
    </div>
  );
}
