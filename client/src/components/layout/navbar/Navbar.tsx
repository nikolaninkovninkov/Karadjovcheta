import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import useToggle from '../../../hooks/useToggle';
import MenuIcon from '@material-ui/icons/Menu';
export default function Navbar() {
  const [t] = useTranslation('navbar');
  const { user } = useAuth();
  const [mobileShow, toggleMobileShow] = useToggle(false);
  return (
    <div className='navbar'>
      <h1 className='logo'>Karadjovcheta</h1>
      <nav className={classNames({ show: mobileShow })}>
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
          <li>
            {user && (
              <Link
                to='/dashboard'
                className='link'
                children={t('dashboard')}
              />
            )}
          </li>
        </ul>
      </nav>
      <button
        className='nav-toggle-label'
        onClick={() => {
          toggleMobileShow();
        }}>
        <MenuIcon fontSize='large' className='hamburger' />
        <span />
      </button>
    </div>
  );
}
