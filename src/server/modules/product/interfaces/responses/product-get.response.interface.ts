import { Response } from '../../../../common/interfaces/response-object.interface';
import { ProductGetResponseDto } from '../../dtos/responses/product-get.response.dto';

export interface ProductGetResponse extends Response {
  data?: ProductGetResponseDto;
}
