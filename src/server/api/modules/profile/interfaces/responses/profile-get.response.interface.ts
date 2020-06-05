import { Response } from '../../../../../common/interfaces/response-object.interface';
import { ProfileGetResponseDto } from '../../dtos/responses/profile-get.response.dto';

export interface ProfileGetResponse extends Response {
  data?: ProfileGetResponseDto;
}
