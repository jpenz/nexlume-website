import { Badge } from "@/components/ui/badge";
export default function ResourcesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <Badge variant="indigo" className="mb-4">Technical Resources</Badge>
      <h1 className="text-3xl font-bold text-white">Resources & Guides</h1>
      <p className="mt-2 text-neutral-400">Application guides, datasheets, installation videos, and case studies.</p>
    </div>
  );
}
