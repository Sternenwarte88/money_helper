import './App.css';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import Login from './container/login/login';
import Signup from './container/signup/signup';
import menu from './container/menu/menu';
import income from './container/income/income';
import { Switch, Route, withRouter } from 'react-router';

class app extends Component {
	render() {
		let mainMenu = (
			<Switch>
				<Route path='/' exact component={Login} />
				<Route path='/signup' exact component={Signup} />
				<Route path='/income' exact component={income} />
			</Switch>
		);
		if (this.props.loggedIn === true) {
			mainMenu = (
				<Switch>
					<Route path='/' exact component={Login} />
					<Route path='/signup' exact component={Signup} />
					<Route path='/menu' exact component={menu} />
					<Route path='/income' exact component={income} />
				</Switch>
			);
		}
		return <>{mainMenu}</>;
	}
}

const mapStateToProps = state => {
	return {
		loggedIn: state.loginState,
	};
};

export default connect(mapStateToProps)(withRouter(app));
