import { Component, React } from 'react';
import { connect } from 'react-redux';
import axios from '../../axiosDefault';
import { HeadTitle } from '../../components/UI/headTitle';
import Input from '../../components/UI/Input';
import handLeft from '../../img/icons/hand-point-left-solid.svg';
import handRight from '../../img/icons/hand-point-right-regular.svg';
import ReveneuTableDisplay from './../../components/reveneutable/reveneuTable';
import classes from './income.module.css';

// TODO Style incomepage
// TODO Add repeat option for insert data

class Income extends Component {
	constructor(props) {
		super(props);
		this.state = {
			amount: 0,
			reason: '',
			date: '',
			id: this.props.id,
			revenueData: [],
		};
		this.page = 1;
		this.items = 10;
	}

	//* Abfrage nach Einträgen in der Datenbank
	getIncome = () => {
		axios
			.get('/getIncome', {
				params: {
					items: this.items,
					page: this.page,
				},
			})
			.then(response => {
				let data = response.data.finance.income;
				this.setState({ ...this.state, revenueData: data });
				console.log(response.data.finance.income);
			})
			.catch(err => {
				console.log(err);
			});
	};
	//* Betrag in die Datenbank eintragen

	incomeHandler = () => {
		console.log(new Date(this.state.date));
		axios
			.post('http://localhost:28010/mh/finance', {
				amount: this.state.amount,
				reason: this.state.reason,
				date: new Date(this.state.date).toLocaleDateString('de-DE'),
				id: this.props.id,
			})
			.then(res => {
				console.log(res);
				if (res.status === 200) {
					this.getIncome();
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

	incomeDeleteHandler = incomeID => {
		axios
			.delete('/delete', {
				params: {
					incomeID: incomeID,
				},
			})
			.then(res => {
				console.log(res);
				if (res.status === 200) {
					this.getIncome();
					console.log(res.status);
				}
			})
			.catch(err => {
				console.log(err);
			});
	};

	componentDidMount() {
		this.getIncome();
	}
	render() {
		//*	output for income, sorted and sliced for pagination

		let revenueData = this.state.revenueData;

		let sum = 0;

		if (revenueData) {
			revenueData.map(data => {
				return (sum += data.amount);
			});
		}

		let itemsToShow = (this.page - 1) * this.items;
		let lastItems = this.page * this.items;

		let reveneuTable = revenueData

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
						clicked={incomeID => {
							this.incomeDeleteHandler(data._id);
						}}
					/>
				);
			});

		let reasonHead = 'reasonHead';
		let amountHead = 'amountHead';
		let dateHead = 'dateHead';
		return (
			<>
				<div>
					<HeadTitle site={'Einnahmen'} />
					<div className={classes.itemCounter}>
						Angezeigte Elemente:
						<select
							name='items'
							id=''
							onChange={event => {
								this.items = event.target.value;
								this.getIncome();
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
									this.getIncome();
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
									this.getIncome();
								}}
							/>
						</div>
					</div>
					<div className={classes.form}>
						<Input
							class={classes.input_income}
							type={'number'}
							name={this.state.amount}
							placeholder={299.99}
							changeValue={(event, name) => {
								this.inputValueHandler(event, 'amount');
							}}>
							{this.state.amount}
						</Input>
						<Input
							class={classes.input_income}
							type={'text'}
							name={this.state.reason}
							placeholder={'Wofür ist der Betrag?'}
							changeValue={(event, name) => {
								this.inputValueHandler(event, 'reason');
							}}>
							{this.state.reason}
						</Input>
						<Input
							class={classes.input_income}
							type={'date'}
							name={this.state.date}
							placeholder={'dd-mm-yyyy'}
							changeValue={(event, name) => {
								this.inputValueHandler(event, 'date');
							}}>
							{this.state.date}
						</Input>
					</div>
					<button className={classes.submitBtn} onClick={this.incomeHandler}>
						Füge Einkommen hinzu
					</button>
				</div>
			</>
		);
	}
}

const mapStateToProps = state => {
	return {
		id: state.id,
	};
};

export default connect(mapStateToProps)(Income);
