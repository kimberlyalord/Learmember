import React, { Component } from 'react';
import { Route, Switch, NavLink, Redirect } from 'react-router-dom';
import './App.css';
import SignupPage from '../SignupPage/SignupPage.jsx';
import LoginPage from '../LoginPage/LoginPage';
import TopicListPage from '../TopicListPage/TopicListPage';
import userService from '../../utils/userService';
import * as topicService from '../../utils/topicsService';

class App extends Component {
  state = {
    topics: [
      {
        _id: 1,
        name: 'Learn Ruby',
        category: 'Programming',
        learned: false,
        user: 'kimberly'
      },
      {
        _id: 2,
        name: 'Learn French',
        category: 'Foreign Language',
        learned: false,
        user: 'kimberly'
      },
    ],
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

  getAllTopics = async () => {
    const topics = await topicService.getAllTopicsAPI();
    this.setState({
      topics
    }, () => this.props.history.push('/'));
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
                <NavLink exact to='/'>SEE YOUR TOPICS</NavLink>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <NavLink exact to='/logout' onClick={this.handleLogout}>LOGOUT</NavLink>
                &nbsp;&nbsp;
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
            <Route exact path='/' render={({ history }) =>
            userService.getUser() ?
              <TopicListPage topics={this.state.topics} />
              :
              <Redirect to='/login' />
            } />
          </Switch>
        </main>
      </div>
    )
  }
}

export default App;