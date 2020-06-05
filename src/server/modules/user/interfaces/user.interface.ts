import { UserTypes } from './../enums/user-types.enum';
import { PermissionRoles } from '../../../common/middlewares/permission/enums/permission-roles.enum';
import { Group } from '../../../modules/group/interfaces/group.interface';
import { Resource } from '../../../common/interfaces/resource.interface';

// TODO: Add variations of usermodel (userForRegister, userForLogin, ...)

interface Address {
  street: string;
  city: string;
  country: string;
}

interface UserBasics extends Resource {
  _id?: string;
  name: string;
  email: string;
  password: string;
}

export type User = UserRequired;

export interface UserOptional extends UserBasics {
  group?: Group;
  year?: number;
  period?: string;
  role?: PermissionRoles;
  twoFactorAuthenticationCode?: string;
  isTwoFactorAuthenticationEnabled?: boolean;
  address?: Address;
  type?: UserTypes;
}

export type UserRequired = UserOptional;
