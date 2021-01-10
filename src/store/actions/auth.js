import axios from 'axios';
import Cookies from 'universal-cookie';
export const LOGIN = 'LOGIN';

export const login = (loginInformation, props) => {
	const cookies = new Cookies();
	return dispatch => {
		axios
			.post(
				'http://localhost:28010/mh/login',
				{
					email: loginInformation.email,
					password: loginInformation.password,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: cookies.get('loginState'),
					},
					mode: 'cors',
				}
			)
			.then(data => {
				if (data.status === 200) {
					const newInformation = {
						...loginInformation,
						loggedIn: true,
						password: '',
						id: data.data.id,
					};
					cookies.set('loginState', data.data.token);
					cookies.set('id', data.data.id);
					console.log(data);
					dispatch(loginDatabase(newInformation));
				} else {
					console.log(data);
				}
			})
			.then(result => {
				props.history.push('/menu');
			})
			.catch(err => {
				const newInformation = {
					...loginInformation,
					loggedIn: false,
				};
				dispatch(loginDatabase(newInformation));
				console.log(err);
			});
	};
};

export const loginDatabase = loginInformation => {
	return {
		type: LOGIN,
		loginInformation: loginInformation,
	};
};
