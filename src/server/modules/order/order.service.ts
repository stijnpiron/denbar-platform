import { OrderDeleteResponse } from './interfaces/responses/order-delete.response.interface';
import { OrderGetResponse } from './interfaces/responses/order-get.response.interface';
import { OrderUpdateResponse } from './interfaces/responses/order-update.response.interface';
import { INTERNAL_SERVER_ERROR, OK } from 'http-status-codes';
import { ServerErrorException } from '../../common/exceptions/server-error.exception';
import { OrderModel } from './models/order.model';
import { ServiceUnavailableException } from '../../common/exceptions/service-unavailable.exception';
import { CRUD } from '../../common/interfaces/crud.interface';
import { OrderListResponse } from './interfaces/responses/order-list.response.interface';
import { OrderNotFoundException } from './exceptions/order-not-found.exception';
import { OrderCreateResponse } from './interfaces/responses/order-create.response.interface';
import { OrderCreateRequestDto } from './dtos/requests/order-create.request.dto';
import { OrderCreateResponseDto } from './dtos/responses/order-create.response.dto';
import { OrderUpdateRequestDto } from './dtos/requests/order-update.request.dto';
import { OrderUpdateResponseDto } from './dtos/responses/order-update.response.dto';
import { OrderGetResponseDto } from './dtos/responses/order-get.response.dto';
import { OrderDeleteResponseDto } from './dtos/responses/order-delete.response.dto';

export class OrderService implements CRUD {
  private order = OrderModel;

  public list = async (limit?: number, page?: number): Promise<OrderListResponse> => {
    const orders = await this.order.find();

    const response: OrderListResponse = { statusCode: INTERNAL_SERVER_ERROR, message: 'Error occured when getting a list of orders', data: null };

    if (orders) {
      response.statusCode = OK;
      response.message = 'Get order list success';
      response.data = { orders, orderQuantity: orders.length };

      return response;
    }

    throw new ServiceUnavailableException('MongoDB');
  };

  public create = async (orderData: OrderCreateRequestDto, userId: string): Promise<OrderCreateResponse> => {
    const createdOrder = new this.order({
      ...orderData,
      createdBy: userId,
    });
    const savedOrder = (await createdOrder.save()) as OrderCreateResponseDto;

    const response: OrderCreateResponse = { statusCode: INTERNAL_SERVER_ERROR, message: 'Error occured when creating a new orders', data: null };

    if (savedOrder) {
      response.statusCode = OK;
      response.message = 'Order created success';
      response.data = savedOrder;

      return response;
    }
    throw new ServerErrorException('Error saving new order');
  };

  public updateById = async (id: string, orderData: OrderUpdateRequestDto): Promise<OrderUpdateResponse> => {
    const savedOrder = (await this.order.findByIdAndUpdate(id, orderData, { new: true })) as OrderUpdateResponseDto;

    const response: OrderUpdateResponse = { statusCode: INTERNAL_SERVER_ERROR, message: `Error occured while updating order with id ${id}` };

    if (savedOrder) {
      response.statusCode = OK;
      response.message = 'Order updated success';
      response.data = savedOrder;

      return response;
    }
    throw new OrderNotFoundException(id);
  };

  public getById = async (id: string): Promise<OrderGetResponse> => {
    const order = (await this.order.findById(id)) as OrderGetResponseDto;

    const response: OrderGetResponse = { statusCode: INTERNAL_SERVER_ERROR, message: `Error occured while getting order with id ${id}` };

    if (order) {
      response.statusCode = OK;
      response.message = 'Get order success';
      response.data = order;

      return response;
    }
    throw new OrderNotFoundException(id);
  };

  public deleteById = async (id: string): Promise<OrderDeleteResponse> => {
    const deleteResponse = (await this.order.findByIdAndDelete(id)) as OrderDeleteResponseDto;

    const response: OrderDeleteResponse = { statusCode: INTERNAL_SERVER_ERROR, message: `Error occured while deleting order with id ${id}` };

    if (deleteResponse) {
      response.statusCode = OK;
      response.message = `Order successfully deleted with id ${id}`;
      response.data = deleteResponse;

      return response;
    }
    throw new OrderNotFoundException(id);
  };
}
