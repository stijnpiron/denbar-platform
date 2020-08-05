import { ProductOptional } from '../../interfaces/product.interface';

export interface ProductUpdateResponseDto extends ProductOptional {
  name: string;
  archived: boolean;
  createdAt: Date;
  lastEdited: Date;
}
