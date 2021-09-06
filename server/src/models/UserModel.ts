import { Schema, model } from 'mongoose';
import DatabaseUser from '../types/database/DatabaseUser';
const userSchema = new Schema<DatabaseUser>(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      immutable: true,
    },
    email: { type: String, required: true, unique: true, immutable: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ['admin', 'user', 'class-member', 'moderator-class-member'],
      default: 'user',
    },
  },
  { timestamps: true },
);
export default model<DatabaseUser>('User', userSchema);
