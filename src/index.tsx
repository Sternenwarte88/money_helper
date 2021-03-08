import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import Cookies from 'universal-cookie';
import App from './App';
import axios from './axiosDefault';
import Layout from './components/layout/layout';
import './index.css';
import reducer from './store/reducer';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: '/.env.development' });
} else if (process.env.NODE_ENV === 'production') {
  require('dotenv').config({ path: '/.env.production' });
}

const cookie = new Cookies();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

axios.interceptors.request.use((config) => {
  config.headers.authorization = cookie.get('loginState');
  return config;
});

const app = (
  <BrowserRouter>
    <Provider store={store}>
      <Layout>
        <App />
      </Layout>
    </Provider>
  </BrowserRouter>
);

ReactDOM.render(<React.StrictMode>{app}</React.StrictMode>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
