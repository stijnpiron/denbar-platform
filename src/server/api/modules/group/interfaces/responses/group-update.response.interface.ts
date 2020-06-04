import { GroupUpdateResponseDto } from '../../dtos/responses/group-update.response.dto';
import { Response } from '../../../../../common/interfaces/response-object.interface';

export interface GroupUpdateResponse extends Response {
  data?: GroupUpdateResponseDto;
}
