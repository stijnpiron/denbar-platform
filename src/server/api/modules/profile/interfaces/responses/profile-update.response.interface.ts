import { ProfileUpdateResponseDto } from '../../dtos/responses/profile-update.response.dto';
import { Response } from '../../../../../common/interfaces/response-object.interface';

export interface ProfileUpdateResponse extends Response {
  data?: ProfileUpdateResponseDto;
}
