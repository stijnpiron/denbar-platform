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

  // if required parameters are present, go check for correct role. it failed, return false as permissions are not met
  if (permissions[resource][action].granted.filter((r: string) => r === role).length === 0) return false;

  // check if action needs further check
  if (action.includes('own') && permissions[resource][action].check?.includes(role)) {
    // go find a resource with matching id and userId as createdBy
    if (
      !(await mongoose.connection.db
        .collection(resource)
        .findOne({ _id: mongoose.Types.ObjectId(resourceId), [createdByIdField]: mongoose.Types.ObjectId(userId) }))
    )
      return false;
  } else {
    return false;
  }

  // if all permission checks succeed, success and continue
  return true;
};
