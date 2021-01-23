import axios from '../../axiosDefault';
import Cookies from 'universal-cookie';
import * as actionCreators from './actionCreators';

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
					dispatch(loginDatabase(newInformation));
				} else {
					console.log(data);
				}
				return data;
			})
			.then(data => {
				cookies.set('loginState', data.data.token);
				cookies.set('id', data.data.id);
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

const loginDatabase = loginInformation => {
	return {
		type: actionCreators.LOGIN,
		loginInformation: loginInformation,
	};
};
