import { OK } from 'http-status-codes';
import { GroupService } from './group.service';
import express from 'express';
import { Controller } from './../../common/interfaces/controller.interface';
import { authMiddleware } from 'server/common/middlewares/auth.middleware';
import { grantAccess } from 'server/common/middlewares/permission/permission.middleware';
import { PermissionResource } from 'server/common/middlewares/permission/enums/permission-resource.enum';
import { PermissionActions } from 'server/common/middlewares/permission/enums/permission-actions.enum';
import { RequestWithUser } from 'server/common/interfaces/request-with-user.interface';
import { GroupCreateRequestDto } from './dtos/requests/group-create.request.dto';
import { GroupUpdateRequestDto } from './dtos/requests/group-update.request.dto';

const { GROUPS } = PermissionResource;
const { READALL, READOWN, CREATEONE, DELETEONE, UPDATEONE } = PermissionActions;

export class GroupController extends Controller {
  public path = '/groups';
  public router = express.Router();
  private groupService = new GroupService();

  constructor() {
    super();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router
      .all(`${this.path}*`, authMiddleware())
      .get(`${this.path}`, grantAccess(READALL, GROUPS), this.getAllGroups)
      .get(`${this.path}/:id`, grantAccess(READOWN, GROUPS), this.getGroupById)
      .post(`${this.path}`, grantAccess(CREATEONE, GROUPS), this.createGroup)
      .delete(`${this.path}/:id`, grantAccess(DELETEONE, GROUPS), this.deletePost)
      .put(`${this.path}/:id`, grantAccess(UPDATEONE, GROUPS), this.modifyGroup);
  }

  private getAllGroups = async (_req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
      const groups = await this.groupService.list();
      res.status(OK).send(groups);
    } catch (err) {
      next(err);
    }
  };

  private getGroupById = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    const { id } = req.params;

    try {
      const group = await this.groupService.getById(id);
      res.status(OK).send(group);
    } catch (err) {
      next(err);
    }
  };

  private createGroup = async (req: RequestWithUser, res: express.Response, next: express.NextFunction): Promise<void> => {
    const groupData: GroupCreateRequestDto = req.body;

    try {
      const createdGroup = await this.groupService.create(groupData, req.user._id);
      res.status(OK).send(createdGroup);
    } catch (err) {
      next(err);
    }
  };

  private modifyGroup = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    const { id } = req.params;

    try {
      const groupData: GroupUpdateRequestDto = req.body;
      const group = await this.groupService.updateById(id, groupData);
      res.status(OK).send(group);
    } catch (err) {
      next(err);
    }
  };

  private deletePost = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    const { id } = req.params;

    try {
      await this.groupService.deleteById(id);
      res.status(OK).send();
    } catch (err) {
      next(err);
    }
  };
}
