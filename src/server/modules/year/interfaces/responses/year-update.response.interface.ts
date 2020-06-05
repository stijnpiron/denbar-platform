import { YearUpdateResponseDto } from '../../dtos/responses/year-update.response.dto';
import { Response } from '../../../../common/interfaces/response-object.interface';

export interface YearUpdateResponse extends Response {
  data?: YearUpdateResponseDto;
}
