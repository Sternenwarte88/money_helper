import axios from '../../axiosDefault';
import Cookies from 'universal-cookie';
import * as actionCreators from './actionCreators';

export const login = (loginInformation, props) => {
	const cookies = new Cookies();

	return dispatch => {
		axios
			.post('/login', {
				email: loginInformation.email,
				password: loginInformation.password,
			})
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
					dispatch(loginDatabase(newInformation));
					return data;
				} else {
					console.log(data);
				}
			})
			.then(data => {
				axios.interceptors.request.use(config => {
					config.headers.authorization = data.data.token;
					config.params = {
						id: data.data.id,
						financeType: 'completeFinanceData',
					};
					console.log(config);
					return config;
				});
				props.history.push('/menu');
				return;
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
