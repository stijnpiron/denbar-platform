import { ProductOptional } from '../../interfaces/product.interface';

export interface ProductCreateResponseDto extends ProductOptional {
  name: string;
  archived: boolean;
  createdAt: Date;
}
