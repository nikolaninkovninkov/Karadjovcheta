import { Schema, model } from 'mongoose';
import nanoid from '../lib/nanoid';
import DatabaseVoteItem from '../types/database/DatabaseVoteItem';
const userSchema = new Schema<DatabaseVoteItem>(
  {
    name: {
      type: String,
      required: true,
    },
    rating: { type: Number, required: true, default: 0 },
    id: {
      type: String,
      required: true,
      default: nanoid,
      unique: true,
      immutable: true,
    },
  },
  { timestamps: true },
);
export default model<DatabaseVoteItem>('VoteItem', userSchema);
