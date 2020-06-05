import { ProductRequired } from '../../interfaces/product.interface';

export interface ProductCreateRequestDto extends ProductRequired {
  createdAt: Date;
}
