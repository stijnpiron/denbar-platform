import { Response } from '../../../../common/interfaces/response-object.interface';
import { ProductUpdateResponseDto } from '../../dtos/responses/product-update.response.dto';

export interface ProductUpdateResponse extends Response {
  data?: ProductUpdateResponseDto;
}
