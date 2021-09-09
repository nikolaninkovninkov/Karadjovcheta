import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Login from './auth/Login';
import Profile from './auth/Profile';
import Register from './auth/Register';
import Dashboard from './dashboard/Dashboard';
import Navbar from './layout/Navbar';
import News from './news/News';
import NewsArticle from './news/NewsArticle';
import Home from './pages/Home';
function App() {
  const { user } = useAuth();
  return (
    <div className='app'>
      <Route path='/register' exact>
        {user ? <Redirect to='/' /> : <Register />}
      </Route>
      <Route path='/login' exact>
        {user ? <Redirect to='/' /> : <Login />}
      </Route>
      <Route path='/profile' exact>
        {user ? <Profile /> : <Redirect to='/' />}
      </Route>
      <Route path='/' exact>
        <Navbar />
        <Home />
      </Route>
      <Route
        path='/news'
        exact
        component={() => (
          <>
            <Navbar />
            <News />
          </>
        )}
      />
      <Route path='/news/:id' exact component={NewsArticle}></Route>
      <Route path='/dashboard' exact>
        {user ? <Dashboard /> : <Redirect to='login' />}
      </Route>
    </div>
  );
}

export default App;
