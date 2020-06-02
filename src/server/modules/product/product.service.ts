import { ProductModel } from './models/product.model';
import { Product } from './interfaces/product.interface';
import { ServiceUnavailableException } from '../../common/exceptions/service-unavailable.exception';
import { CRUD } from 'server/common/interfaces/crud.interface';

export class ProductService implements CRUD {
  private product = ProductModel;

  public list = async (limit?: number, page?: number): Promise<Product[]> => {
    const products = await this.product.find();

    if (products) return products;

    throw new ServiceUnavailableException('MongoDB');
  };

  create: (resource: any) => string;
  updateById: (resourceId: any) => string;
  readById: (resourceId: any) => any;
  deleteById: (resourceId: any) => string;
  patchById: (resourceId: any) => string;
}
