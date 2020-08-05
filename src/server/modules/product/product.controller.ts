import { RequestWithUser } from '../../common/interfaces/request-with-user.interface';
import { PermissionActions } from '../../common/middlewares/permission/enums/permission-actions.enum';
import { PermissionResource } from '../../common/middlewares/permission/enums/permission-resource.enum';
import { grantAccess } from '../../common/middlewares/permission/permission.middleware';
import { OK } from 'http-status-codes';
import express from 'express';
import { Controller } from '../../common/interfaces/controller.interface';
import { ProductService } from './product.service';
import { ProductCreateRequestDto } from './dtos/requests/product-create.request.dto';
import { ProductUpdateRequestDto } from './dtos/requests/product-update.request.dto';

const { PRODUCTS } = PermissionResource;
const { READ_ALL, READ_ONE, CREATE_ONE, DELETE_ONE, UPDATE_ONE } = PermissionActions;

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
      .get(`${this.path}`, grantAccess({ action: READ_ALL, resource: PRODUCTS }), this.getAllProducts)
      .get(`${this.path}/:id`, grantAccess({ action: READ_ONE, resource: PRODUCTS }), this.getProductById)
      .post(`${this.path}`, grantAccess({ action: CREATE_ONE, resource: PRODUCTS }), this.createProduct)
      .delete(`${this.path}/:id`, grantAccess({ action: DELETE_ONE, resource: PRODUCTS }), this.deleteProduct)
      .put(`${this.path}/:id`, grantAccess({ action: UPDATE_ONE, resource: PRODUCTS }), this.modifyProduct);
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

  private createProduct = async (req: RequestWithUser, res: express.Response, next: express.NextFunction): Promise<void> => {
    const productData: ProductCreateRequestDto = req.body;

    try {
      const createdProduct = await this.productService.create(productData, req.user._id);
      res.status(OK).send(createdProduct);
    } catch (err) {
      next(err);
    }
  };

  private modifyProduct = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    const { id } = req.params;

    try {
      const productData: ProductUpdateRequestDto = req.body;
      const product = await this.productService.updateById(id, productData);
      res.status(OK).send(product);
    } catch (err) {
      next(err);
    }
  };

  private deleteProduct = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    const { id } = req.params;

    try {
      await this.productService.deleteById(id);
      res.status(OK).send();
    } catch (err) {
      next(err);
    }
  };
}
