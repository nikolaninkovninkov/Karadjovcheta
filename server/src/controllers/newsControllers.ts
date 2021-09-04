import express from 'express';
import NewsArticleModel from '../models/NewsArticleModel';
import ArticleData from '../types/ArticleData';
import DatabaseUser from '../types/database/DatabaseUser';
import roleToPermissions from '../utils/roleToPermissions';
import { Document } from 'mongoose';
import { validationResult } from 'express-validator';
import toClientUser from '../utils/toClientUser';
import PopulatedNewsArticle from '../types/database/PopulatedNewsArticle';

async function getNews(req: express.Request, res: express.Response) {
  const params = req.query as {
    limit: string | undefined;
    offset: string | undefined;
    id?: string;
  };
  if (!params.limit || !params.offset) {
    return res.status(400).json({ message: 'Limit and offset invalid' });
  }
  const [limit, offset] = [parseInt(params.limit), parseInt(params.offset)];
  const articleCount = await NewsArticleModel.countDocuments();
  if (offset >= articleCount) {
    return res.json([]);
  }
  const articles = await NewsArticleModel.find(
    params.id ? { type: 'news', id: params.id } : { type: 'news' },
  )
    .sort({
      dateCreated: -1,
    })
    .limit(limit)
    .skip(offset)
    .populate('author')
    .lean();
  // const populated = (await NewsArticleModel.populate(
  //   articles,
  //   'author',
  // )) as unknown as Array<
  //   Document<any, any, PopulatedNewsArticle> & PopulatedNewsArticle
  // >;
  res.status(200).json({
    newsArticles: articles.map((article) => {
      return {
        ...article,
        author: toClientUser(
          article.author as unknown as Document<any, any, DatabaseUser> &
            DatabaseUser,
          false,
        ),
      };
    }),
    totalArticleCount: articleCount,
  });
}
async function createNewsArticle(req: express.Request, res: express.Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json(errors);
  }
  const user = req.user;
  if (!user) return;
  const permissions = roleToPermissions(user.role);
  if (!permissions.news.canPost) {
    return res.status(400).json({ message: 'Insufficient permissions' });
  }
  const articleData = req.body as ArticleData;
  const article = new NewsArticleModel({
    type: 'news',
    author: user._id,
    ...articleData,
  });
  const savedArticle = await article.save();
  const populated = (
    await NewsArticleModel.populate(savedArticle, 'author')
  ).toObject() as unknown as PopulatedNewsArticle;
  res.status(200).json({
    ...populated,
    author: toClientUser(populated.author, false),
  });
}
export { getNews, createNewsArticle };
