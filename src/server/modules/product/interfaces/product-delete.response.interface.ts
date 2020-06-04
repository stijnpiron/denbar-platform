import { ProductDeleteResponseDto } from './product.interface';
import { Response } from '../../../common/interfaces/response-object.interface';

export interface ProductDeleteResponse extends Response {
  data?: ProductDeleteResponseDto;
}
