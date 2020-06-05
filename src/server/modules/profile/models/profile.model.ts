import mongoose from 'mongoose';
import { Profile } from '../interfaces/profile.interface';

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    active: { type: Boolean, default: false },
    createdBy: {
      ref: 'User',
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

export const ProfileModel = mongoose.model<Profile & mongoose.Document>('Profile', profileSchema);
