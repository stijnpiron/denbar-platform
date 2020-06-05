import { Response } from '../../../../common/interfaces/response-object.interface';
import { UserDeleteResponseDto } from '../../dtos/responses/profile-delete.response.dto';

export interface UserDeleteResponse extends Response {
  data?: UserDeleteResponseDto;
}
