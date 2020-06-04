import { CatchAll } from './interfaces/catch-all.interface';

export class ApiService {
  public catchAll = (): CatchAll => ({ message: 'API is up and running, go to "/swagger" to get the API documentation' });
}
