import { ProductOptional } from '../../interfaces/product.interface';

export interface ProductUpdateResponseDto extends ProductOptional {
  name: string;
  active: boolean;
  createdAt: Date;
  lastEdited: Date;
}
