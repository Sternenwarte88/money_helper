import React from 'react';
import classes from './input.module.css';

const Input = props => {
	let inputClasses = [];
	let isValid = props.isValid;
	if (!isValid) {
		inputClasses.push(classes.invalid);
	}
	console.log(isValid);
	return (
		<input
			className={classes.input + ' ' + inputClasses.join(' ')}
			type={props.type}
			name={props.name}
			placeholder={props.placeholder}
			value={props.value}
			onChange={props.changeValue}
		/>
	);
};

export default Input;
