import { ProductBasics } from '../../interfaces/product.interface';

export interface ProductCreateRequestDto extends ProductBasics {
  createdAt: Date;
}
