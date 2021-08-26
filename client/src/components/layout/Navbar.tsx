import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';

export default function Navbar() {
  const history = useHistory();
  const [t] = useTranslation('navbar');
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
        <li>
          <Link to='/profile' className='link'>
            {t('profile')}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
