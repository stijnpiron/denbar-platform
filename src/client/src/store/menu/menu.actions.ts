import { Action } from '../../interfaces/state/action.interface';

export const MENU_COLLAPSE = 'MENU_COLLAPSE';
export const MENU_FOLD_OUT = 'MENU_FOLD_OUT';

const menuCollapse = (): Action => ({ type: MENU_COLLAPSE });
const menuFoldOut = (): Action => ({ type: MENU_FOLD_OUT });

export const Actions = { menuCollapse, menuFoldOut };
