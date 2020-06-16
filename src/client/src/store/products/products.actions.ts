import { Action } from '../../interfaces/state/action.interface';
import { ProductsState } from '../../interfaces/state/products-state.interface';

export const PRODUCTS_LOAD = 'PRODUCTS_LOAD';
export const PRODUCTS_LOAD_FAILED = 'PRODUCTS_LOAD_FAILED';
export const PRODUCTS_LOAD_SUCCESS = 'PRODUCTS_LOAD_SUCCESS';

const loadProducts = (): Action => ({ type: PRODUCTS_LOAD });
const loadProductsFailed = (): Action => ({ type: PRODUCTS_LOAD_FAILED });
const loadProductsSuccess = (payload: ProductsState): Action => ({ type: PRODUCTS_LOAD_SUCCESS, payload });

export const Actions = { loadProducts, loadProductsFailed, loadProductsSuccess };
