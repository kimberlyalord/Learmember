import React, { Component } from 'react';
import { Route, Switch, NavLink, Redirect } from 'react-router-dom';
import './App.css';
import SignupPage from '../SignupPage/SignupPage.jsx';
import LoginPage from '../LoginPage/LoginPage';
import TopicListPage from '../TopicListPage/TopicListPage';
import AddTopicPage from '../AddTopicPage/AddTopicPage';
import EditTopicPage from '../EditTopicPage/EditTopicPage';
import userService from '../../utils/userService';
import * as topicService from '../../utils/topicsService';

const categories = {
  categoryName: ['Programming', 'Foreign Language', 'Other']
};

class App extends Component {
  state = {
    topics: [],
    user: userService.getUser(),
  }

  componentDidMount() {
    this.getAllTopics();
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

  handleAddTopic = async newTopicData => {
    await topicService.createTopicAPI(newTopicData);
    this.getAllTopics();
  }

  handleUpdateTopic = async updatedTopicData => {
    await topicService.updateTopicAPI(updatedTopicData);
    this.getAllTopics();
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
                <NavLink exact to='/add'>ADD NEW TOPIC</NavLink>
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
            <Route exact path='/add' render={() =>
            userService.getUser() ?
              <AddTopicPage handleAddTopic={this.handleAddTopic} categories={categories} />
              :
              <Redirect to='/login' />
            } />
            <Route exact path='/update' render={({ history, location }) =>
              userService.getUser() ?
                <EditTopicPage handleUpdateTopic={this.handleUpdateTopic} categories={categories} location={location} />
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