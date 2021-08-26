import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './components/App';
import axios from 'axios';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';
import './lib/i18next.ts';
axios.defaults.baseURL = process.env.REACT_APP_NODE_SERVER;
ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Router>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root'),
);
