import { PermissionRoles } from './enums/permission-roles.enum';
import { PermissionResource } from './enums/permission-resource.enum';
import { PermissionActions } from './enums/permission-actions.enum';
import { PermissionRules } from './interfaces/permission-rules.interface';

const { ALLIANCES, AUTH, GROUPS, ORDERS, PERIODS, PRODUCTS, PROFILES, USERS, YEARS } = PermissionResource;
const { CHECK_AUTH, CREATE_ONE, DELETE_ONE, READ_ALL, READ_ONE, READ_OWN, UPDATE_ONE, UPDATE_OWN, TFA } = PermissionActions;
const { ADMIN, SUPER, USER, GUEST } = PermissionRoles;

export const permissions: PermissionRules = {
  [AUTH]: {
    [TFA]: { granted: [USER, ADMIN, SUPER] },
    [CHECK_AUTH]: { granted: [USER, ADMIN, SUPER] },
  },
  [ALLIANCES]: {
    [READ_ALL]: { granted: [USER, ADMIN, SUPER] },
    [READ_ONE]: { granted: [USER, ADMIN, SUPER] },
    [CREATE_ONE]: { granted: [ADMIN, SUPER] },
    [DELETE_ONE]: { granted: [ADMIN, SUPER] },
    [UPDATE_ONE]: { granted: [ADMIN, SUPER] },
  },
  [GROUPS]: {
    [READ_ALL]: { granted: [USER, ADMIN, SUPER, GUEST] },
    [READ_ONE]: { granted: [USER, ADMIN, SUPER] },
    [CREATE_ONE]: { granted: [ADMIN, SUPER] },
    [DELETE_ONE]: { granted: [ADMIN, SUPER] },
    [UPDATE_ONE]: { granted: [ADMIN, SUPER] },
  },
  [ORDERS]: {
    [READ_ALL]: { granted: [ADMIN, SUPER] },
    [READ_ONE]: { granted: [ADMIN, SUPER] },
    [READ_OWN]: { granted: [USER, ADMIN, SUPER], check: [USER] },
    [CREATE_ONE]: { granted: [USER, ADMIN, SUPER] },
    [DELETE_ONE]: { granted: [ADMIN, SUPER] },
    [UPDATE_ONE]: { granted: [ADMIN, SUPER] },
    [UPDATE_OWN]: { granted: [USER, ADMIN, SUPER], check: [USER] },
  },
  [PERIODS]: {
    [READ_ALL]: { granted: [USER, ADMIN, SUPER] },
    [READ_ONE]: { granted: [USER, ADMIN, SUPER] },
    [CREATE_ONE]: { granted: [ADMIN, SUPER] },
    [DELETE_ONE]: { granted: [ADMIN, SUPER] },
    [UPDATE_ONE]: { granted: [ADMIN, SUPER] },
  },
  [PRODUCTS]: {
    [READ_ALL]: { granted: [USER, ADMIN, SUPER] },
    [READ_ONE]: { granted: [USER, ADMIN, SUPER] },
    [CREATE_ONE]: { granted: [ADMIN, SUPER] },
    [DELETE_ONE]: { granted: [ADMIN, SUPER] },
    [UPDATE_ONE]: { granted: [ADMIN, SUPER] },
  },
  [PROFILES]: {
    [READ_ALL]: { granted: [USER, ADMIN, SUPER] },
    [READ_ONE]: { granted: [USER, ADMIN, SUPER] },
    [CREATE_ONE]: { granted: [ADMIN, SUPER] },
    [DELETE_ONE]: { granted: [ADMIN, SUPER] },
    [UPDATE_ONE]: { granted: [ADMIN, SUPER] },
  },
  [USERS]: {
    [READ_ALL]: { granted: [ADMIN, SUPER] },
    [READ_ONE]: { granted: [ADMIN, SUPER] },
    [READ_OWN]: { granted: [USER, ADMIN, SUPER], check: [USER] },
    [CREATE_ONE]: { granted: [ADMIN, SUPER] },
    [DELETE_ONE]: { granted: [ADMIN, SUPER] },
    [UPDATE_ONE]: { granted: [ADMIN, SUPER] },
  },
  [YEARS]: {
    [READ_ALL]: { granted: [USER, ADMIN, SUPER] },
    [READ_ONE]: { granted: [USER, ADMIN, SUPER] },
    [CREATE_ONE]: { granted: [ADMIN, SUPER] },
    [DELETE_ONE]: { granted: [ADMIN, SUPER] },
    [UPDATE_ONE]: { granted: [ADMIN, SUPER] },
  },
};
