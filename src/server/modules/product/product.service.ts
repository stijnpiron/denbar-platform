import { ProductDeleteResponse } from './interfaces/product-delete.response.interface';
import { ProductGetResponse } from './interfaces/product-get.response.interface';
import { ProductUpdateResponse } from './interfaces/product-update.response.interface';
import { INTERNAL_SERVER_ERROR, OK } from 'http-status-codes';
import { ServerErrorException } from './../../common/exceptions/server-error.exception';
import { ProductModel } from './models/product.model';
import {
  ProductCreateDto,
  ProductCreateResponseDto,
  ProductDeleteResponseDto,
  ProductGetResponseDto,
  ProductUpdateDto,
  ProductUpdateResponseDto,
} from './interfaces/product.interface';
import { ServiceUnavailableException } from '../../common/exceptions/service-unavailable.exception';
import { CRUD } from '../../common/interfaces/crud.interface';
import { ProductListResponse } from './interfaces/product-list.response.interface';
import { ProductNotFoundException } from '../../common/exceptions/product-not-found.exception';
import { ProductCreateResponse } from './interfaces/product-create.response.interface';

export class ProductService implements CRUD {
  private product = ProductModel;

  public list = async (limit?: number, page?: number): Promise<ProductListResponse> => {
    const products = await this.product.find();

    const response: ProductListResponse = { statusCode: INTERNAL_SERVER_ERROR, message: 'Error occured when getting a list of products', data: null };

    if (products) {
      response.statusCode = OK;
      response.message = 'Get product list success';
      response.data = { products, productQuantity: products.length };

      return response;
    }

    throw new ServiceUnavailableException('MongoDB');
  };

  public create = async (productData: ProductCreateDto, userId: string): Promise<ProductCreateResponse> => {
    const createdProduct = new this.product({
      ...productData,
      createdBy: userId,
    });
    const savedProduct = (await createdProduct.save()) as ProductCreateResponseDto;

    const response: ProductCreateResponse = { statusCode: INTERNAL_SERVER_ERROR, message: 'Error occured when creating a new products', data: null };

    if (savedProduct) {
      response.statusCode = OK;
      response.message = 'Product created success';
      response.data = savedProduct;

      return response;
    }
    throw new ServerErrorException('Error saving new product');
  };

  public updateById = async (id: string, productData: ProductUpdateDto): Promise<ProductUpdateResponse> => {
    const savedProduct = (await this.product.findByIdAndUpdate(id, productData, { new: true })) as ProductUpdateResponseDto;

    const response: ProductUpdateResponse = { statusCode: INTERNAL_SERVER_ERROR, message: `Error occured while updating product with id ${id}` };

    if (savedProduct) {
      response.statusCode = OK;
      response.message = 'Product updated success';
      response.data = savedProduct;

      return response;
    }
    throw new ProductNotFoundException(id);
  };

  public getById = async (id: string): Promise<ProductGetResponse> => {
    const product = (await this.product.findById(id)) as ProductGetResponseDto;

    const response: ProductGetResponse = { statusCode: INTERNAL_SERVER_ERROR, message: `Error occured while getting product with id ${id}` };

    if (product) {
      response.statusCode = OK;
      response.message = 'Get product success';
      response.data = product;

      return response;
    }
    throw new ProductNotFoundException(id);
  };

  public deleteById = async (id: string): Promise<ProductDeleteResponse> => {
    const deleteResponse = (await this.product.findByIdAndDelete(id)) as ProductDeleteResponseDto;

    const response: ProductDeleteResponse = { statusCode: INTERNAL_SERVER_ERROR, message: `Error occured while deleting product with id ${id}` };

    if (deleteResponse) {
      response.statusCode = OK;
      response.message = `Product successfully deleted with id ${id}`;
      response.data = deleteResponse;

      return response;
    }
    throw new ProductNotFoundException(id);
  };
}
