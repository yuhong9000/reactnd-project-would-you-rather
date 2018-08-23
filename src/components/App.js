import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import Nav from './Nav'
import Login from './Login'
import QuestionPage from './QuestionPage'
import NewQuestion from './NewQuestion'
import LeaderBoard from './LeaderBoard'

class App extends Component {

  componentDidMount () {

    const cachedHits = sessionStorage.getItem('authedUser');
    const authedUser = cachedHits? cachedHits : '';
    this.props.dispatch(handleInitialData(authedUser));
  }

  render() {
    const { SignedIn, Loading, avatarURL, name } = this.props;

    return (
      <Router>
        <div className="vertical">
          {Loading === true
            ? null
            : SignedIn === false
              ? <Route path='/' component={Login} />
              : <div>
                  <Nav avatar={avatarURL} name={name}/>
                  <div>
                    <Route path='/' exact component={Dashboard} />
                    <Route path='/question/:question_id' component={QuestionPage} />
                    <Route path='/add' component={NewQuestion} />
                    <Route path='/leaderboard' component={LeaderBoard} />
                  </div>
                </div>
          }
        </div>
      </Router>
    );
  }
}

function mapStateToProps ({ authedUser, users }) {
  const SignedIn = authedUser !== null && authedUser !== '';
  return {
    Loading: authedUser === null,
    SignedIn,
    authedUser: authedUser === null? '' : authedUser,
    avatarURL: SignedIn ? users[authedUser].avatarURL : '',
    name: SignedIn? users[authedUser].name : '',
  }
}

export default connect(mapStateToProps)(App);
