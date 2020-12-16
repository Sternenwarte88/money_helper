import React, { Component } from 'react';
import Input from '../../components/UI/Input';
import classes from './login.module.css';

class Login extends Component {
	state = {
		'e-mail': '',
		password: '',
		pin: '',
	};

	inputChangedHandler = (event, name) => {
		console.log(this.state);
		const newState = { ...this.state, [name]: event.target.value };
		this.setState(newState);
	};
	signupHandler = () => {
		this.props.history.push('/signUp');
	};

	render() {
		const email = 'e-mail';
		const password = 'password';
		const pin = 'pin';

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
						<label htmlFor={pin}>Deine 4 stellige Pin</label>
						<Input
							class={classes.input}
							name={pin}
							type={'Number'}
							placeholder='Deine Pin'
							changeValue={(event, name) =>
								this.inputChangedHandler(event, 'pin')
							}>
							{this.state.pin}
						</Input>
						<button onClick={''}> Login </button>
						<button onClick={this.signupHandler}>Noch keinen Account?</button>
					</div>
				</div>
			</>
		);
	}
}

export default Login;
