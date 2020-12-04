import React from 'react';
import classes from './login.module.css';

class Login extends React.Component {
	render() {
		return (
			<>
				<div className={classes.login}>
					<h1>Money Helper</h1>
					<h2>Wilkommen zu deinem persönlichen Finanzgehilfen</h2>
					<form action='' method='post'>
						<label for='e-mail'>Deine E-Mail:</label>
						<input
							name='e-mail'
							type='email'
							placeholder='example@example.de'></input>
						<label for='password'>Dein Passwort:</label>
						<input
							name='password'
							type='password'
							placeholder='Dein Passwort'></input>
						<label for='pin'>Deine 4 stellige Pin</label>
						<input name='pin' type='password' placeholder='Deine Pin'></input>
						<button type='submit'> Login </button>
					</form>
				</div>
			</>
		);
	}
}

export default Login;
