import { UserUpdateResponseDto } from './../../dtos/responses/user-update.response.dto';
import { Response } from '../../../../../common/interfaces/response-object.interface';

export interface UserUpdateResponse extends Response {
  data?: UserUpdateResponseDto;
}
