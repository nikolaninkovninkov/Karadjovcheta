import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
export default function Navbar() {
  const [t] = useTranslation('navbar');
  const { user } = useAuth();
  return (
    <header>
      <h1 className='logo'>Karadjovcheta</h1>
      <input type='checkbox' id='nav-toggle' className='nav-toggle' />
      <nav>
        <ul>
          <li>
            <Link to='/' className='link' children={t('home')} />
          </li>
          <li>
            <Link to='/news' className='link' children={t('news')} />
          </li>
          <li>
            {user ? (
              <Link to='/profile' className='link' children={t('profile')} />
            ) : (
              <Link className='button' to='/login' children={t('login')} />
            )}
          </li>
        </ul>
      </nav>
      <label htmlFor='nav-toggle' className='nav-toggle-label'>
        <span></span>
      </label>
    </header>
  );
}
