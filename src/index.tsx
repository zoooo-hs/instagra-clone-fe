import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from "react-router-dom";
import { store } from './reducer'
import { Provider } from 'react-redux';
import axios from 'axios';

const developmentBackendURL = () => {
  const {protocol, hostname} = window.location;
  return `${protocol}//${hostname}:8080`;
}

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? developmentBackendURL() : process.env.REACT_APP_API_URL;

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
