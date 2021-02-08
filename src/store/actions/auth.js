import Cookies from 'universal-cookie';
import * as actionCreators from './actionCreators';
import instance from './../../axiosDefault';

export const login = (loginInformation, props) => {
	const cookies = new Cookies();

	return dispatch => {
		instance
			.post('/login', {
				email: loginInformation.email,
				password: loginInformation.password,
			})
			.then(data => {
				if (data.status === 200 && data.msg === 'accepted') {
					const newInformation = {
						...loginInformation,
						loggedIn: true,
						password: '',
						id: data.data.id,
					};
					cookies.set('loginState', data.data.token);
					cookies.set('id', data.data.id);
					dispatch(loginData(newInformation));
					props.history.push('/menu');
					return;
				} else {
					const errorData = {
						status: data.data.status,
						message: data.data.msg,
					};
					dispatch(error(errorData));
				}
			})
			.catch(err => {
				const newInformation = {
					...loginInformation,
					loggedIn: false,
				};
				dispatch(loginData(newInformation));
			});
	};
};

export const signUpHandler = (signUpData, props) => {
	return dispatch => {
		instance
			.post(
				'/users',
				{
					email: signUpData.email,
					password: signUpData.password,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
					mode: 'cors',
				}
			)
			.then(res => {
				console.log(res);
				if (res.data.msg === 'Benutzer erstellt!') {
					props.history.push('/');
				} else {
					const errorData = {
						...signUpData,
						status: res.data.status,
						message: res.data.msg.errors[0].msg,
					};
					dispatch(error(errorData));
				}
			})
			.catch(err => {
				console.log(err);
			});
	};
};

const loginData = loginInformation => {
	return {
		type: actionCreators.LOGIN,
		loginInformation: loginInformation,
	};
};

const error = errorData => {
	return {
		type: actionCreators.ERROR,
		error: errorData,
	};
};
