import { PermissionRoles } from './../enums/permission-roles.enum';

export interface PermissionRules {
  [PermissionResource: string]: {
    [PermissionActions: string]: {
      granted: PermissionRoles[];
      check?: PermissionRoles[];
    };
  };
}
