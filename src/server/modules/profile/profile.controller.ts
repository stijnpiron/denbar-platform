import { OK } from 'http-status-codes';
import { ProfileService } from './profile.service';
import express from 'express';
import { Controller } from '../../common/interfaces/controller.interface';
import { authMiddleware } from '../../common/middlewares/auth.middleware';
import { grantAccess } from '../../common/middlewares/permission/permission.middleware';
import { PermissionResource } from '../../common/middlewares/permission/enums/permission-resource.enum';
import { PermissionActions } from '../../common/middlewares/permission/enums/permission-actions.enum';
import { RequestWithUser } from '../../common/interfaces/request-with-user.interface';
import { ProfileCreateRequestDto } from './dtos/requests/profile-create.request.dto';
import { ProfileUpdateRequestDto } from './dtos/requests/profile-update.request.dto';

const { PROFILES } = PermissionResource;
const { READ_ALL, READ_OWN, CREATE_ONE, DELETE_ONE, UPDATE_ONE } = PermissionActions;

export class ProfileController extends Controller {
  public path = '/profiles';
  public router = express.Router();
  private profileService = new ProfileService();

  constructor() {
    super();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router
      .all(`${this.path}*`, authMiddleware())
      .get(`${this.path}`, grantAccess({ action: READ_ALL, resource: PROFILES }), this.getAllProfiles)
      .get(`${this.path}/:id`, grantAccess({ action: READ_OWN, resource: PROFILES }), this.getProfileById)
      .post(`${this.path}`, grantAccess({ action: CREATE_ONE, resource: PROFILES }), this.createProfile)
      .delete(`${this.path}/:id`, grantAccess({ action: DELETE_ONE, resource: PROFILES }), this.deletePost)
      .put(`${this.path}/:id`, grantAccess({ action: UPDATE_ONE, resource: PROFILES }), this.modifyProfile);
  }

  private getAllProfiles = async (_req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
      const profiles = await this.profileService.list();
      res.status(OK).send(profiles);
    } catch (err) {
      next(err);
    }
  };

  private getProfileById = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    const { id } = req.params;

    try {
      const profile = await this.profileService.getById(id);
      res.status(OK).send(profile);
    } catch (err) {
      next(err);
    }
  };

  private createProfile = async (req: RequestWithUser, res: express.Response, next: express.NextFunction): Promise<void> => {
    const profileData: ProfileCreateRequestDto = req.body;

    try {
      const createdProfile = await this.profileService.create(profileData, req.user._id);
      res.status(OK).send(createdProfile);
    } catch (err) {
      next(err);
    }
  };

  private modifyProfile = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    const { id } = req.params;

    try {
      const profileData: ProfileUpdateRequestDto = req.body;
      const profile = await this.profileService.updateById(id, profileData);
      res.status(OK).send(profile);
    } catch (err) {
      next(err);
    }
  };

  private deletePost = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    const { id } = req.params;

    try {
      await this.profileService.deleteById(id);
      res.status(OK).send();
    } catch (err) {
      next(err);
    }
  };
}
