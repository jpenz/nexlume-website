// Algolia search client - Phase 1 implementation
export function createSearchClient() {
  return { search: async () => ({ hits: [] }) };
}
