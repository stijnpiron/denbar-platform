import { UserResponseDto } from '../../dtos/responses/user-response.dto';
import { Response } from '../../../../common/interfaces/response-object.interface';

export interface UserListResponse extends Response {
  data?: {
    userQuantity: number;
    users: UserResponseDto[];
  };
}
