import { Response } from '../../../../common/interfaces/response-object.interface';
import { YearGetResponseDto } from '../../dtos/responses/year-get.response.dto';

export interface YearGetResponse extends Response {
  data?: YearGetResponseDto;
}
