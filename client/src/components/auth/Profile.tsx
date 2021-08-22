import React, { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';

export default function Profile() {
  const { user, logout } = useAuth();
  return (
    <div>
      <button onClick={logout}>Log out</button>
    </div>
  );
}
