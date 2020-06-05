import mongoose from 'mongoose';
import { Year } from '../interfaces/year.interface';

const groupSchema = new mongoose.Schema(
  {
    year: { type: Number, required: true },
    active: { type: Boolean, default: false },
    createdBy: {
      ref: 'User',
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

export const YearModel = mongoose.model<Year & mongoose.Document>('Year', groupSchema);
