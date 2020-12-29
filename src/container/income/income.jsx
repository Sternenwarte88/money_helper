import axios from 'axios';
import { Component, React } from 'react';
import { connect } from 'react-redux';
import { HeadTitle } from '../../components/UI/headTitle';
import Input from '../../components/UI/Input';
import ReveneuTableDisplay from './../../components/reveneutable/reveneuTable';
import classes from './income.module.css';

// TODO Style incomepage

class Income extends Component {
	state = {
		amount: 0,
		reason: '',
		date: '',
		id: this.props.id,
		revenueData: [],
	};
	//* Abfrage nach Einträgen in der Datenbank

	getIncome = () => {
		axios
			.post(
				'http://localhost:28010/mh/getIncome',
				{ id: this.state.id },
				{
					headers: {
						'Content-Type': 'application/json',
					},
					mode: 'cors',
				}
			)
			.then(response => {
				let data = response.data;
				this.setState({ ...this.state, revenueData: data });
				console.log(this.state.revenueData);
			})
			.catch(err => {
				console.log(err);
			});
	};
	//* Betrag in die Datenbank eintragen

	incomeHandler = () => {
		axios
			.post('http://localhost:28010/mh/finance', {
				amount: this.state.amount,
				reason: this.state.reason,
				date: this.state.date,
				id: this.props.id,
			})
			.then(res => {
				if (res.data.msg === 'accepted') {
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

	componentDidMount() {
		this.getIncome();
	}
	render() {
		let revenueData = this.state.revenueData;

		let reveneuTable = revenueData.map(data => {
			return (
				<ReveneuTableDisplay
					amount={data.amount}
					reason={data.reason}
					date={data.date}
				/>
			);
		});
		return (
			<>
				<HeadTitle site={'Einnahmen'} />
				<div className={classes.overview}>
					<h2>Betrag</h2> <h2>Zweck</h2> <h2>Datum</h2>
					{reveneuTable}
				</div>
				<div>
					<Input
						class={classes.input}
						type={'number'}
						name={this.state.amount}
						placeholder={299.99}
						changeValue={(event, name) => {
							this.inputValueHandler(event, 'amount');
						}}>
						{this.state.amount}
					</Input>
					<Input
						class={classes.input}
						type={'text'}
						name={this.state.reason}
						placeholder={'Wofür ist der Betrag?'}
						changeValue={(event, name) => {
							this.inputValueHandler(event, 'reason');
						}}>
						{this.state.reason}
					</Input>
					<Input
						class={classes.input}
						type={'date'}
						name={this.state.date}
						placeholder={'Zu welchem Datum?'}
						changeValue={(event, name) => {
							this.inputValueHandler(event, 'date');
						}}>
						{this.state.date}
					</Input>
				</div>
				<button onClick={this.incomeHandler}>Füge Einkommen hinzu</button>
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
