import mongoose from 'mongoose';
import { Product } from '../interfaces/product.interface';

const productPackingSchema = new mongoose.Schema({
  quantity: { type: Number, required: true },
  size: { type: String, required: true },
});

const productStockSchema = new mongoose.Schema({
  inStock: { type: Number, required: true },
  minStock: { type: Number, required: true },
});

const productPriceSchema = new mongoose.Schema({
  sellPrice: { type: Number, required: true },
  singlePrice: { type: Number, required: true },
  year: { type: Number },
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    archived: { type: Boolean, default: false },
    category: { type: String, required: true },
    createdBy: {
      ref: 'User',
      type: mongoose.Schema.Types.ObjectId,
    },
    packing: { type: productPackingSchema, required: true },
    stock: { type: productStockSchema },
    price: { type: productPriceSchema },
    oldPrices: [productPriceSchema],
  },
  { timestamps: true }
);

export const ProductModel = mongoose.model<Product & mongoose.Document>('Product', productSchema);
