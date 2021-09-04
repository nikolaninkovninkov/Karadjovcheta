import React from 'react';
import { Link } from 'react-router-dom';
import Article from '../../types/responses/Article';

export default function NewsArticleCard({ article }: { article: Article }) {
  return (
    <div className='news-article-card'>
      <h1>{article.title}</h1>
      <p>
        {article.content.substring(0, 100)}{' '}
        {<Link to={`/news/${article.id}`}>[...]</Link>}
      </p>
      <p className='date'>{new Date(article.dateCreated).toLocaleString()}</p>
    </div>
  );
}
