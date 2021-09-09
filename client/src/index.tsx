import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import axios from 'axios';
import './lib/i18n.ts';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';
import Loader from './components/layout/Loader';
import './styles/index.scss';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
axios.defaults.baseURL = process.env.REACT_APP_NODE_SERVER;
ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={Loader}>
      <Router>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Router>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root'),
);
