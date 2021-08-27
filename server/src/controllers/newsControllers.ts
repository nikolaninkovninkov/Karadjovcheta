import express from 'express';
import nanoid from '../lib/nanoid';
import ArticleModel from '../models/ArticleModel';
import ArticleData from '../types/ArticleData';
import DatabaseArticle from '../types/database/DatabaseArticle';
import roleToPermissions from '../utils/roleToPermissions';
import toClientArticle from '../utils/toClientArticle';
import toClientData from '../utils/toClientArticle';
const getAllClientArticles = async () => {
  const articles = await ArticleModel.find({ type: 'news' });
  const clientArticles = articles.map((a) => toClientArticle(a));
  return clientArticles;
};
async function getNews(req: express.Request, res: express.Response) {
  const newsArticles = await getAllClientArticles();
  res.status(200).json(newsArticles);
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
  const allArticles = await getAllClientArticles();
  res.status(200).json(allArticles);
}
export { getNews, createNewsArticle };
