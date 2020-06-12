import { Error } from './../error.interface';
export interface LoadState<T> {
  loading?: boolean;
  loaded?: boolean;
  data?: T;
  error?: Error;
  success?: boolean;
  failed?: boolean;
  deleting?: boolean;
  deleted?: boolean;
  busy?: boolean;
}

export interface ObjectState<T> extends LoadState<T> {
  saving?: boolean;
  saved?: boolean;
}

export interface ArrayState<T> extends LoadState<T> {
  adding: boolean;
  added: boolean;
}
