import { AllianceUpdateResponseDto } from './../../dtos/responses/alliance-update.response.dto';
import { Response } from '../../../../../common/interfaces/response-object.interface';

export interface AllianceUpdateResponse extends Response {
  data?: AllianceUpdateResponseDto;
}
