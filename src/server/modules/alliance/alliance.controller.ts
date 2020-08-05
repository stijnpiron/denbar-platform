import { OK } from 'http-status-codes';
import { AllianceService } from './alliance.service';
import express from 'express';
import { AllianceCreateRequestDto } from './dtos/requests/alliance-create.request.dto';
import { AllianceUpdateRequestDto } from './dtos/requests/alliance-update.request.dto';
import { PermissionResource } from '../../common/middlewares/permission/enums/permission-resource.enum';
import { PermissionActions } from '../../common/middlewares/permission/enums/permission-actions.enum';
import { Controller } from '../../common/interfaces/controller.interface';
import { grantAccess } from '../../common/middlewares/permission/permission.middleware';
import { RequestWithUser } from '../../common/interfaces/request-with-user.interface';

const { ALLIANCES } = PermissionResource;
const { READ_ALL, READ_OWN, CREATE_ONE, DELETE_ONE, UPDATE_ONE } = PermissionActions;

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
      .get(`${this.path}`, grantAccess({ action: READ_ALL, resource: ALLIANCES }), this.getAllAlliances)
      .get(`${this.path}/:id`, grantAccess({ action: READ_OWN, resource: ALLIANCES }), this.getAllianceById)
      .post(`${this.path}`, grantAccess({ action: CREATE_ONE, resource: ALLIANCES }), this.createAlliance)
      .delete(`${this.path}/:id`, grantAccess({ action: DELETE_ONE, resource: ALLIANCES }), this.deletePost)
      .put(`${this.path}/:id`, grantAccess({ action: UPDATE_ONE, resource: ALLIANCES }), this.modifyAlliance);
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
