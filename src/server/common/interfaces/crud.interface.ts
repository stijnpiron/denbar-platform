import { Response } from './response-object.interface';

export interface CRUD {
  list: (limit?: number, page?: number) => Promise<Response>;
  create?: (resource: any, userId: any) => Promise<Response>;
  updateById: (id: any, resource: any) => Promise<Response>;
  getById: (id: any) => Promise<Response>;
  deleteById?: (id: any) => Promise<Response>;
}
