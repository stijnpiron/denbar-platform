import { ProductOptional } from '../../interfaces/product.interface';

export interface ProductCreateResponseDto extends ProductOptional {
  name: string;
  active: boolean;
  createdAt: Date;
}
