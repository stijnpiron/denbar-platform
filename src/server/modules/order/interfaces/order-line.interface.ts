import { Product } from '../../product/interfaces/product.interface';

export interface OrderLine {
  product: Product;
  quantity: number;
  totalPrice: number;
  bottles: OrderQuantity;
  crates: OrderQuantity;
}

interface OrderQuantity {
  delivered: number;
  returned: number;
}
