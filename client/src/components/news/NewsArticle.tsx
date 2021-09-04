import React, { useEffect, useState } from 'react';
import { Link, match } from 'react-router-dom';
import { getNewsArticles } from '../../api/news';
import Article from '../../types/responses/Article';
export default function NewsArticle({
  match,
}: {
  match: match<{ id: string }>;
}) {
  const { id } = match.params;
  const [article, setArticle] = useState({} as Article);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    getNewsArticles(1, 0, id).then((response) => {
      setArticle(response.data.newsArticles[0]);
      setLoading(false);
    });
  }, [id]);
  return (
    <div className='news-article'>
      {!loading && (
        <>
          <h1>{article.title}</h1>
          <p>{article.content}</p>
          <p>{new Date(article.dateCreated).toLocaleDateString()}</p>
          <p>By {article?.author.username}</p>
          <Link to='/news'>&larr;Back to news</Link>
        </>
      )}
    </div>
  );
}
