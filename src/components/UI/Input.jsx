import React from 'react';
import classes from './input.module.css';

const Input = (props) => {
  const inputClasses = [];
  const isValid = props.isValid;
  if (!isValid) {
    inputClasses.push(classes.invalid);
  }
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
