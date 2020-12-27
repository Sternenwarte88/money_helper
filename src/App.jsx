import './App.css';
import React from 'react';
import Login from './container/login/login';
import Signup from './container/signup/signup';
import menu from './container/menu/menu';
import income from './container/income/income'
import { Switch, Route, withRouter } from 'react-router';

const app = function App() {
	return (
		<>
			<Switch>
				<Route path='/' exact component={Login} />
				<Route path='/signup' exact component={Signup} />
				<Route path='/menu' exact component={menu} />
				<Route path='/income' exact component={income} />
			</Switch>
		</>
	);
};

export default withRouter(app);
