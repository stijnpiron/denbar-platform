import { OK } from 'http-status-codes';
import express from 'express';
import { Controller } from '../../common/interfaces/controller.interface';
import { authMiddleware } from '../../common/middlewares/auth.middleware';
import { ProductService } from './product.service';

export class ProductController extends Controller {
  public path = '/product';
  public router = express.Router();
  private productService = new ProductService();

  constructor() {
    super();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.all(`${this.path}*`, authMiddleware()).get(`${this.path}`, this.getAllProducts);
  }

  private getAllProducts = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
    try {
      const products = await this.productService.list();
      res.status(OK).send(products);
    } catch (err) {
      next(err);
    }
  };
}
