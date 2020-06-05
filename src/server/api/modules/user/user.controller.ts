import { OK } from 'http-status-codes';
import { UserService } from './user.service';
import express from 'express';
import { Controller } from '../../../common/interfaces/controller.interface';
import { authMiddleware } from '../../../common/middlewares/auth.middleware';
import { grantAccess } from '../../../common/middlewares/permission/permission.middleware';
import { PermissionResource } from '../../../common/middlewares/permission/enums/permission-resource.enum';
import { PermissionActions } from '../../../common/middlewares/permission/enums/permission-actions.enum';
import { UserUpdateRequestDto } from './dtos/requests/user-update.request.dto';

const { USERS } = PermissionResource;
const { READALL, READOWN, DELETEONE, UPDATEONE } = PermissionActions;

export class UserController extends Controller {
  public path = '/users';
  public router = express.Router();
  private userService = new UserService();

  constructor() {
    super();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router
      .all(`${this.path}*`, authMiddleware())
      .get(`${this.path}`, grantAccess(READALL, USERS), this.getAllUsers)
      .get(`${this.path}/:id`, grantAccess(READOWN, USERS), this.getUserById)
      .delete(`${this.path}/:id`, grantAccess(DELETEONE, USERS), this.deletePost)
      .put(`${this.path}/:id`, grantAccess(UPDATEONE, USERS), this.modifyUser);
  }

  private getAllUsers = async (_req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
      const users = await this.userService.list();
      res.status(OK).send(users);
    } catch (err) {
      next(err);
    }
  };

  private getUserById = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    const { id } = req.params;

    try {
      const user = await this.userService.getById(id);
      res.status(OK).send(user);
    } catch (err) {
      next(err);
    }
  };

  private modifyUser = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    const { id } = req.params;

    try {
      const userData: UserUpdateRequestDto = req.body;
      const user = await this.userService.updateById(id, userData);
      res.status(OK).send(user);
    } catch (err) {
      next(err);
    }
  };

  private deletePost = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    const { id } = req.params;

    try {
      await this.userService.deleteById(id);
      res.status(OK).send();
    } catch (err) {
      next(err);
    }
  };
}
