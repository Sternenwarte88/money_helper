import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import finance from './container/finance/finance';
import Login from './container/login/login';
import menu from './container/menu/menu';
import Signup from './container/signup/signup';

// TODO implement an Optionsmenu
// TODO Implement a logout function

class app extends Component {
  render () {
    if (navigator.onLine === false) {
      return (
        <div>
          <h1>
            You are Offline! <br /> Please get a internet connection and try
            again
          </h1>
        </div>
      );
    }
    let mainMenu = (
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/signup' exact component={Signup} />
      </Switch>
    );
    // if (auth) {
    mainMenu = (
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/signup' exact component={Signup} />
        <Route path='/menu' exact component={menu} />
        <Route path='/income' exact component={finance} />
        <Route path='/bills' exact component={finance} />
      </Switch>
    );
    // }
    return <>{mainMenu}</>;
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loginState
  };
};

export default connect(mapStateToProps)(withRouter(app));
