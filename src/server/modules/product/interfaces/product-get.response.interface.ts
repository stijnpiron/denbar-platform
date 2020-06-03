import { ProductGetResponseDto } from './product.interface';
import { Response } from '../../../common/interfaces/response-object.interface';

export interface ProductGetResponse extends Response {
  data?: ProductGetResponseDto;
}
