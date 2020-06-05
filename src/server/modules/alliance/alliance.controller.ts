import { OK } from 'http-status-codes';
import { AllianceService } from './alliance.service';
import express from 'express';
import { AllianceCreateRequestDto } from './dtos/requests/alliance-create.request.dto';
import { AllianceUpdateRequestDto } from './dtos/requests/alliance-update.request.dto';
import { PermissionResource } from '../../common/middlewares/permission/enums/permission-resource.enum';
import { PermissionActions } from '../../common/middlewares/permission/enums/permission-actions.enum';
import { Controller } from '../../common/interfaces/controller.interface';
import { authMiddleware } from '../../common/middlewares/auth.middleware';
import { grantAccess } from '../../common/middlewares/permission/permission.middleware';
import { RequestWithUser } from '../../common/interfaces/request-with-user.interface';

const { ALLIANCES } = PermissionResource;
const { READALL, READOWN, CREATEONE, DELETEONE, UPDATEONE } = PermissionActions;

export class AllianceController extends Controller {
  public path = '/alliances';
  public router = express.Router();
  private allianceService = new AllianceService();

  constructor() {
    super();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router
      .all(`${this.path}*`, authMiddleware())
      .get(`${this.path}`, grantAccess(READALL, ALLIANCES), this.getAllAlliances)
      .get(`${this.path}/:id`, grantAccess(READOWN, ALLIANCES), this.getAllianceById)
      .post(`${this.path}`, grantAccess(CREATEONE, ALLIANCES), this.createAlliance)
      .delete(`${this.path}/:id`, grantAccess(DELETEONE, ALLIANCES), this.deletePost)
      .put(`${this.path}/:id`, grantAccess(UPDATEONE, ALLIANCES), this.modifyAlliance);
  }

  private getAllAlliances = async (_req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
      const alliances = await this.allianceService.list();
      res.status(OK).send(alliances);
    } catch (err) {
      next(err);
    }
  };

  private getAllianceById = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    const { id } = req.params;

    try {
      const alliance = await this.allianceService.getById(id);
      res.status(OK).send(alliance);
    } catch (err) {
      next(err);
    }
  };

  private createAlliance = async (req: RequestWithUser, res: express.Response, next: express.NextFunction): Promise<void> => {
    const allianceData: AllianceCreateRequestDto = req.body;

    try {
      const createdAlliance = await this.allianceService.create(allianceData, req.user._id);
      res.status(OK).send(createdAlliance);
    } catch (err) {
      next(err);
    }
  };

  private modifyAlliance = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    const { id } = req.params;

    try {
      const allianceData: AllianceUpdateRequestDto = req.body;
      const alliance = await this.allianceService.updateById(id, allianceData);
      res.status(OK).send(alliance);
    } catch (err) {
      next(err);
    }
  };

  private deletePost = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    const { id } = req.params;

    try {
      await this.allianceService.deleteById(id);
      res.status(OK).send();
    } catch (err) {
      next(err);
    }
  };
}
