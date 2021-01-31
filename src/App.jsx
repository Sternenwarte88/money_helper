import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router';
import './App.css';
import income from './container/income/income';
import bills from './container/bills/bills';
import Login from './container/login/login';
import menu from './container/menu/menu';
import Signup from './container/signup/signup';

// TODO implement an Optionsmenu
// TODO Implement a logout function

class app extends Component {
	render() {
		let mainMenu = (
			<Switch>
				<Route path='/' exact component={Login} />
				<Route path='/signup' exact component={Signup} />
			</Switch>
		);
		// if (auth) {
		mainMenu = (
			<Switch>
				<Route path='/' exact component={Login} />
				<Route path='/signup' exact component={Signup} />
				<Route path='/menu' exact component={menu} />
				<Route path='/income' exact component={income} />
				<Route path='/bills' exact component={bills} />
			</Switch>
		);
		// }
		return <>{mainMenu}</>;
	}
}

const mapStateToProps = state => {
	return {
		loggedIn: state.loginState,
	};
};

export default connect(mapStateToProps)(withRouter(app));
