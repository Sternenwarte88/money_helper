import React from 'react';

const Input = props => {
	return (
		<input
			
			className={props.class}
			type={props.type}
			name={props.name}
			placeholder={props.placeholder}
			value={props.value}
			onChange={props.changeValue}
		/>
	);
};

export default Input;
