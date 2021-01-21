import React from 'react';
import { HeadTitle } from '../../components/UI/headTitle';
import { connect } from 'react-redux';
import ReveneuTableDisplay from './../../components/reveneutable/reveneuTable';
import classes from './menu.module.css';
import ProgressBar from '../../components/progressBar/progressBar';
import * as actionCreators from '../../store/actions/actionCreators';

// TODO: Make overview
// TODO: Display a little overview of 3 items from each income and bills
// TODO: Style everything

class Menu extends React.Component {
	componentDidMount() {
		this.props.getFinanceData('income');
		this.props.getFinanceData('bills');
	}
	render() {
		let revenueData;
		let reveneuTableIncome;
		let reveneuTableBills;
		let sumIncome = 0;
		let sumBills = 0;

		console.log(sumIncome);
		console.log(sumBills);

		if (this.props.reveneuData.income) {
			revenueData = this.props.reveneuData.income;

			revenueData.map(data => {
				return (sumIncome += data.amount);
			});

			reveneuTableIncome = revenueData

				.sort((a, b) => {
					if (a.date < b.date) {
						return -1;
					}
					if (a.date > b.date) {
						return 1;
					}
					return 0;
				})
				.slice(0, 2)
				.map(data => {
					return (
						<ReveneuTableDisplay
							amount={data.amount}
							reason={data.reason}
							date={data.date}
							key={data._id}
						/>
					);
				});
		}
		if (this.props.reveneuData.bills) {
			revenueData = this.props.reveneuData.bills;
			revenueData.map(data => {
				return (sumBills += data.amount);
			});

			reveneuTableBills = revenueData

				.sort((a, b) => {
					if (a.amount < b.amount) {
						return -1;
					}
					if (a.amount > b.amount) {
						return 1;
					}
					return 0;
				})
				.slice(0, 2)
				.map(data => {
					return (
						<ReveneuTableDisplay
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
						{reveneuTableIncome}
					</div>
					<div className={classes.billsTable}>
						<h3>Ausgaben</h3>
						{reveneuTableBills}
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
		reveneuData: state.reveneuData,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getFinanceData: financeType =>
			dispatch(actionCreators.financeActions.getFinance(financeType)),
	};
};
export default connect(mapStateToProp, mapDispatchToProps)(Menu);
