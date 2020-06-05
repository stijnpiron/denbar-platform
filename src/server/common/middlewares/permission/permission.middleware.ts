import { RequestWithUser } from './../../interfaces/request-with-user.interface';
import { ForbiddenException } from '../../exceptions/forbidden.exception';
import { AuthenticationTokenMissingException } from '../../exceptions/authentication-token-missing.exception';
import { DataStoredInToken } from '../../interfaces/data-stored-in-token.interface';
import express from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticationService } from '../../../api/common/authentication/authentication.service';
import { compareStrings } from '../../utils';
import { permissionChecker } from './permission-checker';
import { permissions } from './permission.rules';

export const grantAccess = (action: string, resource: string): express.RequestHandler => async (
  req: RequestWithUser,
  _res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  const authenticationService = new AuthenticationService();
  const { cookies } = req;

  if (cookies.Authorization) {
    const secret = process.env.JWT_SECRET;

    try {
      const verificationResponse = jwt.verify(cookies.Authorization, secret) as DataStoredInToken;
      const { role } = verificationResponse;

      if (role) {
        const roleMatch = compareStrings(role, await authenticationService.getRoleForUser(req.user._id));

        if (!roleMatch) next(new ForbiddenException("You don't have enough permission to perform this action"));

        const permission = await permissionChecker(role, action, resource, {
          permissions,
          resourceId: req.params.id || null,
          userId: req.user._id,
          createdByIdField: 'createdBy',
        });

        if (!permission) next(new ForbiddenException("You don't have enough permission to perform this action"));

        next();
      } else {
        next(new ForbiddenException("You don't have enough permission to perform this action"));
      }
    } catch (err) {
      next(err);
    }
  } else {
    next(new AuthenticationTokenMissingException());
  }
};
