import express from 'express';
import nanoid from '../lib/nanoid';
import ArticleModel from '../models/ArticleModel';
import UserModel from '../models/UserModel';
import ArticleData from '../types/ArticleData';
import DatabaseArticle from '../types/database/DatabaseArticle';
import DatabaseUser from '../types/database/DatabaseUser';
import roleToPermissions from '../utils/roleToPermissions';
import toClientArticle from '../utils/toClientArticle';
import { Document } from 'mongoose';
const toClientArticles = async (
  articles: Array<DatabaseArticle & Document<any, any, DatabaseArticle>>,
) => {
  const clientArticles = await ArticleModel.populate(articles, 'author');
  return clientArticles.map(toClientArticle);
};
async function getNews(req: express.Request, res: express.Response) {
  const params = req.query as {
    limit: string | undefined;
    offset: string | undefined;
  };
  if (!params.limit || !params.offset) {
    return res.status(400).json({ message: 'Limit and offset invalid' });
  }
  const [limit, offset] = [parseInt(params.limit), parseInt(params.offset)];
  const articleCount = await ArticleModel.countDocuments();
  if (offset >= articleCount) {
    return res.json([]);
  }
  const articles = await ArticleModel.find({ type: 'news' })
    .sort({
      dateCreated: -1,
    })
    .limit(limit)
    .skip(offset);
  const newsArticles = await toClientArticles(articles);
  res.status(200).json({ newsArticles, totalArticleCount: articleCount });
}
async function createNewsArticle(req: express.Request, res: express.Response) {
  const user = req.user;
  if (!user) return;
  const permissions = roleToPermissions(user.role);
  if (!permissions.news.canPost) {
    return res.status(400).json({ message: 'Insufficient permissions' });
  }
  const articleData = req.body as ArticleData;
  const article = new ArticleModel({
    type: 'news',
    author: user._id,
    ...articleData,
  });
  const savedArticle = await article.save();
  const populated = await ArticleModel.populate(savedArticle, 'author');
  res.status(200).json(toClientArticle(populated));
}
export { getNews, createNewsArticle };
