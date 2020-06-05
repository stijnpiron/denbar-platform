import { Response } from '../../../../common/interfaces/response-object.interface';
import { YearResponseDto } from '../../dtos/responses/year-response.dto';

export interface YearListResponse extends Response {
  data?: {
    yearQuantity: number;
    years: YearResponseDto[];
  };
}
