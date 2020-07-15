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
          <span className="title">LEARMEMBER</span>
          <nav>
            {userService.getUser() ?
              <>
                {userService.getUser().username ? `Welcome, ${userService.getUser().username}` : ''}
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
        <main>
          <Switch>
            <Route exact path='/signup' render={({ history }) =>
              <SignupPage history={history} handleSignupOrLogin={this.handleSignupOrLogin} />
            } />
            <Route exact path='/login' render={({ history }) =>
              <LoginPage history={history} handleSignupOrLogin={this.handleSignupOrLogin} />
            } />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;