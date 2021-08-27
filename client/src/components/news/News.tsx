import React, { useEffect, useState } from 'react';
import * as newsApi from '../../api/news';
import Article from '../../types/responses/Article';
export default function News() {
  const [articles, setArticles] = useState([] as Article[]);
  useEffect(() => {
    newsApi.getNewsArticles().then((response) => {
      setArticles(response.data);
    });
  }, []);
  useEffect(() => {
    if (articles.length > 0) {
      console.log(articles);
    }
  }, [articles]);
  return <div className='news'></div>;
}
