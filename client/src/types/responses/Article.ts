import ArticleType from './ArticleType';
import User from './User';
export default interface Article {
  author: User;
  type: ArticleType;
  title: string;
  content: string;
  id: string;
  dateCreated: number;
}
