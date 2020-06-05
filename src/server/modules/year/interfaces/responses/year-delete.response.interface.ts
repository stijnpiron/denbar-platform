import { Response } from '../../../../common/interfaces/response-object.interface';
import { YearDeleteResponseDto } from '../../dtos/responses/year-delete.response.dto';

export interface YearDeleteResponse extends Response {
  data?: YearDeleteResponseDto;
}
