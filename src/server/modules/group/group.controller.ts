import { OK } from 'http-status-codes';
import { GroupService } from './group.service';
import express from 'express';
import { Controller } from '../../common/interfaces/controller.interface';
import { grantAccess } from '../../common/middlewares/permission/permission.middleware';
import { PermissionResource } from '../../common/middlewares/permission/enums/permission-resource.enum';
import { PermissionActions } from '../../common/middlewares/permission/enums/permission-actions.enum';
import { RequestWithUser } from '../../common/interfaces/request-with-user.interface';
import { GroupCreateRequestDto } from './dtos/requests/group-create.request.dto';
import { GroupUpdateRequestDto } from './dtos/requests/group-update.request.dto';

const { GROUPS } = PermissionResource;
const { READ_ALL, READ_OWN, CREATE_ONE, DELETE_ONE, UPDATE_ONE } = PermissionActions;

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
      .get(`${this.path}`, grantAccess({ action: READ_ALL, resource: GROUPS }), this.getAllGroups)
      .get(`${this.path}/:id`, grantAccess({ action: READ_OWN, resource: GROUPS }), this.getGroupById)
      .post(`${this.path}`, grantAccess({ action: CREATE_ONE, resource: GROUPS }), this.createGroup)
      .delete(`${this.path}/:id`, grantAccess({ action: DELETE_ONE, resource: GROUPS }), this.deletePost)
      .put(`${this.path}/:id`, grantAccess({ action: UPDATE_ONE, resource: GROUPS }), this.modifyGroup);
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
