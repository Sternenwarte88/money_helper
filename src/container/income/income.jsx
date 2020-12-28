import { React, Component } from 'react';
import { HeadTitle } from '../../components/UI/headTitle';
import classes from './income.module.css';
import axios from 'axios';

import Input from '../../components/UI/Input';

class Income extends Component {
	state = {
		amount: 0,
		reason: '',
		date: '',
	};
	incomeHandler = () => {
		axios
			.post('http://localhost:28010/mh/finance', {
				amount: this.state.amount,
				reason: this.state.reason,
				date: this.state.date,
			})
			.then(res => {
				if (res.msg === 'accepted') {
					console.log(res.msg);
				}
			})
			.catch(err => {
				console.log(err);
			});
	};

	inputValueHandler = (event, name) => {
		const newState = { ...this.state, [name]: event.target.value };
		this.setState(newState);
	};

	componentDidUpdate(prevProps, prevState) {
		console.log(this.state);
	}

	render() {
		//TODO adding add income handler

		return (
			<>
				<HeadTitle site={'Einnahmen'} />
				<div className={classes.overview}>
					<div>Betrag</div>
					<div>Zweck</div>
					<div>Datum</div>
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

export default Income;
