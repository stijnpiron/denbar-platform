import { ProductsState } from '../interfaces/state/products-state.interface';
import api from '../utils/api';

export default class ProductRestService {
  private basePath = '/products';

  public getProducts = () => api.get<{ data: ProductsState }>(`${this.basePath}`).then((res) => res.data);
}
