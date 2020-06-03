import { RequestWithUser } from './../../interfaces/request-with-user.interface';
import { ForbiddenException } from '../../exceptions/forbidden.exception';
import { PermissionActions } from './enums/permission-actions.enum';
import { PermissionResource } from './enums/permission-resource.enum';
import { AuthenticationTokenMissingException } from '../../exceptions/authentication-token-missing.exception';
import { DataStoredInToken } from '../../interfaces/data-stored-in-token.interface';
import express from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticationService } from '../../../modules/authentication/authentication.service';
import { compareStrings } from '../../utils/utils';

// TODO: move to separate file to increase maintainability and perhaps in the future ;ove to database
const permissions: any = {
  [PermissionResource.PRODUCT]: {
    [PermissionActions.READANY]: ['user', 'admin', 'super'],
    [PermissionActions.CREATEANY]: ['admin', 'super'],
    [PermissionActions.DELETEANY]: ['admin', 'super'],
    [PermissionActions.UPDATEANY]: ['admin', 'super'],
  },
};

const permissionChecker = (role: string, action: string, resource: string): boolean =>
  permissions[resource][action].filter((r: string) => r === role).length !== 0;

export const grantAccess = (action: string, resource: string): express.RequestHandler => async (
  req: RequestWithUser,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  const authenticationService = new AuthenticationService();
  const { cookies } = req;

  if (cookies?.Authorization) {
    const secret = process.env.JWT_SECRET;

    try {
      const verificationResponse = jwt.verify(cookies.Authorization, secret) as DataStoredInToken;
      const { role } = verificationResponse;

      if (role)
        if (!compareStrings(role, await authenticationService.getRoleForUser(req.user._id))) {
          next(new ForbiddenException("You don't have enough permission to perform this action"));
        }

      const permission = permissionChecker(role, action, resource);

      if (!permission) next(new ForbiddenException("You don't have enough permission to perform this action"));

      next();
    } catch (err) {
      next(err);
    }
  } else {
    next(new AuthenticationTokenMissingException());
  }
};
