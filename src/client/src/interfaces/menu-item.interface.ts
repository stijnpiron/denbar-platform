export interface MenuItem {
  id: string;
  icon: JSX.Element;
  route?: string;
  action?(): void;
  text: string;
  state: string;
  toggleOpen?(): void;
}
