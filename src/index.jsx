import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import rootReducer from './reducer/rootReducer';
import App from './App';

const store = createStore(rootReducer, applyMiddleware());

const app = (
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
);

ReactDOM.render(
	<React.StrictMode>{app}</React.StrictMode>,
	document.getElementById('root')
);
