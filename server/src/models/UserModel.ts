import { Schema, model } from 'mongoose';
import DatabaseUser from '../types/database/DatabaseUser';
import nanoid from '../lib/nanoid';
// const { Embedded } = Schema.Types;
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
    uid: { type: String, required: true, unique: true, default: nanoid() },
    role: {
      type: String,
      required: true,
      enum: ['admin', 'user', 'moderator'],
      default: 'user',
    },
  },
  { timestamps: true },
);
export default model<DatabaseUser>('User', userSchema);
