import { PermissionRoles } from '../../../common/middlewares/permission/enums/permission-roles.enum';
import { Group } from 'server/modules/group/interfaces/group.interface';

// TODO: Add variations of usermodel (userForRegister, userForLogin, ...)
export interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
  group: Group;
  year: number;
  period: string;
  role: PermissionRoles;
  twoFactorAuthenticationCode?: string;
  isTwoFactorAuthenticationEnabled?: boolean;
  address?: Address;
}

interface Address {
  street: string;
  city: string;
  country: string;
}
