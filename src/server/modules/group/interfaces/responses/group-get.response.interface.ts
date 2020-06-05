import { Response } from '../../../../common/interfaces/response-object.interface';
import { GroupGetResponseDto } from '../../dtos/responses/group-get.response.dto';

export interface GroupGetResponse extends Response {
  data?: GroupGetResponseDto;
}
