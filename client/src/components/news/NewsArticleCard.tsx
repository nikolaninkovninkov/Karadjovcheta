import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Article from '../../types/responses/Article';

export default function NewsArticleCard({ article }: { article: Article }) {
  const [t] = useTranslation('news');
  return (
    <div className='news-article-card'>
      <h1>{article.title}</h1>
      <p>
        {article.content.substring(0, 100)}
        {'... '}
        {
          <Link to={`/news/${article.id}`} className='read-more'>
            {t('read-more')}
          </Link>
        }
      </p>
      <p className='date'>{new Date(article.dateCreated).toLocaleString()}</p>
    </div>
  );
}
