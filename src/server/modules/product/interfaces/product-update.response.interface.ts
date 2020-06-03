import { ProductUpdateResponseDto } from './product.interface';
import { Response } from '../../../common/interfaces/response-object.interface';

export interface ProductUpdateResponse extends Response {
  data?: ProductUpdateResponseDto;
}
