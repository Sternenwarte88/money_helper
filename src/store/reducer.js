import * as actionTypes from './actions/actionCreators';
const initialState = {
	email: '',
	loginState: false,
	id: '',
	auth: false,
	reveneuData: {},
};

const reducer = (state = initialState, action) => {
	console.log(action);
	switch (action.type) {
		case actionTypes.LOGIN:
			return {
				...state,
				email: action.loginInformation.email,
				loginState: action.loginInformation.loggedIn,
				id: action.loginInformation.id,
			};
		case actionTypes.GET_FINANCE:
			if (action.financeType === 'bills') {
				return {
					...state,

					reveneuData: {
						income: state.reveneuData.income,
						bills: action.data.bills,
					},
				};
			} else if (action.financeType === 'income') {
				return {
					...state,

					reveneuData: {
						income: action.data.income,
						bills: state.reveneuData.bills,
					},
				};
			}
			break;

		case actionTypes.DELETE_ITEM:
			console.log(action);
			if (action.financeType === 'bills') {
				return {
					...state,

					reveneuData: {
						income: state.reveneuData.income,
						bills: action.filteredFinance,
					},
				};
			} else if (action.financeType === 'income') {
				return {
					...state,

					reveneuData: {
						income: action.filteredFinance,
						bills: state.reveneuData.bills,
					},
				};
			}
			break;

		default:
			console.log('failed');
			return state;
	}
};

export default reducer;
