import React from 'react';
import ErrorComponent from '../components/error/error';
import { connect } from 'react-redux';

const Error = props => {
  let errorHandler = '';

  if (props.error) {
    errorHandler = <ErrorComponent errorMessage={props.error.message} />;
  } else {
    errorHandler = '';
  }
  return errorHandler;
};

const mapStateToProps = state => {
  return { error: state.error };
};

export default connect(mapStateToProps)(Error);
