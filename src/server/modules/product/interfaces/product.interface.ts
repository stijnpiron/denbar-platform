export interface Product {
  name: string;
  active: boolean;
  category: ProductCategory;
  packing: ProductPacking;
  stock: ProductStock;
  price: ProductPrice;
  oldPrices: ProductPrice[];
}

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

enum PackingSize {
  SMALL = 'small',
  BIG = 'big',
}

enum ProductCategory {
  SODA_SMALL = 'soda_small',
}
