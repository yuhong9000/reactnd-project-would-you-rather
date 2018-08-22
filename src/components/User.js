import React, { Component } from 'react'
import { connect } from 'react-redux'
import { totalScore, totalAnswers, totalQuestions } from './LeaderBoard'

class User extends Component {

  render() {
    const { user } = this.props;
    return (
      <div className='container white-background'>
          <div className="icon small-margin flex-grow-1">
            <img src={user.avatarURL} alt={`Avatar of ${user.name}`} />
          </div>
          <div className='userbox vertical flex-grow-2 border-left'>
            <div className='user-title'>{user.name}</div>
            <div className='flexbox'>
              <p className='flex-grow-1'>Answered questions</p>
              <p>{totalAnswers(user)}</p>
            </div>
            <div className='flexbox'>
              <p className='flex-grow-1'>Created questions</p>
              <p>{totalQuestions(user)}</p>
            </div>
          </div>
          <div className='userbox vertical flex-grow-1 border-left'>
            <div className='container vertical'>
              <div className='title'>Total Score</div>
              <div className='content'>
                <span className='score'>{totalScore(user)}</span>
              </div>
            </div>
          </div>
      </div>
    )
  }
}

function mapStateToProps({ users }, { id }){
  return {
    user: users[id]
  }
}

export default connect(mapStateToProps)(User);
