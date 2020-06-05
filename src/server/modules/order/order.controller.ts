import { RequestWithUser } from '../../common/interfaces/request-with-user.interface';
import { PermissionActions } from '../../common/middlewares/permission/enums/permission-actions.enum';
import { PermissionResource } from '../../common/middlewares/permission/enums/permission-resource.enum';
import { grantAccess } from '../../common/middlewares/permission/permission.middleware';
import { OK } from 'http-status-codes';
import express from 'express';
import { Controller } from '../../common/interfaces/controller.interface';
import { authMiddleware } from '../../common/middlewares/auth.middleware';
import { OrderService } from './order.service';
import { OrderCreateRequestDto } from './dtos/requests/order-create.request.dto';
import { OrderUpdateRequestDto } from './dtos/requests/order-update.request.dto';

const { ORDERS } = PermissionResource;
const { READALL, READOWN, CREATEONE, DELETEONE, UPDATEONE } = PermissionActions;

export class OrderController extends Controller {
  public path = '/orders';
  public router = express.Router();
  private orderService = new OrderService();

  constructor() {
    super();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router
      .all(`${this.path}*`, authMiddleware())
      .get(`${this.path}`, grantAccess(READALL, ORDERS), this.getAllOrders)
      .get(`${this.path}/:id`, grantAccess(READOWN, ORDERS), this.getOrderById)
      .post(`${this.path}`, grantAccess(CREATEONE, ORDERS), this.createOrder)
      .delete(`${this.path}/:id`, grantAccess(DELETEONE, ORDERS), this.deleteOrder)
      .put(`${this.path}/:id`, grantAccess(UPDATEONE, ORDERS), this.modifyOrder);
  }

  private getAllOrders = async (_req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
      const orders = await this.orderService.list();
      res.status(OK).send(orders);
    } catch (err) {
      next(err);
    }
  };

  private getOrderById = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    const { id } = req.params;

    try {
      const order = await this.orderService.getById(id);
      res.status(OK).send(order);
    } catch (err) {
      next(err);
    }
  };

  private createOrder = async (req: RequestWithUser, res: express.Response, next: express.NextFunction): Promise<void> => {
    const orderData: OrderCreateRequestDto = req.body;

    try {
      const createdOrder = await this.orderService.create(orderData, req.user._id);
      res.status(OK).send(createdOrder);
    } catch (err) {
      next(err);
    }
  };

  private modifyOrder = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    const { id } = req.params;

    try {
      const orderData: OrderUpdateRequestDto = req.body;
      const order = await this.orderService.updateById(id, orderData);
      res.status(OK).send(order);
    } catch (err) {
      next(err);
    }
  };

  private deleteOrder = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    const { id } = req.params;

    try {
      await this.orderService.deleteById(id);
      res.status(OK).send();
    } catch (err) {
      next(err);
    }
  };
}
