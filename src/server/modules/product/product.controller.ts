import express from 'express';
import Controller from '../../common/interfaces/controller.interface';
import authMiddleware from '../../common/middlewares/auth.middleware';
import ProductService from './product.service';

class ProductController implements Controller {
  public path = '/product';
  public router = express.Router();
  private productService = new ProductService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.all(`${this.path}*`, authMiddleware()).get(`${this.path}`, this.getAllProducts);
  }

  private getAllProducts = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
    // TODO: implement getAllProducts
  };
}

export default ProductController;
