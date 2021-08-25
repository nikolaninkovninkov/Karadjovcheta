import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './components/App';
import axios from 'axios';
import { AuthProvider } from './contexts/AuthContext';

axios.defaults.baseURL = process.env.REACT_APP_NODE_SERVER;
ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
