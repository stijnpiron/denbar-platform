import { OK } from 'http-status-codes';
import { YearService } from './year.service';
import express from 'express';
import { Controller } from '../../common/interfaces/controller.interface';
import { authMiddleware } from '../../common/middlewares/auth.middleware';
import { grantAccess } from '../../common/middlewares/permission/permission.middleware';
import { PermissionResource } from '../../common/middlewares/permission/enums/permission-resource.enum';
import { PermissionActions } from '../../common/middlewares/permission/enums/permission-actions.enum';
import { RequestWithUser } from '../../common/interfaces/request-with-user.interface';
import { YearCreateRequestDto } from './dtos/requests/year-create.request.dto';
import { YearUpdateRequestDto } from './dtos/requests/year-update.request.dto';

const { YEARS } = PermissionResource;
const { READALL, READOWN, CREATEONE, DELETEONE, UPDATEONE } = PermissionActions;

export class YearController extends Controller {
  public path = '/groups';
  public router = express.Router();
  private groupService = new YearService();

  constructor() {
    super();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router
      .all(`${this.path}*`, authMiddleware())
      .get(`${this.path}`, grantAccess(READALL, YEARS), this.getAllYears)
      .get(`${this.path}/:id`, grantAccess(READOWN, YEARS), this.getYearById)
      .post(`${this.path}`, grantAccess(CREATEONE, YEARS), this.createYear)
      .delete(`${this.path}/:id`, grantAccess(DELETEONE, YEARS), this.deletePost)
      .put(`${this.path}/:id`, grantAccess(UPDATEONE, YEARS), this.modifyYear);
  }

  private getAllYears = async (_req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
      const groups = await this.groupService.list();
      res.status(OK).send(groups);
    } catch (err) {
      next(err);
    }
  };

  private getYearById = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    const { id } = req.params;

    try {
      const group = await this.groupService.getById(id);
      res.status(OK).send(group);
    } catch (err) {
      next(err);
    }
  };

  private createYear = async (req: RequestWithUser, res: express.Response, next: express.NextFunction): Promise<void> => {
    const groupData: YearCreateRequestDto = req.body;

    try {
      const createdYear = await this.groupService.create(groupData, req.user._id);
      res.status(OK).send(createdYear);
    } catch (err) {
      next(err);
    }
  };

  private modifyYear = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    const { id } = req.params;

    try {
      const groupData: YearUpdateRequestDto = req.body;
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
