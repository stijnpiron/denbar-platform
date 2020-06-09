import mongoose from 'mongoose';
import { Period } from '../interfaces/period.interface';

export const periodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    archived: { type: Boolean, default: false },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  { timestamps: true }
);

export const PeriodModel = mongoose.model<Period & mongoose.Document>('Period', periodSchema);
