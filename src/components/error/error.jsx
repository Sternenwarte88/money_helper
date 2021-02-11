import React from 'react';
import classes from './error.module.css';

const ErrorComponent = props => {
	let errorBox;
	if (props.errorMessage) {
		console.log(props.errorMessage);
		errorBox = classes.error_Box;
	} else {
		errorBox = classes.empty;
	}
	return (
		<div className={errorBox}>
			<h3>{props.errorMessage}</h3>
		</div>
	);
};

export default ErrorComponent;
