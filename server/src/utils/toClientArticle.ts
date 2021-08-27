import DatabaseArticle from '../types/database/DatabaseArticle';
import { Document } from 'mongoose';
export default async function (
  article: DatabaseArticle & Document<any, any, DatabaseArticle>,
) {
  const populated = await article.populate('author').execPopulate();
  console.log(populated);
}
