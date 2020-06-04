import { ProductResponseDto } from './product.interface';
import { Response } from '../../../common/interfaces/response-object.interface';

export interface ProductListResponse extends Response {
  data?: { productQuantity: number; products: ProductResponseDto[] };
}
