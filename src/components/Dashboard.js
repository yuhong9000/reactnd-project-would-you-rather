import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class Dashboard extends Component {
  state = {
    status: 'unanswered',
  }

  handleUnanswerClick = (e) => {
    this.setState({
      status: 'unanswered',
    });
  }

  handleAnswerClick = (e) => {
    this.setState({
      status: 'answered',
    });
  }

  render() {
    const { status } = this.state;
    const { user } = this.props;
    
    return (
      <div className='container vertical margin-20'>
        <div className='flexbox'>
          <div
            onClick={this.handleUnanswerClick}
            className={`flex-grow-1 answer-btn ${
              status === 'unanswered'? 'answer-active':''
            }`}>Unasnwered Questions</div>
          <div
            onClick={this.handleAnswerClick}
            className={`flex-grow-1 answer-btn ${
              status === 'answered'? 'answer-active':''
            }`}>Answered Questions</div>
        </div>
        <div className='content'>
          <ul className='margin-auto'>
            {status === 'unanswered'
              ? this.props.questionIds.filter((id) => !(Object.keys(user.answers).includes(id))).map((id) => (
                <li key={id}>
                  <Question key={id} id={id} display={true}/>
                </li>))
              : this.props.questionIds.filter((id) => (Object.keys(user.answers).includes(id))).map((id) => (
                <li key={id}>
                  <Question key={id} id={id} display={true}/>
                </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ questions, users, authedUser }) {
  return {
    questionIds: Object.keys(questions).sort((a,b) => questions[b].timestamp - questions[a].timestamp),
    user: users[authedUser],
  }
}

export default connect(mapStateToProps)(Dashboard)
