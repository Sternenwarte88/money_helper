import { Component, React } from 'react';
import { connect } from 'react-redux';
import axios from '../../axiosDefault';
import { HeadTitle } from '../../components/UI/headTitle';
import Input from '../../components/UI/Input';
import handLeft from '../../img/icons/hand-point-left-solid.svg';
import handRight from '../../img/icons/hand-point-right-regular.svg';
import ReveneuTableDisplay from '../../components/reveneutable/reveneuTable';
import classes from './bills.module.css';
import * as actionCreators from '../../store/actions/actionCreators';

// TODO Style billspage
// TODO Add repeat option for insert data

class bills extends Component {
	constructor(props) {
		super(props);
		this.state = {
			amount: 0,
			reason: '',
			date: '',
			id: this.props.id,
		};
		this.page = 1;
		this.items = 10;
	}

	//* Betrag in die Datenbank eintragen

	billsHandler = () => {
		console.log(new Date(this.state.date));
		axios
			.post('http://localhost:28010/mh/bills', {
				amount: this.state.amount,
				reason: this.state.reason,
				date: new Date(this.state.date).toLocaleDateString('de-DE'),
				id: this.props.id,
			})
			.then(res => {
				console.log(res);
				if (res.status === 200) {
					return;
				}
			})
			.catch(err => {
				console.log(err);
			});
	};

	inputValueHandler = (event, name) => {
		const newstate = { ...this.state, [name]: event.target.value };
		this.setState(newstate);
	};

	componentDidMount() {
		this.props.getFinanceData('bills');
	}
	render() {
		//*	output for bills, sorted and sliced for pagination

		let revenueData = '';
		let reveneuTable = revenueData;
		let itemsToShow = (this.page - 1) * this.items;
		let lastItems = this.page * this.items;
		let sum = 0;

		if (this.props.reveneuData.bills) {
			revenueData = this.props.reveneuData.bills;
			revenueData.map(data => {
				return (sum += data.amount);
			});

			reveneuTable = revenueData

				.sort((a, b) => {
					if (a.date < b.date) {
						return -1;
					}
					if (a.date > b.date) {
						return 1;
					}
					return 0;
				})
				.slice(itemsToShow, lastItems)
				.map(data => {
					return (
						<ReveneuTableDisplay
							amount={data.amount}
							reason={data.reason}
							date={data.date}
							key={data._id}
							clicked={(itemID, financeType, oldState) => {
								this.props.deleteBills(
									data._id,
									'bills',
									this.props.reveneuData.bills
								);
							}}
						/>
					);
				});
		}

		let reasonHead = 'reasonHead';
		let amountHead = 'amountHead';
		let dateHead = 'dateHead';
		return (
			<>
				<div>
					<HeadTitle site={'Ausgaben'} />
					<div className={classes.itemCounter}>
						Angezeigte Elemente:
						<select
							name='items'
							id=''
							onChange={event => {
								this.items = event.target.value;
								this.getbills();
							}}>
							<option value='10'>10</option>
							<option value='25'>25</option>
							<option value='50'>50</option>
						</select>
					</div>
					<div className={classes.overview}>
						<h2 className={reasonHead}>Zweck</h2>
						<h2 className={amountHead}>Betrag</h2>
						<h2 className={dateHead}>Datum</h2>
						<div></div>
						{reveneuTable}
					</div>
					<div>Sum = {sum} €</div>

					<div className={classes.paginationControll}>
						<div className={classes.pageBack}>
							<img
								src={handLeft}
								alt=''
								srcSet=''
								onClick={() => {
									this.page >= 2 ? (this.page -= 1) : (itemsToShow = 0);
								}}
							/>
						</div>
						<div className={classes.pageForward}>
							<img
								src={handRight}
								alt=''
								srcSet=''
								onClick={() => {
									revenueData.length % lastItems === revenueData.length
										? (lastItems = revenueData.length)
										: (this.page += 1);
								}}
							/>
						</div>
					</div>
					<div className={classes.form}>
						<Input
							class={classes.input_bills}
							type={'number'}
							name={this.state.amount}
							placeholder={299.99}
							changeValue={(event, name) => {
								this.inputValueHandler(event, 'amount');
							}}>
							{this.state.amount}
						</Input>
						<Input
							class={classes.input_bills}
							type={'text'}
							name={this.state.reason}
							placeholder={'Wofür ist der Betrag?'}
							changeValue={(event, name) => {
								this.inputValueHandler(event, 'reason');
							}}>
							{this.state.reason}
						</Input>
						<Input
							class={classes.input_bills}
							type={'date'}
							name={this.state.date}
							placeholder={'dd-mm-yyyy'}
							changeValue={(event, name) => {
								this.inputValueHandler(event, 'date');
							}}>
							{this.state.date}
						</Input>
					</div>
					<button className={classes.submitBtn} onClick={this.billsHandler}>
						Füge Ausgaben hinzu
					</button>
				</div>
			</>
		);
	}
}

const mapStateToProps = state => {
	return {
		id: state.id,
		reveneuData: state.reveneuData,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getFinanceData: financeType =>
			dispatch(actionCreators.financeActions.getFinance(financeType)),
		deleteBills: (itemID, financeType, oldState) =>
			dispatch(
				actionCreators.financeActions.deleteHandler(
					itemID,
					financeType,
					oldState
				)
			),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(bills);
