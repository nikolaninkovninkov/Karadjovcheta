import { Schema, model } from 'mongoose';
import DatabaseUser from '../types/database/DatabaseUser';
import nanoid from '../utils/nanoid';
const { Buffer } = Schema.Types;
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
    uid: { type: String, required: true, unique: true, default: nanoid() },
    // profileImage: { data: Buffer, contentType: String },
  },
  { timestamps: true },
);
export default model<DatabaseUser>('User', userSchema);
