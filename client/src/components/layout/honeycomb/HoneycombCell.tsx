import React from 'react';
import { Link } from 'react-router-dom';

export default function HoneycombCell({
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
  return !link ? (
    <div className='honeycomb-cell'>
      <div className='honeycomb-cell__title'>{title}</div>
      <img className='honeycomb-cell__image' src={image} alt={alt} />
    </div>
  ) : (
    <Link to={link}>
      <div className='honeycomb-cell'>
        <div className='honeycomb-cell__title'>{title}</div>
        <img className='honeycomb-cell__image' src={image} alt={alt} />
      </div>
    </Link>
  );
}
