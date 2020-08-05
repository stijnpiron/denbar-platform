import { Response } from '../../../../common/interfaces/response-object.interface';
import { OrderUpdateResponseDto } from '../../dtos/responses/order-update.response.dto';

export interface OrderUpdateResponse extends Response {
  data?: OrderUpdateResponseDto;
}
