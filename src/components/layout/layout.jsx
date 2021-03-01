/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import accountBtn from '../../img/icons/user-cog-solid.svg';
import backBtn from '../../img/icons/arrow-alt-circle-left-solid.svg';
import classes from './layout.module.css';
import { withRouter } from 'react-router';
import LoadingModal from './../UI/loadingModal';
import { connect } from 'react-redux';

const Layout = (props) => {
  let loadingModal = '';

  if (props.loading) {
    loadingModal = <LoadingModal />;
  } else {
    loadingModal = '';
  }

  return (
    <>
      <div className={classes.header}>
        <img onClick={props.history.goBack} className={classes.backBtn} src={backBtn} alt='back-button' />
        <img className={classes.accountBtn} src={accountBtn} alt='accountBtn-button' />
      </div>
      {loadingModal}
      <div>{props.children}</div>
    </>
  );
};

const mapStateToProp = (state) => {
  return {
    loading: state.loading
  };
};

export default connect(mapStateToProp)(withRouter(Layout));
