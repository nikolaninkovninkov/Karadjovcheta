import React, { ReactNode, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import useClickOutside from '../../../hooks/useClickOutside';
import useToggle from '../../../hooks/useToggle';
function Field({
  text,
  to,
  show = true,
}: {
  text: string;
  to: string;
  show?: boolean;
}) {
  const history = useHistory();
  const handleClick = () => history.push(to);
  return show ? (
    <div className='navbar-dropdown-field' onClick={handleClick}>
      {text}
    </div>
  ) : (
    <></>
  );
}
function NavbarDropdown({
  text,
  children,
  show = true,
}: {
  text: string;
  children: ReactNode;
  show?: boolean;
}) {
  const [open, toggleOpen] = useToggle();
  const dropdownRef = useRef(null as HTMLDivElement | null);
  useClickOutside(dropdownRef, () => toggleOpen(false));
  return show ? (
    <div
      className='navbar-dropdown'
      onClick={() => toggleOpen()}
      ref={dropdownRef}>
      <span className='navbar-link'>{text}</span>
      <div className='fields'>{open && children}</div>
    </div>
  ) : (
    <></>
  );
}
NavbarDropdown.Field = Field;
export default NavbarDropdown;
