import { Response } from '../../../../common/interfaces/response-object.interface';
import { ProductResponseDto } from '../../dtos/responses/product.response.dto';

export interface ProductListResponse extends Response {
  data?: {
    productQuantity: number;
    products: ProductResponseDto[];
  };
}
