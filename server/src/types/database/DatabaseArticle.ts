export default interface DatabaseArticle {
  _id: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  title: string;
  type: 'news';
  author: string;
}
