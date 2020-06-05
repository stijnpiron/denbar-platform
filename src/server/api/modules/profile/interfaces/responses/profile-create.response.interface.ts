import { Response } from '../../../../../common/interfaces/response-object.interface';
import { ProfileCreateResponseDto } from '../../dtos/responses/profile-create.response.dto';

export interface ProfileCreateResponse extends Response {
  data?: ProfileCreateResponseDto;
}
