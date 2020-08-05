import { Response } from '../../../../common/interfaces/response-object.interface';
import { GroupCreateResponseDto } from '../../dtos/responses/group-create.response.dto';

export interface GroupCreateResponse extends Response {
  data?: GroupCreateResponseDto;
}
