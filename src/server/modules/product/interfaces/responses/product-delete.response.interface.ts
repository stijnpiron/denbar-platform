import { Response } from '../../../../common/interfaces/response-object.interface';
import { ProductDeleteResponseDto } from '../../dtos/responses/product-delete.response.dto';

export interface ProductDeleteResponse extends Response {
  data?: ProductDeleteResponseDto;
}
