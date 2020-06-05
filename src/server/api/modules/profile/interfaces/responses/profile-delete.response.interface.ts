import { Response } from '../../../../../common/interfaces/response-object.interface';
import { ProfileDeleteResponseDto } from '../../dtos/responses/profile-delete.response.dto';

export interface ProfileDeleteResponse extends Response {
  data?: ProfileDeleteResponseDto;
}
