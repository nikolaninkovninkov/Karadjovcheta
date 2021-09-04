import React, { useEffect, useState } from 'react';
import * as newsApi from '../../api/news';
import Article from '../../types/responses/Article';
import Pagination from '../layout/Pagination';
import NewsArticleCard from './NewsArticleCard';
import NewsToolbar from './NewsToolbar';
const LIMIT = 10;
export default function News() {
  const [articles, setArticles] = useState([] as Article[]);
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    newsApi.getNewsArticles(LIMIT, offset).then((response) => {
      setArticles(response.data.newsArticles);
      setTotalCount(response.data.totalArticleCount);
      setLoading(false);
    });
  }, [offset]);
  useEffect(() => {
    setOffset((currentPage - 1) * LIMIT);
  }, [currentPage]);
  return (
    <div className='news'>
      <NewsToolbar></NewsToolbar>
      {!loading && (
        <>
          {articles.map((article) => (
            <NewsArticleCard {...{ article }} key={article.id} />
          ))}
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
        </>
      )}
    </div>
  );
}
