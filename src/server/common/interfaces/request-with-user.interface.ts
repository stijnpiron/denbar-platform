import { Request } from 'express';
import { User } from '../../api/modules/user/interfaces/user.interface';

export interface RequestWithUser extends Request {
  user: User;
}
