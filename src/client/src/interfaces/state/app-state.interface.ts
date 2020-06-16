import { ObjectState } from './state.interface';
import { MenuState } from './menu-state.interface';
import { AuthState } from './auth-state.interface';
import { ProductsState } from './products-state.interface';

export interface AppState {
  auth: ObjectState<AuthState>;
  menu: ObjectState<MenuState>;
  products: ObjectState<ProductsState>;
}
