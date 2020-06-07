import mongoose from 'mongoose';
import { Alliance } from '../interfaces/alliance.interface';

export const allianceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

export const AllianceModel = mongoose.model<Alliance & mongoose.Document>('Alliance', allianceSchema);
