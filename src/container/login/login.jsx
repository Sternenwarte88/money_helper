import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HeadTitle } from '../../components/UI/headTitle';
// import { Button, Checkbox, Form } from 'semantic-ui-react';
import Input from '../../components/UI/Input';
import * as actionCreators from '../../store/actions/actionCreators';
import Error from '../../utility/error';
import { validMail, validPassword } from '../../utility/inputValidation';
import classes from './login.module.css';
import Banner from '../../components/UI/Banner/banner';

class Login extends Component {
  constructor () {
    super();
    this.state = {
      email: ' ',
      password: ' ',
      deferredPrompt: ''
    };
    this.timer = '';
  }

  inputChangedHandler = (event, name) => {
    const newstate = {
      ...this.state,
      [name]: event.target.value
    };
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.setState(newstate), 500);
  };

  signupPageHandler = () => {
    this.props.history.push('/signUp');
  };

  render () {
    const email = 'email';
    const password = 'password';

    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      const newState = {
        ...this.state,
        deferredPrompt: event
      };
      this.setState(newState);
    });
    return (
      <>
        <Banner />
        <div className={classes.login}>
          <HeadTitle site={'Login'} />

          <div className={classes.form}>
            <label htmlFor={email}>Deine E-Mail: </label>
            <Input
              class={classes.input}
              name={email}
              type={email}
              isValid={validMail(this.state.email)}
              placeholder='example@example.de'
              changeValue={(event, name) => this.inputChangedHandler(event, 'email')}>
              {this.state.email}
            </Input>
            <label htmlFor='password'>Dein Passwort:</label>
            <Input
              class={classes.input}
              name={password}
              type={password}
              isValid={validPassword(this.state.password)}
              value={this.value}
              placeholder='Dein Passwort'
              changeValue={(event, name) => this.inputChangedHandler(event, 'password')}>
              {this.state.password}
            </Input>
            <Error />
            {/* <Button.Group>
              <Button onClick={this.signupPageHandler}>register </Button>
              <Button.Or />
              <Button
                positive
                onClick={(state, props) => {
                  this.props.loginAction(this.state, this.props);
                }}>
                Login
              </Button>
            </Button.Group> */}
            <div>
              <button
                type='submit'
                className={classes.loginBtn}
                onClick={(state, props) => {
                  this.props.loginAction(this.state, this.props);
                }}>
                Login
              </button>
              <button className={classes.signUpBtn} onClick={this.signupPageHandler}>
                Noch keinen Account?
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loginState,
    error: state.error,
    id: state.id
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginAction: (state, props) => dispatch(actionCreators.authActions.login(state, props))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
