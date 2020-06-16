import storeActions from '../store/store.actions';
import { Action } from '../interfaces/state/action.interface';
import { Dispatch } from 'react';
import ProductRestService, { ProductRestActions } from './rest/product.rest.service';
import { ProductsState } from '../interfaces/state/products-state.interface';

const { loadProducts, loadProductsFailed, loadProductsSuccess } = storeActions.products.Actions;

const getProducts = async (dispatch: Dispatch<any>): Promise<void | Action> => {
  dispatch(loadProducts());
  return await ProductRestService({ action: ProductRestActions.GET_ALL })
    .then((productData: { data: ProductsState }) => dispatch(loadProductsSuccess(productData.data)))
    .catch((_err: any) => dispatch(loadProductsFailed()));
};

const ProductService = { getProducts };
export default ProductService;
