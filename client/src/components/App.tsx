import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Login from './auth/Login';
import Profile from './auth/Profile';
import Register from './auth/Register';
import StudentDashboard from './dashboard/StudentDashboard';
import Navbar from './layout/navbar/Navbar';
import News from './news/News';
import NewsArticle from './news/NewsArticle';
import Home from './pages/Home';
import Vote from './vote/Vote';
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
      {user?.permissions.dashboard.canAccessStudentDashboard && (
        <>
          <Route path='/student-dashboard' exact>
            <Navbar />
            <StudentDashboard />
          </Route>
          <Route path='/vote' exact>
            <Navbar />
            <Vote />
          </Route>
        </>
      )}
      {user?.permissions.dashboard.canAccessModeratorDashboard && (
        <Route path='/moderator-dashboard' exact>
          <Navbar />
        </Route>
      )}
      {user?.permissions.dashboard.canAccessAdminDashboard && (
        <Route path='/admin-dashboard' exact>
          <Navbar />
        </Route>
      )}
    </div>
  );
}

export default App;
