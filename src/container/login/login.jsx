import React, { Component } from 'react';
import Input from '../../components/UI/Input';
import classes from './login.module.css';
import axios from 'axios';
import { HeadTitle } from '../../components/UI/headTitle';

class Login extends Component {
	state = {
		email: '',
		password: '',
	};

	inputChangedHandler = (event, name) => {
		const newState = { ...this.state, [name]: event.target.value };
		this.setState(newState);
	};
	signupHandler = () => {
		this.props.history.push('/signUp');
	};

	loginHandler = () => {
		axios
			.post(
				'http://localhost:28010/mh/login',
				{
					email: this.state.email,
					password: this.state.password,
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
							{this.state.email}
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
							{this.state.password}
						</Input>

						<button onClick={this.loginHandler}> Login </button>
						<button onClick={this.signupHandler}>Noch keinen Account?</button>
					</div>
				</div>
			</>
		);
	}
}

export default Login;
