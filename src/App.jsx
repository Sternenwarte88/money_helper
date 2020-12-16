import './App.css';
import React from 'react';
import Login from './container/login/login';
import Signup from './container/signup/signup';
import { Switch, Route, withRouter } from 'react-router';

const app = function App() {
	return (
		<>
			<Switch>
				<Route path='/' exact component={Login} />
				<Route path='/signup' exact component={Signup} />
			</Switch>
		</>
	);
};

export default withRouter(app);
