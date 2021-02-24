import React from 'react';
import classes from './headTitle.module.css';

export const HeadTitle = props => {
  let welcome;
  if (props.site === 'Login' || props.site === 'Sign Up') {
    welcome = (
      <div>
        <h1>Money Helper</h1>
        <h2>Wilkommen zu deinem persönlichen Finanzgehilfen</h2>
      </div>
    );
  }
  return (
    <div className={classes.headTitle}>
      {welcome}
      <h2>{props.site}</h2>
    </div>
  );
};
