import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import App from './components/App';
import axios from 'axios';
import './lib/i18n.ts';
axios.defaults.baseURL = process.env.REACT_APP_NODE_SERVER;
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
