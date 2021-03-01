import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HeadTitle } from '../../components/UI/headTitle';
import Input from '../../components/UI/Input';
import * as actionCreators from '../../store/actions/actionCreators';
import Error from '../../utility/error';
import { confirmPassword, validMail, validPassword } from '../../utility/inputValidation';
import classes from '../signup/signup.module.css';
import Banner from '../../components/UI/Banner/banner';

class signUp extends Component {
  state = {
    email: ' ',
    password: ''
  };

  inputChangedHandler = (event, name) => {
    const newState = { ...this.state, [name]: event.target.value };
    this.setState(newState);
  };

  loginHandler = () => {
    this.props.history.push('/');
  };

  render () {
    const email = 'email';
    const password = 'password';
    const confirmPWD = 'confirmPWD';

    let disabled = '';

    if (this.state.password !== this.state.confirmPWD || this.state.password.length <= 0) {
      disabled = 'disabled';
    }

    return (
      <>
        <Banner />
        <div className={classes.signUp}>
          <HeadTitle site={'Sign Up'} />
          <div className={classes.form}>
            <label htmlFor={email}>Deine E-Mail: </label>
            <Input
              class={classes.input}
              isValid={validMail(this.state.email)}
              name={email}
              type={email}
              placeholder='example@example.de'
              changeValue={(event) => this.inputChangedHandler(event, email)}>
              {this.state.email}
            </Input>
            <label htmlFor='password'>Lege Dein Passwort fest</label>
            <Input
              class={classes.input}
              isValid={validPassword(this.state.password)}
              name={password}
              type={password}
              value={this.value}
              placeholder='Dein Passwort'
              changeValue={(event) => this.inputChangedHandler(event, 'password')}>
              {this.state.password}
            </Input>
            <label htmlFor='confirmPWD'>Bestätige dein Passwort</label>
            <Input
              class={classes.input}
              isValid={confirmPassword(this.state.password, this.state.confirmPWD)}
              name={confirmPWD}
              type={password}
              value={this.value}
              placeholder='Bestätige dein Passwort'
              changeValue={(event) => this.inputChangedHandler(event, 'confirmPWD')}>
              {this.state.password}
            </Input>
            <Error />
            <div>
              <button
                disabled={disabled}
                onClick={(state, props) => {
                  this.props.signUp(this.state, this.props);
                }}>
                {' '}
                Erstelle Account{' '}
              </button>
              <button onClick={this.loginHandler}>Hast Du schon einen Account?</button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (state, props) => {
      dispatch(actionCreators.authActions.signUpHandler(state, props));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(signUp);
