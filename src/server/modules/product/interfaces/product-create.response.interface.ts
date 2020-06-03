import { ProductCreateResponseDto } from './product.interface';
import { Response } from '../../../common/interfaces/response-object.interface';

export interface ProductCreateResponse extends Response {
  data?: ProductCreateResponseDto;
}
