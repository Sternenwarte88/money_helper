import axios from 'axios';
export const LOGIN = 'LOGIN';

export const login = loginInformation => {
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
					},
					mode: 'cors',
				}
			)
			.then(data => {
				if (data.status === 200) {
					const newInformation = {
						...loginInformation,
						loggedIn: true,
						id: data.data.id,
					};
					dispatch(loginDatabase(newInformation));
				} else {
					console.log(data);
				}
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
