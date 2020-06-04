export interface PermissionRules {
  [key: string]: {
    [key: string]: {
      granted: string[];
      check?: string[];
    };
  };
}
