export interface Error {
  code?: number;
  type?: string;
  message: string | null;
  object?: {};
}
