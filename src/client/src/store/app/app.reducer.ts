import * as actions from './app.actions';
import { AppState } from '../../interfaces/state/app-state.interface';
import { Action } from '../../interfaces/state/action.interface';

// TODO: create initial app state
export const initialState: AppState = {
  menuCollapsed: true,
};

const app = (state = initialState, action: Action): AppState => {
  switch (action.type) {
    case actions.APP_MENU_COLLAPSE:
      return menuCollapse(state);
    case actions.APP_MENU_FOLD_OUT:
      return menuFoldOut(state);
    default:
      return state;
  }
};

const menuCollapse = (state: AppState): AppState => ({ ...state, menuCollapsed: true });

const menuFoldOut = (state: AppState): AppState => ({ ...state, menuCollapsed: false });

export default app;
