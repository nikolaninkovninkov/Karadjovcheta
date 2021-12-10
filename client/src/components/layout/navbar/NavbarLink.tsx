import React from 'react';
import { Link } from 'react-router-dom';

export default function NavbarLink({
  to,
  text,
  show = true,
}: {
  to: string;
  text: string;
  show?: boolean;
}) {
  return show ? (
    <Link className='navbar-link' role='link' to={to} children={text} />
  ) : (
    <></>
  );
}
