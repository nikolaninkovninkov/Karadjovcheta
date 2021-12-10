import React, { useEffect, useState } from 'react';
import { match } from 'react-router-dom';
import { getNewsArticles } from '../../api/news';
import Article from '../../types/responses/Article';
import Loader from '../layout/Loader';
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
  function renderContent() {
    const paragraphs = article.content.split(/\n/);
    return paragraphs.map((p) => <p>{p}</p>);
  }
  if (loading) return <Loader></Loader>;
  return (
    <div className='article'>
      <h1>{article.title}</h1>
      <h2>
        By {article?.author.username},{' '}
        {new Date(article.dateCreated).toLocaleDateString()}
      </h2>
      {renderContent()}
    </div>
  );
}
