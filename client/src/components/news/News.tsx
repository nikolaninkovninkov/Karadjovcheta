import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import * as newsApi from '../../api/news';
import useAuth from '../../hooks/useAuth';
import NewsArticleData from '../../types/requests/NewsArticleData';
import Article from '../../types/responses/Article';
import Pagination from '../layout/Pagination';
import NewsArticleCard from './NewsArticleCard';
import NewsCreateArticle from './NewsCreateArticle';
import NewsToolbar from './NewsToolbar';
const LIMIT = 10;
export default function News() {
  const [articles, setArticles] = useState([] as Article[]);
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined as AxiosError | undefined);
  const [currentTab, setCurrentTab] = useState('news');
  const { token, user } = useAuth();
  useEffect(() => {
    setLoading(true);
    newsApi
      .getNewsArticles(LIMIT, offset)
      .then((response) => {
        setArticles(response.data.newsArticles);
        setTotalCount(response.data.totalArticleCount);
        setLoading(false);
      })
      .catch((err) => setError(err));
  }, [offset]);
  async function getArticles() {
    newsApi
      .getNewsArticles(LIMIT, offset)
      .then((response) => {
        setArticles(response.data.newsArticles);
        setTotalCount(response.data.totalArticleCount);
      })
      .catch((err) => setError(err));
  }
  async function createArticle(articleData: NewsArticleData) {
    newsApi
      .postNewsArticle(articleData, token)
      .then(getArticles)
      .catch((err) => setError(err));
  }
  useEffect(() => {
    setOffset((currentPage - 1) * LIMIT);
  }, [currentPage]);
  useEffect(() => {
    setOffset(0);
  }, [currentTab]);
  function renderTab() {
    switch (currentTab) {
      case 'news':
        return articles && articles.length > 0 ? (
          articles.map((article) => (
            <NewsArticleCard {...{ article }} key={article.id} />
          ))
        ) : (
          <div>No articles...</div>
        );
      case 'create':
        return user?.permissions.news.canPost ? (
          <NewsCreateArticle error={error} createArticle={createArticle} />
        ) : (
          <div>You don't have proper permissions or aren't logged in</div>
        );
    }
  }
  return (
    <div className='news'>
      <NewsToolbar
        setCurrentTab={setCurrentTab}
        currentTab={currentTab}></NewsToolbar>
      {!loading && (
        <>
          {renderTab()}
          {currentTab === 'news' && (
            <Pagination
              totalCount={totalCount}
              pageSize={LIMIT}
              currentPage={currentPage}
              onPageChange={(pageNumber) => {
                setCurrentPage(pageNumber);
              }}
              siblingCount={0}
              className='pagination'
            />
          )}
        </>
      )}
    </div>
  );
}
