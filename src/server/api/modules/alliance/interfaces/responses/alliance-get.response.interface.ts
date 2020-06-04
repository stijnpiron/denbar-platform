import { Response } from '../../../../../common/interfaces/response-object.interface';
import { AllianceGetResponseDto } from '../../dtos/responses/alliance-get.response.dto';

export interface AllianceGetResponse extends Response {
  data?: AllianceGetResponseDto;
}
