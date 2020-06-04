import { Response } from '../../../../../common/interfaces/response-object.interface';
import { AllianceCreateResponseDto } from '../../dtos/responses/alliance-create.response.dto';

export interface AllianceCreateResponse extends Response {
  data?: AllianceCreateResponseDto;
}
