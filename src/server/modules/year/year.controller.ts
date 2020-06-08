import { OK } from 'http-status-codes';
import { YearService } from './year.service';
import express from 'express';
import { Controller } from '../../common/interfaces/controller.interface';
import { grantAccess } from '../../common/middlewares/permission/permission.middleware';
import { PermissionResource } from '../../common/middlewares/permission/enums/permission-resource.enum';
import { PermissionActions } from '../../common/middlewares/permission/enums/permission-actions.enum';
import { RequestWithUser } from '../../common/interfaces/request-with-user.interface';
import { YearCreateRequestDto } from './dtos/requests/year-create.request.dto';
import { YearUpdateRequestDto } from './dtos/requests/year-update.request.dto';

const { YEARS } = PermissionResource;
const { READ_ALL, READ_OWN, CREATE_ONE, DELETE_ONE, UPDATE_ONE } = PermissionActions;

export class YearController extends Controller {
  public path = '/years';
  public router = express.Router();
  private yearService = new YearService();

  constructor() {
    super();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router
      .get(`${this.path}`, grantAccess({ action: READ_ALL, resource: YEARS }), this.getAllYears)
      .get(`${this.path}/:id`, grantAccess({ action: READ_OWN, resource: YEARS }), this.getYearById)
      .post(`${this.path}`, grantAccess({ action: CREATE_ONE, resource: YEARS }), this.createYear)
      .delete(`${this.path}/:id`, grantAccess({ action: DELETE_ONE, resource: YEARS }), this.deletePost)
      .put(`${this.path}/:id`, grantAccess({ action: UPDATE_ONE, resource: YEARS }), this.modifyYear);
  }

  private getAllYears = async (_req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
      const years = await this.yearService.list();
      res.status(OK).send(years);
    } catch (err) {
      next(err);
    }
  };

  private getYearById = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    const { id } = req.params;

    try {
      const year = await this.yearService.getById(id);
      res.status(OK).send(year);
    } catch (err) {
      next(err);
    }
  };

  private createYear = async (req: RequestWithUser, res: express.Response, next: express.NextFunction): Promise<void> => {
    const yearData: YearCreateRequestDto = req.body;

    try {
      const createdYear = await this.yearService.create(yearData, req.user._id);
      res.status(OK).send(createdYear);
    } catch (err) {
      next(err);
    }
  };

  private modifyYear = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    const { id } = req.params;

    try {
      const yearData: YearUpdateRequestDto = req.body;
      const year = await this.yearService.updateById(id, yearData);
      res.status(OK).send(year);
    } catch (err) {
      next(err);
    }
  };

  private deletePost = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    const { id } = req.params;

    try {
      await this.yearService.deleteById(id);
      res.status(OK).send();
    } catch (err) {
      next(err);
    }
  };
}
