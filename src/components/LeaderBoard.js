import React, { Component } from 'react'
import { connect } from 'react-redux'
import User from './User'

export const totalQuestions = (user) => {
  return user.questions.length;
}

export const totalAnswers = (user) => {
  return Object.keys(user.answers).length;
}

export const totalScore = (user) => {
  return totalQuestions(user) + totalAnswers(user);
}

class LeaderBoard extends Component {
  render() {
    const { sortedUid } = this.props;
    
    return(
      <div>
        <ul>
          {sortedUid.map((id)=>(
            <li key={id}>
              <User id={id} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ users }) {

  return {
    sortedUid: Object.keys(users).sort((a,b)=>totalScore(users[a]) - totalScore(users[b])).reverse(),
  }
}
export default connect(mapStateToProps)(LeaderBoard);
