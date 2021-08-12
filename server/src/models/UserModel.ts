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
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);
export default model<DatabaseUser>('User', userSchema);
