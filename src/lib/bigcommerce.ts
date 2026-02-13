// BigCommerce API client - Phase 1 implementation
export class BigCommerceClient {
  private storeHash: string;
  private accessToken: string;
  constructor(storeHash: string, accessToken: string) {
    this.storeHash = storeHash;
    this.accessToken = accessToken;
  }
  async getProducts() { return []; }
  async getProduct(slug: string) { return null; }
  async getCategories() { return []; }
}
