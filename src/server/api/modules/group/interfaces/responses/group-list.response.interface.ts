import { Response } from '../../../../../common/interfaces/response-object.interface';
import { GroupResponseDto } from '../../dtos/responses/group-response.dto';

export interface GroupListResponse extends Response {
  data?: {
    groupQuantity: number;
    groups: GroupResponseDto[];
  };
}
