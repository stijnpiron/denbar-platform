import { Response } from '../../../../common/interfaces/response-object.interface';
import { ProfileResponseDto } from '../../dtos/responses/profile-response.dto';

export interface ProfileListResponse extends Response {
  data?: {
    profileQuantity: number;
    profiles: ProfileResponseDto[];
  };
}
