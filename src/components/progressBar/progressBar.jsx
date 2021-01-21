import React from 'react';
import classes from './progressBar.module.css';

const ProgressBar = props => {
	let sumFinance = props.income + props.bills;
	let percentIncome = props.income / sumFinance;
	let percentBills = props.bills / sumFinance;
	return (
		<>
			<h1>Summary</h1>
			<div className={classes.progressBarContainer}>
				<div className={classes.progressBar}>
					<div
						className={classes.incomeBar}
						style={{ width: `calc(100% * ${percentIncome})` }}></div>
					<div
						className={classes.billsBar}
						style={{ width: `calc(100% * ${percentBills})` }}></div>
				</div>
			</div>
			<div className={classes.summary}>
				<div className={classes.income}>Einkommen: {props.income}</div>
				<div className={classes.bills}>Ausgaben: {props.bills}</div>
			</div>
		</>
	);
};

export default ProgressBar;
