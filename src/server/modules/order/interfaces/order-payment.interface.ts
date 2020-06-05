export interface OrderPayment {
  totalPrice: number;
  paid: { amount: number; date: Date };
}
