import { PermissionRoles } from './enums/permission-roles.enum';
import mongoose from 'mongoose';
import { PermissionRules } from './interfaces/permission-rules.interface';

export const checkForRole = (action: string, resource: string, role: string, permissions: PermissionRules): boolean => {
  try {
    return permissions[resource][action].granted.filter((r: string) => r === role).length !== 0;
  } catch (_e) {
    return false;
  }
};

export const checkForGuest = (action: string, resource: string, permissions: PermissionRules): boolean =>
  checkForRole(action, resource, PermissionRoles.GUEST, permissions);

export const permissionChecker = async (
  data: { action: string; resource: string; role?: string },
  checkParams: { resourceId?: string; createdByIdField?: string; userId?: string; permissions: PermissionRules }
): Promise<boolean> => {
  // if one of the required parameters is not present, return false
  const { action, resource, role } = data;
  const { resourceId, userId, permissions, createdByIdField } = checkParams;

  /*
   * when GUEST is allowed to execute the action, everyone is, so return true to give permissions
   * if (checkForGuest(action, resource, permissions)) return true;
   */

  // if required parameters are present, go check for correct role. it failed, return false as permissions are not met
  if (!checkForRole(action, resource, role, permissions)) return false;
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
