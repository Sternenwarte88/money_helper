import * as actionTypes from './actions/auth';
const initialState = {
	email: '',
	loginState: false,
	id: '',
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.LOGIN:
			console.log(action);
			return {
				...state,
				email: action.loginInformation.email,
				loginState: action.loginInformation.loggedIn,
				id: action.loginInformation.id,
			};
		default:
			console.log('failed');
			return state;
	}
};

export default reducer;
