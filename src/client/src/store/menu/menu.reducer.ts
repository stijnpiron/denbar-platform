import { ObjectState } from './../../interfaces/state/state.interface';
import * as actions from './menu.actions';
import { MenuState } from '../../interfaces/state/menu-state.interface';
import { Action } from '../../interfaces/state/action.interface';

export const initialState: ObjectState<MenuState> = {
  data: { menuCollapsed: true },
};

const { MENU_COLLAPSE, MENU_FOLD_OUT } = actions;

const menuReducer = (state: ObjectState<MenuState> = initialState, action: Action): ObjectState<MenuState> => {
  const { type } = action;
  switch (type) {
    case MENU_COLLAPSE:
      return menuCollapse(state);
    case MENU_FOLD_OUT:
      return menuFoldOut(state);
    default:
      return state;
  }
};

const menuCollapse = (state: ObjectState<MenuState>): ObjectState<MenuState> => ({
  ...state,
  data: {
    menuCollapsed: true,
  },
});

const menuFoldOut = (state: ObjectState<MenuState>): ObjectState<MenuState> => ({
  ...state,
  data: {
    menuCollapsed: false,
  },
});

export default menuReducer;
