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
  categoryName: ['Art', 'Biology', 'Business', 'Chemistry', 'Computer Science', 'Economics', 'General Science', 'Geography', 'Health & Medicine', 'History', 'Law', 'Languages', 'Literature', 'Mathematics', 'Music', 'Other', 'Philosophy', 'Physical Education', 'Physics', 'Political Science', 'Programming', 'Psychology', 'Sociology', 'Statistics']
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
    }, () => this.getAllTopics());
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

  handleDeleteTopic = async idOfTopicToDelete => {
    await topicService.deleteTopicAPI(idOfTopicToDelete);
    this.setState(state => ({
      topics: state.topics.filter(topic => topic._id !== idOfTopicToDelete)
    }), () => this.props.history.push('/'));
  }

  toggleFilterLearned = async () => {
    this.componentDidMount();
    const topics = await topicService.getAllTopicsAPI();
    this.setState(state => ({
      topics: state.topics.filter(topic => topic.learned)
    }), () => this.props.history.push('/'));
  }

  toggleFilterUnlearned = async () => {
    this.componentDidMount();
    const topics = await topicService.getAllTopicsAPI();
    this.setState(state => ({
      topics: state.topics.filter(topic => topic.learned == false)
    }), () => this.props.history.push('/'));
  }

  render() {
    return (
      <div className="App">
        <header>
          <span className="title">LEARMEMBER</span>
          <nav>
            {userService.getUser() ?
              <>
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
        <div className='greeting-container'>
          <>
            {userService.getUser() ?
              <div>
                <div className='greeting'>{userService.getUser() ? `Welcome, ${userService.getUser().username}!` : ''}
                  <div className='filter'>Filter by:&nbsp;&nbsp;
                    <button id='learned-selector' onClick={() => this.toggleFilterLearned()}>Learned</button>
                    &nbsp;&nbsp;|&nbsp;&nbsp;
                    <button id='unlearned-selector' onClick={() => this.toggleFilterUnlearned()}>Unlearned</button>
                  </div>
                </div>
              </div>
              :
              <div className='about'>"Learmember" is a portmanteau of "learn" and "remember." This project is designed to be a place where you can keep track of things you want to learn. Perhaps you are out and about and hear about something that sounds interesting, but you don't have time to drop everything and learn about it, so you go about your day and forget all about it. With Learmember, you can pull out your phone and create a note for yourself so that you can remember to go learn about that topic when you have time! You can also use Learmember to keep track of things you've learned and save resources to learn about your topics.</div>
            }
          </>
        </div>
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
                <TopicListPage topics={this.state.topics} handleDeleteTopic={this.handleDeleteTopic} />
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
        <footer>&nbsp;&nbsp;&nbsp;&nbsp;Created by Kimberly A. Lord 2020</footer>
      </div>
    )
  }
}

export default App;