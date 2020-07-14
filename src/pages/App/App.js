import React, { Component } from 'react';
import { Route, Switch, NavLink, Redirect } from 'react-router-dom';
import './App.css';
import SignupPage from '../SignupPage/SignupPage.jsx';
import LoginPage from '../LoginPage/LoginPage';
import userService from '../../utils/userService';


class App extends Component {


  handleLogout = () => {
    userService.logout();
    this.setState({
      user: null
    });
  }

  handleSignupOrLogin = () => {
    this.setState({
      user: userService.getUser()
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          LEARMEMBER
        </header>
      </div>
    );
  }
}

export default App;
