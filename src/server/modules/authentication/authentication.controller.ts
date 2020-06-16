import { UserOptional } from './../user/interfaces/user.interface';
import { PermissionResource } from './../../common/middlewares/permission/enums/permission-resource.enum';
import { grantAccess } from './../../common/middlewares/permission/permission.middleware';
import express from 'express';
import { OK, UNAUTHORIZED } from 'http-status-codes';
import { AuthenticationService } from './authentication.service';
import { UserCreateRequestDto } from '../../modules/user/dtos/requests/user-create.request.dto';
import { LoginDto } from './dtos/login.dto';
import { TwoFactorAuthenticationDto } from './dtos/two-factor-authentication.dto';
import { UserModel } from '../../modules/user/models/user.model';
import { Controller } from '../../common/interfaces/controller.interface';
import { validationMiddleware } from '../../common/middlewares/validation.middleware';
import { RequestWithUser } from '../../common/interfaces/request-with-user.interface';
import { WrongTwoFactorAuthenticationCodeException } from '../../common/exceptions/wrong-two-factor-authentication-code.exception';
import { PermissionActions } from '../../common/middlewares/permission/enums/permission-actions.enum';

const { CHECK_AUTH, TFA, AUHTENTICATION } = PermissionActions;
const { AUTH } = PermissionResource;

export class AuthenticationController extends Controller {
  public path = '/auth';
  public router = express.Router();
  private authenticationService = new AuthenticationService();
  private user = UserModel;

  constructor() {
    super();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(`${this.path}/check`, grantAccess({ action: CHECK_AUTH, resource: AUTH }), this.checkAuthentication);

    this.router.post(`${this.path}/register`, validationMiddleware(UserCreateRequestDto), grantAccess({ action: AUHTENTICATION }), this.registration);

    this.router.post(`${this.path}/login`, validationMiddleware(LoginDto), grantAccess({ action: AUHTENTICATION }), this.loggingIn);
    this.router.post(`${this.path}/logout`, grantAccess({ action: AUHTENTICATION }), this.loggingOut);

    this.router.post(
      `${this.path}/2fa/authenticate`,
      validationMiddleware(TwoFactorAuthenticationDto),
      grantAccess({ action: TFA, resource: AUTH, omitSecondFactor: true }),
      this.secondFactorAuthentication
    );

    this.router
      .get(`${this.path}`, this.auth)
      .post(`${this.path}/2fa/generate`, grantAccess({ action: TFA, resource: AUTH }), this.generateTwoFactorAuthenticationCode)
      .post(
        `${this.path}/2fa/toggle`,
        validationMiddleware(TwoFactorAuthenticationDto),
        grantAccess({ action: TFA, resource: AUTH }),
        this.toggleTwoFactorAuthentication
      );
  }

  private checkAuthentication = async (req: RequestWithUser, res: express.Response, next: express.NextFunction): Promise<void> => {
    const userId = req.user._id;

    try {
      const user = await this.authenticationService.authenticate(userId);

      if (user._id) res.status(OK).send(user);
      else res.status(UNAUTHORIZED).send();
    } catch (err) {
      next(err);
    }
  };

  private registration = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    const userData: UserOptional = req.body;

    try {
      const { cookie, user } = await this.authenticationService.register(userData);
      res.setHeader('Set-Cookie', [cookie]);
      res.status(OK).send(user);
    } catch (err) {
      next(err);
    }
  };

  private loggingIn = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    const loginData: LoginDto = req.body;

    try {
      const { cookie, user, isTwoFactorAuthenticationEnabled } = await this.authenticationService.login(loginData);
      res.setHeader('Set-Cookie', cookie);

      if (isTwoFactorAuthenticationEnabled) res.status(OK).send({ isTwoFactorAuthenticationEnabled });
      else res.status(OK).send(user);
    } catch (err) {
      next(err);
    }
  };

  private loggingOut = async (_req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
      const { cookie } = await this.authenticationService.logout();
      res.setHeader('Set-Cookie', cookie);
      res.status(OK).send();
    } catch (err) {
      next(err);
    }
  };

  private generateTwoFactorAuthenticationCode = async (req: RequestWithUser, res: express.Response, next: express.NextFunction): Promise<void> => {
    const { user } = req;

    try {
      const { otpauthUrl, base32 } = this.authenticationService.getTwoFactorAuthenticationCode();

      await this.user.findByIdAndUpdate(user._id, {
        twoFactorAuthenticationCode: base32,
      });
      this.authenticationService.respondWithQRCode(otpauthUrl, res);
    } catch (err) {
      next(err);
    }
  };

  private toggleTwoFactorAuthentication = async (req: RequestWithUser, res: express.Response, next: express.NextFunction): Promise<void> => {
    const { twoFactorAuthenticationCode } = req.body;
    const { user } = req;

    const isCodeValid = await this.authenticationService.verifyTwoFactorAuthenticationCode(twoFactorAuthenticationCode, user);

    if (isCodeValid) {
      await this.user.findByIdAndUpdate(user._id, {
        isTwoFactorAuthenticationEnabled: !user.isTwoFactorAuthenticationEnabled,
      });
      res.status(OK).send();
    } else {
      next(new WrongTwoFactorAuthenticationCodeException());
    }
  };

  private secondFactorAuthentication = async (req: RequestWithUser, res: express.Response, next: express.NextFunction): Promise<void> => {
    const { twoFactorAuthenticationCode } = req.body;
    const { user } = req;

    try {
      const { cookie, result } = await this.authenticationService.secondFactorAuthentication(twoFactorAuthenticationCode, user);
      res.setHeader('Set-Cookie', cookie);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  };

  private auth = (req: RequestWithUser, res: express.Response): void => {
    res.send({
      ...req.user,
      password: undefined,
      twoFactorAuthenticationCode: undefined,
    });
  };
}
