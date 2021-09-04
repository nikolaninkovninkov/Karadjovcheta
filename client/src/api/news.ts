import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import ArticleData from '../types/requests/ArticleData';
import Article from '../types/responses/Article';

async function getNewsArticles(limit: number, offset: number, id?: string) {
  const axiosRequestConfig: AxiosRequestConfig = {
    url: '/api/news',
    method: 'GET',
    params: { limit, offset, id },
  };
  const response = await axios(axiosRequestConfig);
  return response as AxiosResponse<{
    newsArticles: Article[];
    totalArticleCount: number;
  }>;
}

async function postNewsArticle(articleData: ArticleData) {
  const axiosRequestConfig: AxiosRequestConfig = {
    url: '/api/news',
    method: 'POST',
    data: articleData,
  };
  const response = await axios(axiosRequestConfig);
  return response as AxiosResponse<Article[]>;
}
export { getNewsArticles, postNewsArticle };
