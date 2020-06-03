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
  role: { type: String, default: 'user', enum: ['user', 'admin', 'super'] },
  password: { type: String },
  twoFactorAuthenticationCode: String,
  isTwoFactorAuthenticationEnabled: Boolean,
});

export const userModel = mongoose.model<User & mongoose.Document>('User', userSchema);
