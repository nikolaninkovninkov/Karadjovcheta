import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
export default function Navbar() {
  const [t] = useTranslation('navbar');
  return (
    <header>
      <h1 className='logo'>Karadjovcheta</h1>
      <input type='checkbox' id='nav-toggle' className='nav-toggle' />
      <nav>
        <ul>
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
            <Link to='/profile' className='link' children={t('profile')} />
          </li>
        </ul>
      </nav>
      <label htmlFor='nav-toggle' className='nav-toggle-label'>
        <span></span>
      </label>
    </header>
  );
}
