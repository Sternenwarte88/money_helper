export const LOGIN = 'LOGIN';

export const login = loginInformation => {
	return {
		type: LOGIN,
		loginInformation: loginInformation,
	};
};
