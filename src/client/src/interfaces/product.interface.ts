export interface Product {
  _id: string;
  name: string;
  category: string;
  packing: {
    quantity: number;
    size: string;
  };
}
