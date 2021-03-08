import React from 'react';
import classes from './loadingModal.module.css';
const LoadingModal = () => {
  return (
    <>
      <div className={classes.modal_background}>
        <div className={classes.loader}>
          <div className={classes.inner + ' ' + classes.one}></div>
          <div className={classes.inner + ' ' + classes.two}></div>
          <div className={classes.inner + ' ' + classes.three}></div>
        </div>
      </div>
    </>
  );
};

export default LoadingModal;
