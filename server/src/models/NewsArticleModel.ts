import { model, Schema } from 'mongoose';
import nanoid from '../lib/nanoid';
import DatabaseNewsArticle from '../types/database/DatabaseNewsArticle';
import { v4 as uuid } from 'uuid';
const NewsArticleSchema = new Schema<DatabaseNewsArticle>({
  id: {
    type: String,
    required: true,
    unique: true,
    default: nanoid,
    immutable: true,
  },
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    immutable: true,
    ref: 'User',
  },
  dateCreated: {
    type: Number,
    required: true,
    default: Date.now,
    immutable: true,
  },
});
export default model<DatabaseNewsArticle>('NewsArticle', NewsArticleSchema);
