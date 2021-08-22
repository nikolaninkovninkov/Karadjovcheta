import React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Login from './auth/Login';
import Profile from './auth/Profile';
import Register from './auth/Register';
import Dashboard from './Dashboard';
function App() {
  const { user } = useAuth();
  return (
    <div className="app">
      <Router>
        <Route path="/register" exact>
          {user ? <Redirect to="/profile" /> : <Register />}
        </Route>
        <Route path="/login" exact>
          {user ? <Redirect to="/profile" /> : <Login />}
        </Route>
        <Route path="/profile" exact>
          {user ? <Profile /> : <Redirect to="/login" />}
        </Route>
        <Route path="/" exact>
          {user ? <Dashboard /> : <Redirect to="/login" />}
        </Route>
      </Router>
    </div>
  );
}

export default App;
