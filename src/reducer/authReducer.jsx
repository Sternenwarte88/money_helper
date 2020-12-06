import * as actionType from '../actions/loginActions';

const initialState = {
	loggedIn: false,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionType.LOGIN:
			console.log(action.value);
			return {
				...state,
				state: action.value,
				// TODO: Send state to DB
			};

		case actionType.LOGOUT:
			return { ...state, loggedIn: false };
		default:
			return state;
	}
};

export default authReducer;
