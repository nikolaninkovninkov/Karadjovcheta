import React, { Suspense } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import useAuth from '../hooks/useAuth';
import useLocalStorage from '../hooks/useLocalStorage';
import Login from './auth/Login';
import Profile from './auth/Profile';
import Register from './auth/Register';
import Dashboard from './Dashboard';
import Loader from './layout/Loader';
import Navbar from './layout/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
function App() {
  const { user } = useAuth();
  const [theme, setTheme] = useLocalStorage('theme', 'golden-yellow');
  return (
    <div className={'app theme-' + theme}>
      <Suspense
        fallback={
          <div>
            <Loader></Loader>
          </div>
        }>
        <Router>
          <AuthProvider>
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
          </AuthProvider>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
