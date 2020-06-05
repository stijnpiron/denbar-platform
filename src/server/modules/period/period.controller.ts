import { RequestWithUser } from '../../common/interfaces/request-with-user.interface';
import { PermissionActions } from '../../common/middlewares/permission/enums/permission-actions.enum';
import { PermissionResource } from '../../common/middlewares/permission/enums/permission-resource.enum';
import { grantAccess } from '../../common/middlewares/permission/permission.middleware';
import { OK } from 'http-status-codes';
import express from 'express';
import { Controller } from '../../common/interfaces/controller.interface';
import { authMiddleware } from '../../common/middlewares/auth.middleware';
import { PeriodService } from './period.service';
import { PeriodCreateRequestDto } from './dtos/requests/period-create.request.dto';
import { PeriodUpdateRequestDto } from './dtos/requests/period-update.request.dto';

const { PRODUCTS } = PermissionResource;
const { READALL, READOWN, CREATEONE, DELETEONE, UPDATEONE } = PermissionActions;

export class PeriodController extends Controller {
  public path = '/periods';
  public router = express.Router();
  private periodService = new PeriodService();

  constructor() {
    super();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router
      .all(`${this.path}*`, authMiddleware())
      .get(`${this.path}`, grantAccess(READALL, PRODUCTS), this.getAllPeriods)
      .get(`${this.path}/:id`, grantAccess(READOWN, PRODUCTS), this.getPeriodById)
      .post(`${this.path}`, grantAccess(CREATEONE, PRODUCTS), this.createPeriod)
      .delete(`${this.path}/:id`, grantAccess(DELETEONE, PRODUCTS), this.deletePeriod)
      .put(`${this.path}/:id`, grantAccess(UPDATEONE, PRODUCTS), this.modifyPeriod);
  }

  private getAllPeriods = async (_req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
      const periods = await this.periodService.list();
      res.status(OK).send(periods);
    } catch (err) {
      next(err);
    }
  };

  private getPeriodById = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    const { id } = req.params;

    try {
      const period = await this.periodService.getById(id);
      res.status(OK).send(period);
    } catch (err) {
      next(err);
    }
  };

  private createPeriod = async (req: RequestWithUser, res: express.Response, next: express.NextFunction): Promise<void> => {
    const periodData: PeriodCreateRequestDto = req.body;

    try {
      const createdPeriod = await this.periodService.create(periodData, req.user._id);
      res.status(OK).send(createdPeriod);
    } catch (err) {
      next(err);
    }
  };

  private modifyPeriod = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    const { id } = req.params;

    try {
      const periodData: PeriodUpdateRequestDto = req.body;
      const period = await this.periodService.updateById(id, periodData);
      res.status(OK).send(period);
    } catch (err) {
      next(err);
    }
  };

  private deletePeriod = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    const { id } = req.params;

    try {
      await this.periodService.deleteById(id);
      res.status(OK).send();
    } catch (err) {
      next(err);
    }
  };
}
