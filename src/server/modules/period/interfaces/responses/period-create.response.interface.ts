import { Response } from '../../../../common/interfaces/response-object.interface';
import { PeriodCreateResponseDto } from '../../dtos/responses/period-create.response.dto';

export interface PeriodCreateResponse extends Response {
  data?: PeriodCreateResponseDto;
}
