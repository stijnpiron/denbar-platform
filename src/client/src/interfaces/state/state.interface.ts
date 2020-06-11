import { AppState } from './app-state.interface';
import { UserState } from './user-state.interface';

export interface State {
  app: AppState;
  user: UserState;
}
