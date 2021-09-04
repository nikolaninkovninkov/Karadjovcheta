import { Document } from 'mongoose';
import DatabaseNewsArticle from './DatabaseNewsArticle';
import DatabaseUser from './DatabaseUser';

type PopulatedNewsArticle = Omit<DatabaseNewsArticle, 'author'> & {
  author: Document<any, any, DatabaseUser> & DatabaseUser;
};
export default PopulatedNewsArticle;
