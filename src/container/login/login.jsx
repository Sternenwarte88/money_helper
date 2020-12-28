import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input';
import classes from './login.module.css';
import { HeadTitle } from '../../components/UI/headTitle';
import { login } from '../../store/actions/auth';

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

	loginHandler = () => {
		axios
			.post(
				'http://localhost:28010/mh/login',
				{
					email: this.loginInformation.email,
					password: this.loginInformation.password,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
					mode: 'cors',
				}
			)
			.then(data => {
				if (data.status === 200) {
					this.props.history.push('/menu');
				} else {
					console.log(data);
				}
			})
			.catch(err => {
				console.log(err);
			});
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

						<button
							onClick={() => {
								this.loginAction(this.loginInformation);
							}}>
							Login
						</button>
						<button onClick={this.signupHandler}>Noch keinen Account?</button>
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = state => {
	return {};
};

const mapDispatchToProps = dispatch => {
	return {
		loginAction: loginInformation => {
			dispatch(login(loginInformation));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
