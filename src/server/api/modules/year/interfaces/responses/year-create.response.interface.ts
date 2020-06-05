import { Response } from '../../../../../common/interfaces/response-object.interface';
import { YearCreateResponseDto } from '../../dtos/responses/year-create.response.dto';

export interface YearCreateResponse extends Response {
  data?: YearCreateResponseDto;
}
