import * as actionCreators from './actionCreators';
import instance from './../../axiosDefault';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const getFinanceData = (financeType, dispatch) => {
	dispatch(loading(true));
	instance
		.get('/getFinanceData', {
			params: {
				financeType: financeType,
				id: cookies.get('id'),
			},
		})
		.then(response => {
			console.log(response);
			let financeData = response.data.finance;
			let data = financeData;
			dispatch(getfinance(financeType, data));
			dispatch(loading(false));
		})
		.catch(err => {
			dispatch(loading(false));
			console.log(err);
		});
};

export const getFinance = financeType => {
	console.log('runs');

	return dispatch => {
		getFinanceData(financeType, dispatch);
	};
};

const getfinance = (financeType, data) => {
	return {
		type: actionCreators.GET_FINANCE,
		financeType: financeType,
		data: data,
	};
};

export const insertFinanceData = (amount, reason, date, id, financeType) => {
	return dispatch => {
		dispatch(loading(true));
		instance
			.post('/insertFinanceData', {
				amount: amount,
				reason: reason,
				date: new Date(date),
				id: id,
				financeType: financeType,
			})
			.then(res => {
				console.log(res);
				if (res.data.msg === 'accepted') {
					let errorData = '';
					dispatch(error(errorData));
				} else {
					const errorData = {
						status: res.data.status,
						message: res.data.msg,
					};
					dispatch(error(errorData));
				}

				return financeType;
			})
			.then(financeType => {
				getFinanceData(financeType, dispatch);
				dispatch(loading(false));
			})
			.catch(err => {
				console.log(err);
			});
	};
};

const dispatchInsertedData = (financeType, newFinanceData) => {
	return {
		type: actionCreators.INSERT_FINANCE,
		financeType: financeType,
		newFinanceData: newFinanceData,
	};
};
export const deleteHandler = (itemID, financeType, oldState) => {
	let url = '/deleteFinanceData';

	return dispatch => {
		dispatch(loading(true));
		instance
			.delete(url, {
				params: {
					financeType: financeType,
					itemID: itemID,
				},
			})
			.then(res => {
				if (res.status === 200) {
					let filteredFinance = oldState.filter(
						obj => obj._id !== itemID.toString()
					);
					dispatch(dispatchFilteredFinance(financeType, filteredFinance));
					dispatch(loading(false));
				}
			})
			.catch(err => {
				dispatch(loading(false));
				console.log(err);
			});
	};
};

const dispatchFilteredFinance = (financeType, filteredFinance) => {
	return {
		type: actionCreators.DELETE_ITEM,
		financeType: financeType,
		filteredFinance: filteredFinance,
	};
};

const error = errorData => {
	return {
		type: actionCreators.ERROR,
		error: errorData,
	};
};

const loading = loading => {
	return {
		type: actionCreators.LOADING,
		loading: loading,
	};
};
