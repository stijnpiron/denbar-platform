import { ObjectState } from '../../interfaces/state/state.interface';
import * as actions from './products.actions';
import { Action } from '../../interfaces/state/action.interface';
import { ProductsState } from '../../interfaces/state/products-state.interface';

export const initialState: ObjectState<ProductsState> = {
  data: {},
};

const { PRODUCTS_LOAD, PRODUCTS_LOAD_FAILED, PRODUCTS_LOAD_SUCCESS } = actions;

const productsReducer = (state: ObjectState<ProductsState> = initialState, action: Action): ObjectState<ProductsState> => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCTS_LOAD:
      return loadProducts(state);
    case PRODUCTS_LOAD_FAILED:
      return loadProductsFailed(state);
    case PRODUCTS_LOAD_SUCCESS:
      return loadProductsSuccess(state, payload as ProductsState);
    default:
      return state;
  }
};

const loadProducts = (state: ObjectState<ProductsState>): ObjectState<ProductsState> => ({
  ...state,
  data: {},
});

const loadProductsFailed = (state: ObjectState<ProductsState>): ObjectState<ProductsState> => ({
  ...state,
  data: {},
});

const loadProductsSuccess = (state: ObjectState<ProductsState>, data: ProductsState): ObjectState<ProductsState> => ({
  ...state,
  data,
});

export default productsReducer;
