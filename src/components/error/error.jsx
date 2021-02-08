import React from 'react';
import classes from './error.module.css';

const ErrorComponent = props => {
	return (
		<div className={classes.error_Box}>
			<h3>{props.errorMessage}</h3>
		</div>
	);
};

export default ErrorComponent;
