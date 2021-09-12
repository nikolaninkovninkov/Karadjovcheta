import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useAuth from '../../../hooks/useAuth';
import useToggle from '../../../hooks/useToggle';
import MenuIcon from '@material-ui/icons/Menu';
import NavbarLink from './NavbarLink';
import NavbarButton from './NavbarButton';
import NavbarDropdown from './NavbarDropdown';
import atLeastOneTruthy from '../../../utils/atLeastOneTruthy';
import useDebug from '../../../hooks/useDebug';
export default function Navbar() {
  const [t] = useTranslation('navbar');
  const { user } = useAuth();
  const [mobileShow, toggleMobileShow] = useToggle(false);
  useDebug(user);
  return (
    <header>
      <h1 className='logo'>Karadjovcheta</h1>
      <nav className={classNames({ navbar: true, show: mobileShow })}>
        <NavbarLink to='/' text={t('home')} />
        <NavbarLink to='/news' text={t('news')} />
        <NavbarLink to='/profile' text={t('profile')} show={!!user} />
        <NavbarButton to='/login' text={t('login')} show={!user} />
        <NavbarDropdown
          text={t('dashboard')}
          show={!!user && atLeastOneTruthy(user.permissions.dashboard)}>
          <NavbarDropdown.Field
            text={t('student-dashboard')}
            to='/student-dashboard'
            show={
              !!user && user.permissions.dashboard.canAccessStudentDashboard
            }
          />
          <NavbarDropdown.Field
            text={t('moderator-dashboard')}
            to='/moderator-dashboard'
            show={
              !!user && user.permissions.dashboard.canAccessModeratorDashboard
            }
          />
          <NavbarDropdown.Field
            text={t('admin-dashboard')}
            to='/admin-dashboard'
            show={!!user && user.permissions.dashboard.canAccessAdminDashboard}
          />
        </NavbarDropdown>
      </nav>
      <button className='mobile-toggle' onClick={() => toggleMobileShow()}>
        <MenuIcon fontSize='large' className='hamburger' />
      </button>
    </header>
  );
}
