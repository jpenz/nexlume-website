export interface Customer {
  id: string;
  email: string;
  companyName: string;
  firstName: string;
  lastName: string;
  role: "admin" | "purchaser" | "viewer";
  pricingTier?: string;
}
export interface Order {
  id: string;
  orderNumber: string;
  status: "pending" | "processing" | "shipped" | "delivered";
  items: OrderItem[];
  total: number;
  createdAt: string;
}
export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
}
