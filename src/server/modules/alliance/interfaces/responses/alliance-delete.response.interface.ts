import { Response } from '../../../../common/interfaces/response-object.interface';
import { AllianceDeleteResponseDto } from '../../dtos/responses/alliance-delete.response.dto';

export interface AllianceDeleteResponse extends Response {
  data?: AllianceDeleteResponseDto;
}
