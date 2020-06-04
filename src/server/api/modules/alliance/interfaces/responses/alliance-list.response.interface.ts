import { Response } from '../../../../../common/interfaces/response-object.interface';
import { AllianceResponseDto } from '../../dtos/responses/alliance-response.dto';

export interface AllianceListResponse extends Response {
  data?: {
    allianceQuantity: number;
    alliances: AllianceResponseDto[];
  };
}
