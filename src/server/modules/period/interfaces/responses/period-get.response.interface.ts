import { Response } from '../../../../common/interfaces/response-object.interface';
import { PeriodGetResponseDto } from '../../dtos/responses/period-get.response.dto';

export interface PeriodGetResponse extends Response {
  data?: PeriodGetResponseDto;
}
