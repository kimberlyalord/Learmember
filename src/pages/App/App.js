import React, { Component } from 'react';
import { Route, Switch, NavLink, Redirect } from 'react-router-dom';
import './App.css';
import SignupPage from '../SignupPage/SignupPage.jsx';
import LoginPage from '../LoginPage/LoginPage';
import userService from '../../utils/userService';


class App extends Component {
  state = {
    user: userService.getUser(),
  }

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
        <header>
          LEARMEMBER
          <nav>
            {userService.getUser() ?
              <>
                {userService.getUser().username ? `Welcome, ${userService.getUser().username.toUpperCase()}` : ''}
                &nbsp;&nbsp;&nbsp;
                <NavLink exact to='/logout' onClick={this.handleLogout}>LOGOUT</NavLink>
                &nbsp;&nbsp;&nbsp;
              </>
              :
              <>
                <NavLink exact to='/signup'>SIGNUP</NavLink>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <NavLink exact to='/login'>LOGIN</NavLink>
                &nbsp;&nbsp;
              </>
            }
          </nav>
        </header>
      </div>
    );
  }
}

export default App;
