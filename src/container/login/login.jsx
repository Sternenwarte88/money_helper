import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HeadTitle } from '../../components/UI/headTitle';
import Input from '../../components/UI/Input';
import * as actionCreators from '../../store/actions/actionCreators';
import classes from './login.module.css';
import { validMail, validPassword } from '../../utility/inputValidation';

class Login extends Component {
	state = {
		email: ' ',
		password: ' ',
	};

	inputChangedHandler = (event, name) => {
		const newstate = {
			...this.state,
			[name]: event.target.value,
		};
		this.setState(newstate);
	};
	signupPageHandler = () => {
		this.props.history.push('/signUp');
	};

	render() {
		const email = 'email';
		const password = 'password';
		return (
			<div className={classes.login}>
				<HeadTitle site={'Login'} />
				<div className={classes.form}>
					<label htmlFor={email}>Deine E-Mail: </label>
					<Input
						class={classes.input}
						name={email}
						type={email}
						isValid={validMail(this.state.email)}
						placeholder='example@example.de'
						changeValue={(event, name) =>
							this.inputChangedHandler(event, email)
						}>
						{this.state.email}
					</Input>
					<label htmlFor='password'>Dein Passwort:</label>
					<Input
						class={classes.input}
						name={password}
						type={password}
						isValid={validPassword(this.state.password)}
						value={this.value}
						placeholder='Dein Passwort'
						changeValue={(event, name) =>
							this.inputChangedHandler(event, 'password')
						}>
						{this.state.password}
					</Input>
					<div>
						<button
							className={classes.loginBtn}
							onClick={(state, props) => {
								this.props.loginAction(this.state, this.props);
							}}>
							Login
						</button>
						<button
							className={classes.signUpBtn}
							onClick={this.signupPageHandler}>
							Noch keinen Account?
						</button>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		loggedIn: state.loginState,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		loginAction: (state, props) =>
			dispatch(actionCreators.authActions.login(state, props)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
