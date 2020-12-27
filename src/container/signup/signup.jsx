import React, { Component } from 'react';
import Input from '../../components/UI/Input';
import classes from '../login/login.module.css';
import { HeadTitle } from '../../components/UI/headTitle';

import axios from 'axios';

class signUp extends Component {
	state = {
		email: '',
		password: '',
	};

	inputChangedHandler = (event, name) => {
		const newState = { ...this.state, [name]: event.target.value };
		this.setState(newState);
	};

	loginHandler = () => {
		this.props.history.push('/');
	};

	signUpHandler = () => {
		axios
			.post(
				'http://localhost:28010/mh/users',
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
			.then(result => {
				console.log(result);
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
					<HeadTitle site={'sign Up'} />
					<div className={classes.form}>
						<label hmtlFor={email}>Deine E-Mail: </label>
						<Input
							class={classes.input}
							name={email}
							type={email}
							placeholder='example@example.de'
							changeValue={event => this.inputChangedHandler(event, email)}>
							{this.state.email}
						</Input>
						<label htmlFor='password'>Lege Dein Passwort fest</label>
						<Input
							class={classes.input}
							name={password}
							type={password}
							value={this.value}
							placeholder='Dein Passwort'
							changeValue={event =>
								this.inputChangedHandler(event, 'password')
							}>
							{this.state.password}
						</Input>
						<button onClick={this.signUpHandler}> Erstelle Account </button>
						<button onClick={this.loginHandler}>
							Hast Du schon einen Account?
						</button>
					</div>
				</div>
			</>
		);
	}
}

export default signUp;
