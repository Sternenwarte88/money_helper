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

const cookie = new Cookies();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));


axios.interceptors.request.use(config => {
	config.headers.authorization = cookie.get('loginState');
	return config;
});

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('serviceWorker.js').then(reg => {
		console.log('serviceWorker is running');
	});
}



const app = (
	<BrowserRouter>
		<Provider store={store}>
			<Layout>
				<App />
			</Layout>
		</Provider>
	</BrowserRouter>
);

ReactDOM.render(
	<React.StrictMode>{app}</React.StrictMode>,
	document.getElementById('root')
);
