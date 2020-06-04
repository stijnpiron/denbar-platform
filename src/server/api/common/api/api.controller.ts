import { OK } from 'http-status-codes';
import express from 'express';
import { ApiService } from './api.service';
import { Controller } from '../../../common/interfaces/controller.interface';

export class ApiController extends Controller {
  public path = '/';
  public router = express.Router();
  private apiService = new ApiService();

  constructor() {
    super();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(this.path, this.catchAll);
  }

  private catchAll = async (_req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
      const response = this.apiService.catchAll();
      res.status(OK).send(response);
    } catch (err) {
      next(err);
    }
  };
}
