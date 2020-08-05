import { PermissionResource } from './enums/permission-resource.enum';
import { PermissionActions } from './enums/permission-actions.enum';
import { RequestWithUser } from './../../interfaces/request-with-user.interface';
import { ForbiddenException } from '../../exceptions/forbidden.exception';
import { AuthenticationTokenMissingException } from '../../exceptions/authentication-token-missing.exception';
import { DataStoredInToken } from '../../interfaces/data-stored-in-token.interface';
import express from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticationService } from '../../../modules/authentication/authentication.service';
import { compareStrings } from '../../utils';
import { checkForGuest, permissionChecker } from './permission-checker';
import { permissions } from './permission.rules';
import { UserModel } from '../../../modules/user/models/user.model';
import { WrongAuthenticationTokenException } from '../../../common/exceptions/wrong-authentication-token.exception';

export const grantAccess = (params: {
  action?: PermissionActions;
  resource?: PermissionResource;
  omitSecondFactor?: boolean;
}): express.RequestHandler => async (req: RequestWithUser, _res: express.Response, next: express.NextFunction): Promise<void> => {
  const { action, resource, omitSecondFactor } = params;
  const authenticationService = new AuthenticationService();
  const { cookies } = req;

  let permission = true;

  if (action !== PermissionActions.AUHTENTICATION)
    if (!(await checkForGuest(action, resource, permissions))) {
      if (cookies.Authorization) {
        const secret = process.env.JWT_SECRET;

        try {
          const verificationResponse = jwt.verify(cookies.Authorization, secret) as DataStoredInToken;
          const { _id: id, isSecondFactorAuthenticated, role } = verificationResponse;
          const user = await UserModel.findById(id);

          if (user) {
            if (!omitSecondFactor && user.isTwoFactorAuthenticationEnabled && !isSecondFactorAuthenticated) next(new WrongAuthenticationTokenException());
            else req.user = user;

            if (role) {
              const roleMatch = compareStrings(role, await authenticationService.getRoleForUser(req.user._id));

              if (!roleMatch) next(new ForbiddenException("You don't have enough permission to perform this action"));

              permission = await permissionChecker(
                { action, resource, role },
                {
                  permissions,
                  resourceId: req.params.id || null,
                  userId: req.user._id,
                  createdByIdField: 'createdBy',
                }
              );

              if (!permission) next(new ForbiddenException("You don't have enough permission to perform this action"));
            } else {
              next(new ForbiddenException("You don't have enough permission to perform this action"));
            }
          }
        } catch (err) {
          next(err);
        }
      } else {
        next(new AuthenticationTokenMissingException());
      }
    }

  next();
};
