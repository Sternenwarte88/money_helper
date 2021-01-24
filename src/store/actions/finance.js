import axios from '../../axiosDefault';
import * as actionCreators from './actionCreators';

export const getFinance = financeType => {
	let financeData = '';
	let url = '/getFinanceData';

	return dispatch => {
		axios
			.get(url, {
				params: {
					financeType: financeType,
				},
			})
			.then(response => {
				financeData = response.data.finance;
				let data = financeData;
				dispatch(getfinance(financeType, data));
			})
			.catch(err => {
				console.log(err);
			});
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
		axios
			.post('/insertFinanceData', {
				amount: amount,
				reason: reason,
				date: new Date(date).toLocaleDateString('de-DE'),
				id: id,
				financeType: financeType,
			})
			.then(res => {
				let newFinanceData = {
					amount: amount,
					reason: reason,
					date: date,
					id: id,
				};
				dispatch(dispatchInsertedData(financeType, newFinanceData));
				console.log(res);
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
		axios
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
				}
			})
			.catch(err => {
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
