export interface CartLine {
  productId: string;
  quantity: number;
}

export interface CartTotals {
  itemCount: number;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
}
