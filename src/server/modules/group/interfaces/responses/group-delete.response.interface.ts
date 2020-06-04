import { Response } from '../../../../common/interfaces/response-object.interface';
import { GroupDeleteResponseDto } from '../../dtos/responses/group-delete.response.dto';

export interface GroupDeleteResponse extends Response {
  data?: GroupDeleteResponseDto;
}
