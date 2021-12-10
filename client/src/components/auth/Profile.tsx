import React from 'react';
import useAuth from '../../hooks/useAuth';
export default function Profile() {
  const { logout } = useAuth();
  return (
    <div>
      <button onClick={logout}>Log out</button>
    </div>
  );
}
