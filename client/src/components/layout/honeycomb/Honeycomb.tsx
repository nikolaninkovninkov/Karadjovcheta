import classNames from 'classnames';
import React, { ReactNode } from 'react';
import { useHistory } from 'react-router-dom';

function HoneycombCell({
  title,
  image,
  alt,
  link,
}: {
  title: string;
  image: string;
  alt: string;
  link?: string;
}) {
  const history = useHistory();
  return (
    <div
      className={classNames('honeycomb-cell', { isLink: !!link })}
      onClick={() => {
        if (link) history.push(link);
      }}>
      <div className='honeycomb-cell__title'>{title}</div>
      <img className='honeycomb-cell__image' src={image} alt={alt} />
    </div>
  );
}

function Honeycomb({ children }: { children: ReactNode }) {
  return <div className='honeycomb'>{children}</div>;
}
Honeycomb.Cell = HoneycombCell;
export default Honeycomb;
