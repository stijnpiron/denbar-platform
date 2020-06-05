import { Response } from '../../../../common/interfaces/response-object.interface';
import { PeriodUpdateResponseDto } from '../../dtos/responses/period-update.response.dto';

export interface PeriodUpdateResponse extends Response {
  data?: PeriodUpdateResponseDto;
}
