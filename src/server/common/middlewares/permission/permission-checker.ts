import { PermissionRoles } from './enums/permission-roles.enum';
import mongoose from 'mongoose';
import { PermissionRules } from './interfaces/permission-rules.interface';

export const permissionChecker = async (
  role: string,
  action: string,
  resource: string,
  checkParams: { resourceId?: string; createdByIdField: string; userId?: string; permissions: PermissionRules }
): Promise<boolean> => {
  // if one of the required parameters is not present, return false
  if (typeof role !== 'string' || typeof action !== 'string' || typeof resource !== 'string') return false;

  const { resourceId, userId, permissions, createdByIdField } = checkParams;

  console.log(permissions[resource][action].granted.filter((r: string) => r === PermissionRoles.GUEST).length);

  // when GUEST is allowed to execute the action, everyone is, so return true to give permissions
  if (permissions[resource][action].granted.filter((r: string) => r === PermissionRoles.GUEST).length !== 0) return true;

  // if required parameters are present, go check for correct role. it failed, return false as permissions are not met
  if (permissions[resource][action].granted.filter((r: string) => r === role).length === 0) return false;
  // go find a resource with matching id and userId as createdBy
  else if (action.includes('own') && permissions[resource][action].check?.includes(role as PermissionRoles))
    if (
      !(await mongoose.connection.db
        .collection(resource)
        .findOne({ _id: mongoose.Types.ObjectId(resourceId), [createdByIdField]: mongoose.Types.ObjectId(userId) }))
    )
      return false;

  // if all permission checks succeed, success and continue
  return true;
};
