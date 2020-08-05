import { Response } from '../../../../common/interfaces/response-object.interface';
import { OrderGetResponseDto } from '../../dtos/responses/order-get.response.dto';

export interface OrderGetResponse extends Response {
  data?: OrderGetResponseDto;
}
