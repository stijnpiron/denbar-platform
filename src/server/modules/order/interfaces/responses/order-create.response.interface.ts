import { Response } from '../../../../common/interfaces/response-object.interface';
import { OrderCreateResponseDto } from '../../dtos/responses/order-create.response.dto';

export interface OrderCreateResponse extends Response {
  data?: OrderCreateResponseDto;
}
