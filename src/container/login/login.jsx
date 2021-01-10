import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HeadTitle } from '../../components/UI/headTitle';
import Input from '../../components/UI/Input';
import * as actionCreators from '../../store/actions/auth';
import classes from './login.module.css';

// TODO: Pre-Alpha Banner
// TODO: Loading Modal (loading circle)
// TODO: Implement error feedback

class Login extends Component {
	loginInformation = {
		email: '',
		password: '',
	};

	inputChangedHandler = (event, name) => {
		const newLoginInformation = {
			...this.loginInformation,
			[name]: event.target.value,
		};
		return (this.loginInformation = newLoginInformation);
	};
	signupHandler = () => {
		this.props.history.push('/signUp');
	};

	render() {
		const email = 'email';
		const password = 'password';

		return (
			<>
				<div className={classes.login}>
					<HeadTitle site={'Login'} />
					<div className={classes.form}>
						<label hmtlFor={email}>Deine E-Mail: </label>
						<Input
							class={classes.input}
							name={email}
							type={email}
							placeholder='example@example.de'
							changeValue={(event, name) =>
								this.inputChangedHandler(event, email)
							}>
							{this.loginInformation.email}
						</Input>
						<label htmlFor='password'>Dein Passwort:</label>
						<Input
							class={classes.input}
							name={password}
							type={password}
							value={this.value}
							placeholder='Dein Passwort'
							changeValue={(event, name) =>
								this.inputChangedHandler(event, 'password')
							}>
							{this.loginInformation.password}
						</Input>
						<div>
							<button
								className={classes.loginBtn}
								onClick={(loginInformation, props) => {
									this.props.loginAction(this.loginInformation, this.props);
								}}>
								Login
							</button>
							<button
								className={classes.signUpBtn}
								onClick={this.signupHandler}>
								Noch keinen Account?
							</button>
						</div>
					</div>
				</div>
			</>
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
		loginAction: (loginInformation, props) =>
			dispatch(actionCreators.login(loginInformation, props)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
