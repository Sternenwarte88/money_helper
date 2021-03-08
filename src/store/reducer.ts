import * as actionTypes from './actions/actionCreators';
const initialState = {
  email: '',
  loginState: false,
  id: '',
  auth: false,
  financeData: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        email: action.loginInformation.email,
        loginState: action.loginInformation.loggedIn,
        id: action.loginInformation.id
      };
    case actionTypes.GET_FINANCE:
      if (action.financeType === 'bills') {
        return {
          ...state,

          financeData: {
            income: state.financeData.income,
            bills: action.data.bills
          }
        };
      } else if (action.financeType === 'income') {
        return {
          ...state,

          financeData: {
            income: action.data.income,
            bills: state.financeData.bills
          }
        };
      } else if (action.financeType === 'completeFinanceData') {
        return {
          ...state,

          financeData: {
            income: action.data.income,
            bills: action.data.bills
          }
        };
      }
      break;

    case actionTypes.INSERT_FINANCE:
      return {
        ...state,
        financeData: {
          [action.financeType]: {
            amount: action.newFinanceData.amount,
            reason: action.newFinanceData.reason,
            date: action.newFinanceData.date
          }
        }
      };

    case actionTypes.DELETE_ITEM:
      if (action.financeType === 'bills') {
        return {
          ...state,

          financeData: {
            income: state.financeData.income,
            bills: action.filteredFinance
          }
        };
      } else if (action.financeType === 'income') {
        return {
          ...state,

          financeData: {
            income: action.filteredFinance,
            bills: state.financeData.bills
          }
        };
      }
      break;
    case actionTypes.ERROR:
      return {
        ...state,
        error: {
          status: action.error.status,
          message: action.error.message
        }
      };

    case actionTypes.LOADING:
      return {
        ...state,
        loading: action.loading
      };

    default:
      return state;
  }
};

export default reducer;
