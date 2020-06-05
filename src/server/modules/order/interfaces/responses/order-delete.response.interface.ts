import { Response } from '../../../../common/interfaces/response-object.interface';
import { OrderDeleteResponseDto } from '../../dtos/responses/order-delete.response.dto';

export interface OrderDeleteResponse extends Response {
  data?: OrderDeleteResponseDto;
}
