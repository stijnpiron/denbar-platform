import { ProductOptional } from '../../interfaces/product.interface';

export interface ProductGetResponseDto extends ProductOptional {
  name: string;
  archived: boolean;
  createdAt: Date;
}
