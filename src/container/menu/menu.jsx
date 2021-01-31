import React from 'react';
import { HeadTitle } from '../../components/UI/headTitle';
import { connect } from 'react-redux';
import classes from './menu.module.css';
import ProgressBar from '../../components/progressBar/progressBar';
import * as actionCreators from '../../store/actions/actionCreators';
import FinanceSummaryItem from './../../components/reveneutable/financeSummaryItem';

class Menu extends React.Component {
  componentDidMount() {
    this.props.getFinanceData('completeFinanceData');
  }
  render() {
    let financeData;
    let financeDataIncome;
    let financeDataBills;
    let sumIncome = 0;
    let sumBills = 0;

    if (this.props.financeData.income) {
      financeData = this.props.financeData.income;

      financeData.map(data => {
        return (sumIncome += data.amount);
      });

      financeDataIncome = financeData

        .sort((a, b) => {
          if (a.date < b.date) {
            return -1;
          }
          if (a.date > b.date) {
            return 1;
          }
          return 0;
        })
        .slice(0, 3)
        .map(data => {
          return (
            <FinanceSummaryItem
              amount={data.amount}
              reason={data.reason}
              date={data.date}
              key={data._id}
            />
          );
        });
    }
    if (this.props.financeData.bills) {
      financeData = this.props.financeData.bills;
      financeData.map(data => {
        return (sumBills += data.amount);
      });

      financeDataBills = financeData

        .sort((a, b) => {
          if (a.amount < b.amount) {
            return -1;
          }
          if (a.amount > b.amount) {
            return 1;
          }
          return 0;
        })
        .slice(0, 3)
        .map(data => {
          return (
            <FinanceSummaryItem
              amount={data.amount}
              reason={data.reason}
              date={data.date}
              key={data._id}
            />
          );
        });
    }
    const incomePageHandler = () => {
      this.props.history.push('/income');
    };
    const billsPageHandler = () => {
      this.props.history.push('/bills');
    };
    return (
      <>
        <HeadTitle site={'Menü'} />
        <div>
          <button>Übersicht</button>
          <button onClick={incomePageHandler}>Einnahmen</button>
          <button onClick={billsPageHandler}>Ausgaben</button>
        </div>
        <div className={classes.financeTable}>
          <div className={classes.incomeTable}>
            <h3>Einkommen</h3>
            {financeDataIncome}
          </div>
          <div className={classes.billsTable}>
            <h3>Ausgaben</h3>
            {financeDataBills}
          </div>
        </div>
        <ProgressBar income={sumIncome} bills={sumBills} />
      </>
    );
  }
}

const mapStateToProp = (state, ownProps) => {
  return {
    loggedIn: state.loggedIn,
    financeData: state.financeData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getFinanceData: financeType =>
      dispatch(actionCreators.financeActions.getFinance(financeType)),
  };
};
export default connect(mapStateToProp, mapDispatchToProps)(Menu);
