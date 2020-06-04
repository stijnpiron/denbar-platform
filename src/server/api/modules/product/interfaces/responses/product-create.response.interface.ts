import { Response } from '../../../../../common/interfaces/response-object.interface';
import { ProductCreateResponseDto } from '../../dtos/responses/product-create.response.dto';

export interface ProductCreateResponse extends Response {
  data?: ProductCreateResponseDto;
}
