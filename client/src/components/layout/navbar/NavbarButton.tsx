import React from 'react';
import { useHistory } from 'react-router-dom';

export default function NavbarButton({
  to,
  show = true,
  text,
}: {
  to: string;
  text: string;
  show: boolean;
}) {
  const history = useHistory();
  const handleClick = () => {
    history.push(to);
  };
  return show ? (
    <button className='navbar-button' onClick={handleClick}>
      {text}
    </button>
  ) : (
    <></>
  );
}
