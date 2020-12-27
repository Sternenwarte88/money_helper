import { React, Component } from 'react';
import { HeadTitle } from '../../components/UI/headTitle';
import classes from './income.module.css';

class Income extends Component {
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
			</>
		);
	}
}

export default Income;
