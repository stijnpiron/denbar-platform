import { ProductsState } from '../../interfaces/state/products-state.interface';
import api from '../../utils/api';

export enum ProductRestActions {
  GET_ALL = 'get_all',
}

const basePath = '/products';

const getProducts = () => api.get<{ data: ProductsState }>(`${basePath}`).then((res) => res.data);

const ProductRestService = (action: string, path?: string): any => {
  switch (action) {
    case ProductRestActions.GET_ALL:
      return getProducts();
  }
};

export default ProductRestService;
