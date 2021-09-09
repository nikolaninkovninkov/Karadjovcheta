import React, { Dispatch, SetStateAction } from 'react';
export default function NewsToolbar({
  setCurrentTab,
  currentTab,
}: {
  setCurrentTab: Dispatch<SetStateAction<string>>;
  currentTab: string;
}) {
  return (
    <div className='news-toolbar'>
      {currentTab !== 'news' && (
        <div
          onClick={() => {
            setCurrentTab('news');
          }}
          className='back-to-news'
          title='Back to News'>
          Back to news
        </div>
      )}
      {currentTab !== 'create' && (
        <button
          onClick={() => setCurrentTab('create')}
          className='create-article'
          title='Create article'>
          Create article
        </button>
      )}
    </div>
  );
}
