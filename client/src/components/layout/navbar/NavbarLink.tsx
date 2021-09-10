import React from 'react';
import { Link, useHistory } from 'react-router-dom';

export default function NavbarLink({
  to,
  text,
  show = true,
}: {
  to?: string;
  text: string;
  show?: boolean;
}) {
  const history = useHistory();
  return show ? (
    <Link
      className='navbar-link'
      to={to || history.location.pathname}
      role='link'>
      {text}
    </Link>
  ) : (
    <></>
  );
}
