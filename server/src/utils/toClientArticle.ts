import DatabaseArticle from '../types/database/DatabaseArticle';
import { Document } from 'mongoose';
import DatabaseUser from '../types/database/DatabaseUser';
import toClientUser from './toClientUser';
export default function (
  article: DatabaseArticle & Document<any, any, DatabaseArticle>,
) {
  const { __v, _id, author, ...clientArticle } = (article as any)
    ._doc as DatabaseArticle;
  return { author: toClientUser(author as any, false), ...clientArticle };
}
