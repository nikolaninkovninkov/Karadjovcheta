import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useLocalStorage from '../hooks/useLocalStorage';
import Login from './auth/Login';
import Profile from './auth/Profile';
import Register from './auth/Register';
import Dashboard from './Dashboard';
import Navbar from './layout/Navbar';
function App() {
  const { user } = useAuth();
  const [theme, setTheme] = useLocalStorage('theme', 'golden-yellow');
  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <div className={'app theme-' + theme}>
      <Route path='/register' exact>
        {user ? <Redirect to='/' /> : <Register />}
      </Route>
      <Route path='/login' exact>
        {user ? <Redirect to='/' /> : <Login />}
      </Route>
      <Route path='/profile' exact>
        {user ? <Profile /> : <Redirect to='/login' />}
      </Route>
      <Route path='/' exact>
        <Navbar></Navbar>
        {user ? (
          <Dashboard {...{ setTheme, theme }} />
        ) : (
          <Redirect to='/login' />
        )}
      </Route>
    </div>
  );
}

export default App;
