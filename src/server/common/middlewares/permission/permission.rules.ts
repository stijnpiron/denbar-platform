import { PermissionRoles } from './enums/permission-roles.enum';
import { PermissionResource } from './enums/permission-resource.enum';
import { PermissionActions } from './enums/permission-actions.enum';
import { PermissionRules } from './interfaces/permission-rules.interface';

const { PRODUCTS } = PermissionResource;
const { CREATEONE, DELETEONE, READALL, READONE, READOWN, UPDATEONE } = PermissionActions;
const { ADMIN, SUPER, USER } = PermissionRoles;

export const permissions: PermissionRules = {
  [PRODUCTS]: {
    [READALL]: { granted: [USER, ADMIN, SUPER] },
    [READONE]: { granted: [USER, ADMIN, SUPER] },
    [READOWN]: { granted: [USER, ADMIN, SUPER], check: [USER] },
    [CREATEONE]: { granted: [ADMIN, SUPER] },
    [DELETEONE]: { granted: [ADMIN, SUPER] },
    [UPDATEONE]: { granted: [ADMIN, SUPER] },
  },
};
