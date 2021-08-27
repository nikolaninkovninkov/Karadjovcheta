import { model, Schema } from 'mongoose';
import nanoid from '../lib/nanoid';
import DatabaseArticle from '../types/database/DatabaseArticle';
import { v4 as uuid } from 'uuid';
const ArticleSchema = new Schema<DatabaseArticle>({
  id: {
    type: String,
    required: true,
    unique: true,
    default: () => nanoid(),
    immutable: true,
  },
  title: { type: String, required: true },
  content: { type: String, required: true },
  type: { type: String, required: true, enum: ['news'], immutable: true },
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    immutable: true,
    ref: 'User',
  },
});
export default model<DatabaseArticle>('Article', ArticleSchema);
