import axios from 'axios';
import React, { Component } from 'react';
import { HeadTitle } from '../../components/UI/headTitle';
import Input from '../../components/UI/Input';
import classes from '../login/login.module.css';

// TODO Style signUp Page
// TODO Implement Password confirmation
// TODO Send a mail for confirmation

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
