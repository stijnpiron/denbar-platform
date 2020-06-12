import BaseRestService from './rest.service';

export default class ProductRestService extends BaseRestService {
  public constructor() {
    super('/products');
  }

  public getProducts = () => this.instance.get<any[]>('');
}
