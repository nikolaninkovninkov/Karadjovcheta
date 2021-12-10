import React, { Dispatch, SetStateAction } from 'react';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
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
          <ArrowBackIcon />
        </div>
      )}
      <div
        onClick={() => setCurrentTab('create')}
        className='create-article'
        title='Create article'>
        <AddIcon />
      </div>
    </div>
  );
}
