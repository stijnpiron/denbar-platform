import { OK } from 'http-status-codes';
import express from 'express';
import ApiService from './api.service';
import Controller from '../../common/interfaces/controller.interface';

class ApiController implements Controller {
  public path = '/';
  public router = express.Router();
  private apiService = new ApiService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(this.path, this.catchAll);
  }

  private catchAll = async (_: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
      const response = this.apiService.catchAll();
      res.status(OK).send(response);
    } catch (err) {
      next(err);
    }
  };
}

export default ApiController;
