import { Action } from '../../interfaces/state/action.interface';

export const APP_MENU_COLLAPSE = 'APP_MENU_COLLAPSE';
export const APP_MENU_FOLD_OUT = 'APP_MENU_FOLD_OUT';

const menuCollapse = (): Action => ({ type: APP_MENU_COLLAPSE });
const menuFoldOut = (): Action => ({ type: APP_MENU_FOLD_OUT });

export const Actions = { menuCollapse, menuFoldOut };
