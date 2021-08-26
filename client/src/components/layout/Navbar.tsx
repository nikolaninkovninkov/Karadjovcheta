import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';

export default function Navbar() {
  const history = useHistory();
  const { t, i18n } = useTranslation();
  return (
    <nav className='navbar'>
      <div className='logo'>
        <h1
          onClick={() => {
            history.push('/');
          }}>
          Karadjovcheta
        </h1>
      </div>
      <ul className='list'>
        <li>
          <Link to='/' className='link'>
            {t('home')}
          </Link>
        </li>
        <li>
          <Link to='/news' className='link'>
            {t('news')}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
