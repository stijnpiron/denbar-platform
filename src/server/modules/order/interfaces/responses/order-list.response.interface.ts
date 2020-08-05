import { Response } from '../../../../common/interfaces/response-object.interface';
import { OrderResponseDto } from '../../dtos/responses/order.response.dto';

export interface OrderListResponse extends Response {
  data?: {
    orderQuantity: number;
    orders: OrderResponseDto[];
  };
}
