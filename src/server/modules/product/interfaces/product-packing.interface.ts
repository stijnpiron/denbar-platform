import { PackingSize } from '../enums/packing-size.enum';

export interface ProductPacking {
  quantity: number;
  size: PackingSize;
}
