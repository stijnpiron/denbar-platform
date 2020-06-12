import { ObjectState } from './state.interface';
import { MenuState } from './menu-state.interface';
import { AuthData } from './auth-data.interface';

export interface AppState {
  menu: ObjectState<MenuState>;
  auth: ObjectState<AuthData>;
}
