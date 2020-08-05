import mongoose from 'mongoose';
import { Order } from '../interfaces/order.interface';

const orderQuantitySchema = new mongoose.Schema({
  delivered: { type: Number, required: true },
  returned: { type: Number, required: true },
});

const orderLineSchema = new mongoose.Schema({
  order: {
    ref: 'Order',
    type: mongoose.Types.ObjectId,
  },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  bottles: { type: orderQuantitySchema, required: true },
  crates: { type: orderQuantitySchema, required: true },
});

const statusInfoSchema = new mongoose.Schema({
  orderDate: { type: Date },
  inProgressDate: { type: Date },
  collectedDate: { type: Date },
  pickedUpDate: { type: Date },
  deliveredDate: { type: Date },
  paymentDate: { type: Date },
  closedDate: { type: Date },
});

const orderSchema = new mongoose.Schema(
  {
    reference: { type: String, required: true },
    archived: { type: Boolean, default: false },
    user: {
      ref: 'User',
      type: mongoose.Schema.Types.ObjectId,
    },
    info: {
      group: {
        ref: 'Group',
        type: mongoose.Schema.Types.ObjectId,
      },
      year: {
        ref: 'Year',
        type: mongoose.Schema.Types.ObjectId,
      },
      period: {
        ref: 'Period',
        type: mongoose.Schema.Types.ObjectId,
      },
    },
    statusInfo: { type: statusInfoSchema },
    status: {
      type: String,
      default: 'new',
      enum: ['new', 'in-progress', 'collected', 'ready-for-pickup', 'delivered', 'closed'],
    },
    lines: [{ type: orderLineSchema }],
    remarks: [{ type: String }],
  },
  { timestamps: true }
);

export const OrderModel = mongoose.model<Order & mongoose.Document>('Order', orderSchema);
