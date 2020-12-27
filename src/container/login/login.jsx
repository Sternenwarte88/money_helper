import React, { Component } from 'react';
import Input from '../../components/UI/Input';
import classes from './login.module.css';
import axios from 'axios';

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
				'http://localhost:28010/login',
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
					this.props.history.push('/overview');
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
					<h1>Money Helper</h1>
					<h2>Wilkommen zu deinem persönlichen Finanzgehilfen</h2>
					<div className={classes.form}>
						<label hmtlFor={email}>Deine E-Mail: </label>
						<Input
							class={classes.input}
							name={email}
							type={email}
							placeholder='example@example.de'
							// value={this.state.email}
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
