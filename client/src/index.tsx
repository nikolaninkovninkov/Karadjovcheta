import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import axios from 'axios';
import './lib/i18n.ts';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';
import Loader from './components/layout/Loader';
import './css/index.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
axios.defaults.baseURL = process.env.REACT_APP_NODE_SERVER;
ReactDOM.render(
  <React.StrictMode>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}>
      <Suspense
        fallback={
          <div>
            <Loader></Loader>
          </div>
        }>
        <Router>
          <AuthProvider>
            <App />
          </AuthProvider>
        </Router>
      </Suspense>
    </div>
  </React.StrictMode>,
  document.getElementById('root'),
);
