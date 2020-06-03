import { ProductCreateDto, ProductUpdateDto } from './interfaces/product.interface';
import { OK } from 'http-status-codes';
import express from 'express';
import { Controller } from '../../common/interfaces/controller.interface';
import { authMiddleware } from '../../common/middlewares/auth.middleware';
import { ProductService } from './product.service';

export class ProductController extends Controller {
  public path = '/products';
  public router = express.Router();
  private productService = new ProductService();

  constructor() {
    super();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router
      .all(`${this.path}*`, authMiddleware())
      .get(`${this.path}`, this.getAllProducts)
      .get(`${this.path}/:id`, this.getProductById)
      .post(`${this.path}`, this.createProduct)
      .delete(`${this.path}/:id`, this.deletePost)
      .put(`${this.path}/:id`, this.modifyProduct);
  }

  private getAllProducts = async (_req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
      const products = await this.productService.list();
      res.status(OK).send(products);
    } catch (err) {
      next(err);
    }
  };

  private getProductById = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    const { id } = req.params;

    try {
      const product = await this.productService.getById(id);
      res.status(OK).send(product);
    } catch (err) {
      next(err);
    }
  };

  private createProduct = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    const productData: ProductCreateDto = req.body;

    try {
      const createdProduct = await this.productService.create(productData);
      res.status(OK).send(createdProduct);
    } catch (err) {
      next(err);
    }
  };

  private modifyProduct = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    const { id } = req.params;

    try {
      const productData: ProductUpdateDto = req.body;
      const product = await this.productService.updateById(id, productData);
      res.status(OK).send(product);
    } catch (err) {
      next(err);
    }
  };

  private deletePost = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    const { id } = req.params;

    try {
      await this.productService.deleteById(id);
      res.status(OK).send();
    } catch (err) {
      next(err);
    }
  };
}
