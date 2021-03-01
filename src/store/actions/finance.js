import * as actionCreators from './actionCreators';
import instance from './../../axiosDefault';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const getFinanceData = (financeType, dispatch) => {
  const url = '/getFinanceData';
  dispatch(loading(true));
  instance
    .get(url, {
      params: {
        financeType: financeType,
        id: cookies.get('id')
      }
    })
    .then((response) => {
      getCache(url);

      const financeData = response.data.finance;
      const data = financeData;
      dispatch(getfinance(financeType, data));
      dispatch(loading(false));
    })
    .catch((err) => {
      dispatch(loading(false));
      console.log(err);
    });
};

export const insertFinanceData = (amount, reason, date, id, financeType) => {
  return (dispatch) => {
    dispatch(loading(true));
    instance
      .post('/insertFinanceData', {
        amount: amount,
        reason: reason,
        date: new Date(date),
        id: id,
        financeType: financeType
      })
      .then((res) => {
        if (res.data.msg === 'accepted') {
          const errorData = '';
          dispatch(error(errorData));
        } else {
          const errorData = {
            status: res.data.status,
            message: res.data.msg
          };
          dispatch(error(errorData));
        }

        return financeType;
      })
      .then((financeType) => {
        getFinanceData(financeType, dispatch);
        dispatch(loading(false));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteHandler = (itemID, financeType, oldState) => {
  const url = '/deleteFinanceData';

  return (dispatch) => {
    dispatch(loading(true));
    instance
      .delete(url, {
        params: {
          financeType: financeType,
          itemID: itemID
        }
      })
      .then((res) => {
        if (res.status === 200) {
          const filteredFinance = oldState.filter((obj) => obj._id !== itemID.toString());
          dispatch(dispatchFilteredFinance(financeType, filteredFinance));
          dispatch(loading(false));
        }
      })
      .catch((err) => {
        dispatch(loading(false));
        console.log(err);
      });
  };
};

const getCache = (url) => {
  if ('caches' in window) {
    caches.match(url).then((response) => {
      if (response) {
        return response;
      }
    });
  }
};

const dispatchFilteredFinance = (financeType, filteredFinance) => {
  return {
    type: actionCreators.DELETE_ITEM,
    financeType: financeType,
    filteredFinance: filteredFinance
  };
};

const error = (errorData) => {
  return {
    type: actionCreators.ERROR,
    error: errorData
  };
};

const loading = (loading) => {
  return {
    type: actionCreators.LOADING,
    loading: loading
  };
};

export const getFinance = (financeType) => {
  return (dispatch) => {
    getFinanceData(financeType, dispatch);
  };
};

const getfinance = (financeType, data) => {
  return {
    type: actionCreators.GET_FINANCE,
    financeType: financeType,
    data: data
  };
};
