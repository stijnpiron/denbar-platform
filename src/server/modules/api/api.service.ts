import CatchAll from './interfaces/catch-all.interface';

class ApiService {
  public catchAll = (): CatchAll => ({ message: 'API is up and running, go to "/swagger" to get the API documentation' });
}

export default ApiService;
