import { Request } from 'express';
import User from '../../modules/user/interfaces/user.interface';

interface RequestWithUser extends Request {
  user: User;
}

export default RequestWithUser;
