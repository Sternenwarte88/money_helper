import axios from 'axios';
import React, { Component } from 'react';
import { HeadTitle } from '../../components/UI/headTitle';
import Input from '../../components/UI/Input';
import {
	validMail,
	validPassword,
	confirmPassword,
} from '../../utility/inputValidation';
import classes from '../signup/signup.module.css';


class signUp extends Component {
	state = {
		email: ' ',
		password: '',
	};

	inputChangedHandler = (event, name) => {
		const newState = { ...this.state, [name]: event.target.value };
		this.setState(newState);
		console.log(this.state);
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
			.then(res => {
				if (res.data.msg === 'User created!') {
					this.props.history.push('/');
				}
			})
			.catch(err => {
				console.log(err.msg);
			});
	};

	render() {
		const email = 'email';
		const password = 'password';
		const confirmPWD = 'confirmPWD';

		return (
			<>
				<div className={classes.signUp}>
					<HeadTitle site={'Sign Up'} />
					<div className={classes.form}>
						<label htmlFor={email}>Deine E-Mail: </label>
						<Input
							class={classes.input}
							isValid={validMail(this.state.email)}
							name={email}
							type={email}
							placeholder='example@example.de'
							changeValue={event => this.inputChangedHandler(event, email)}>
							{this.state.email}
						</Input>
						<label htmlFor='password'>Lege Dein Passwort fest</label>
						<Input
							class={classes.input}
							isValid={validPassword(this.state.password)}
							name={password}
							type={password}
							value={this.value}
							placeholder='Dein Passwort'
							changeValue={event =>
								this.inputChangedHandler(event, 'password')
							}>
							{this.state.password}
						</Input>
						<Input
							class={classes.input}
							isValid={confirmPassword(
								this.state.password,
								this.state.confirmPWD
							)}
							name={confirmPWD}
							type={password}
							value={this.value}
							placeholder='Bestätige dein Passwort'
							changeValue={event =>
								this.inputChangedHandler(event, 'confirmPWD')
							}>
							{this.state.password}
						</Input>
						<div>
							<button onClick={this.signUpHandler}> Erstelle Account </button>
							<button onClick={this.loginHandler}>
								Hast Du schon einen Account?
							</button>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default signUp;
