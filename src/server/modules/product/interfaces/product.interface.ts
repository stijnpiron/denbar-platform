import { Resource } from '../../../common/interfaces/resource.interface';
import { ProductCategory } from '../enums/product-category.enum';
import { ProductPacking } from './product-packing.interface';
import { ProductPrice } from './product-price.interface';
import { ProductStock } from './product-stock.interface';

export interface Product extends ProductRequired {
  oldPrices: ProductPrice[];
}

interface ProductBasics extends Resource {
  name: string;
  active: boolean;
}

export interface ProductRequired extends ProductOptional {
  name: string;
  category: ProductCategory;
}

export interface ProductOptional extends ProductBasics {
  lastEdited?: Date;
  category?: ProductCategory;
  packing?: ProductPacking;
  stock?: ProductStock;
  price?: ProductPrice;
}
