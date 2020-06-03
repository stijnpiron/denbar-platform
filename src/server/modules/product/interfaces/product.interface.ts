import { ProductCategory } from '../enums/product-category.enum';
import { PackingSize } from '../enums/packing-size.enum';

export interface Product extends ProductRequired {
  oldPrices: ProductPrice[];
}

interface ProductBasics {
  name: string;
  active: boolean;
}

interface ProductRequired extends ProductOptional {
  name: string;
  category: ProductCategory;
}

interface ProductOptional extends ProductBasics {
  createdAt?: Date;
  lastEdited?: Date;
  category?: ProductCategory;
  packing?: ProductPacking;
  stock?: ProductStock;
  price?: ProductPrice;
}

export type ProductResponseDto = ProductRequired;

export interface ProductCreateResponseDto extends ProductOptional {
  name: string;
  active: boolean;
  createdAt: Date;
}

export interface ProductCreateDto extends ProductBasics {
  createdAt: Date;
}

export interface ProductUpdateResponseDto extends ProductOptional {
  name: string;
  active: boolean;
  createdAt: Date;
  lastEdited: Date;
}

export type ProductUpdateDto = ProductOptional;

export interface ProductGetResponseDto extends ProductOptional {
  name: string;
  active: boolean;
  createdAt: Date;
}

export type ProductDeleteResponseDto = ProductBasics;

interface ProductPacking {
  quantity: number;
  size: PackingSize;
}

interface ProductPrice {
  sellPrice: number;
  singlePrice: number;
  year?: number;
}

interface ProductStock {
  inStock: number;
  minStock: number;
}
