import { Badge } from "@/components/ui/badge";
export default function ProductsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <Badge variant="indigo" className="mb-4">Product Catalog</Badge>
      <h1 className="text-3xl font-bold text-white">All Products</h1>
      <p className="mt-2 text-neutral-400">Browse our complete fiber optic catalog. Algolia-powered search coming soon.</p>
      <div className="mt-8 bg-[#141414] border border-[#262626] rounded-xl p-12 text-center">
        <p className="text-neutral-500">Product catalog with faceted search will be implemented in Phase 1.</p>
      </div>
    </div>
  );
}
