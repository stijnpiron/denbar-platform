import mongoose from 'mongoose';
import { User } from '../interfaces/user.interface';

const addressSchema = new mongoose.Schema({
  city: String,
  country: String,
  street: String,
});

const userSchema = new mongoose.Schema({
  address: addressSchema,
  email: String,
  name: String,
  group: {
    ref: 'Group',
    type: mongoose.Schema.Types.ObjectId,
  },
  role: { type: String, default: 'user', enum: ['user', 'admin', 'super'] },
  type: { type: String, default: 'normal', enum: ['normal', 'testrun'] },
  password: { type: String },
  twoFactorAuthenticationCode: String,
  isTwoFactorAuthenticationEnabled: Boolean,
});

export const UserModel = mongoose.model<User & mongoose.Document>('User', userSchema);
