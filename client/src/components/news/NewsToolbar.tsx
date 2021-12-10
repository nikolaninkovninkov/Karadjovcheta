import React, { Dispatch, ReactNode, SetStateAction } from 'react';
function NewsToolbarItem({
  show = true,
  children,
}: {
  show?: boolean;
  children: ReactNode;
}) {
  return show ? <div className='news-toolbar-item'>{children}</div> : <></>;
}
function NewsToolbar({
  setCurrentTab,
  currentTab,
  show = true,
  children,
}: {
  setCurrentTab: Dispatch<SetStateAction<string>>;
  currentTab: string;
  show?: boolean;
  children: ReactNode;
}) {
  return <div className='news-toolbar'>{children}</div>;
}
NewsToolbar.Item = NewsToolbarItem;
export default NewsToolbar;
