import { Product } from '../product.interface';

export interface ProductsState {
  products?: Product[];
  productQuantity?: number;
}
