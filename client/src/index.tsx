import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import axios from 'axios';
import { AuthProvider } from './contexts/AuthContext';
axios.defaults.baseURL = process.env.NODE_SERVER;
axios.defaults.headers['Content-Type'] = 'application/json;utf-8';
ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
