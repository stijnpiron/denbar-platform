import { UserGetResponseDto } from '../../dtos/responses/user-get.response.dto';
import { Response } from '../../../../../common/interfaces/response-object.interface';

export interface UserGetResponse extends Response {
  data?: UserGetResponseDto;
}
