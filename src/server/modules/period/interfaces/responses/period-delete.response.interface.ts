import { Response } from '../../../../common/interfaces/response-object.interface';
import { PeriodDeleteResponseDto } from '../../dtos/responses/period-delete.response.dto';

export interface PeriodDeleteResponse extends Response {
  data?: PeriodDeleteResponseDto;
}
