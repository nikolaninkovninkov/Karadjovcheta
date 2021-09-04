import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import NewsArticleData from '../types/requests/NewsArticleData';
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

async function postNewsArticle(articleData: NewsArticleData, token: string) {
  const axiosRequestConfig: AxiosRequestConfig = {
    url: '/api/news',
    method: 'POST',
    data: articleData,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const response = await axios(axiosRequestConfig);
  return response as AxiosResponse<Article[]>;
}
export { getNewsArticles, postNewsArticle };
