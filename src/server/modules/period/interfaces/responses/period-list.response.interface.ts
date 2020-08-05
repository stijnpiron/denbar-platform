import { Response } from '../../../../common/interfaces/response-object.interface';
import { PeriodResponseDto } from '../../dtos/responses/period.response.dto';

export interface PeriodListResponse extends Response {
  data?: {
    periodQuantity: number;
    periods: PeriodResponseDto[];
  };
}
