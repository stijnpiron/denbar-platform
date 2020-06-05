import mongoose from 'mongoose';
import { Group } from '../interfaces/group.interface';

const groupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    active: { type: Boolean, default: false },
    createdBy: {
      ref: 'User',
      type: mongoose.Schema.Types.ObjectId,
    },
    alliance: {
      ref: 'Alliance',
      type: mongoose.Schema.Types.ObjectId,
    },
    profile: {
      ref: 'Profile',
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

export const GroupModel = mongoose.model<Group & mongoose.Document>('Group', groupSchema);
