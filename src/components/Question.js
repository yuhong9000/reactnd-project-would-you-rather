import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestionInfo } from '../util/helper'
import { updateQuestionAnswer } from '../actions/shared'
import { withRouter } from 'react-router-dom'

class Question extends Component{
  state = {
    answer: 'optionOne',
    submit_disabled: false,
  }

  disableSubmit = (flag) => {
    this.setState({
      submit_disabled: flag
    })
  }

  handleChange = (e) => {
    const val = e.target.value

    this.setState(() => ({
      answer: val
    }))
  }

  handleViewPoll = () => {
    const { history, id } = this.props;
    history.push(`/question/${id}`);
  }

  handleSubmit = (e) => {
      e.preventDefault();

      const { answer } = this.state;
      const { dispatch, authedUser, id} = this.props;

      dispatch(updateQuestionAnswer({
        authedUser,
        qid: id,
        answer: this.state.answer
      },this.disableSubmit));

  }

  render(){
    const { question,display } = this.props;
    const { answer, submit_disabled } = this.state;
    const { name, avatar, optionOne, optionTwo, answerOne, answerTwo,
      hasAnswered,votesOne, votesTwo, votesTotal} = question;

    return(
      <div className="container vertical">
        <div className="title">{name} asks:</div>
        {display
          ? <div className="content">
              <div className="icon regular-margin">
                <img src={avatar} alt={`Avatar of ${name}`} />
              </div>
              <div className="questionbox border-left">
                <p>Would you rather</p>
                <p>...{optionOne.text.slice(0,25)}...</p>
                <button className="view-btn" onClick={this.handleViewPoll}>View Poll</button>
              </div>
            </div>
          : hasAnswered
          ? <div className="content">
              <div className="icon icon-big">
                <img src={avatar} alt={`Avatar of ${name}`} />
              </div>
              <div className="questionbox border-left">
                <p className="results">Results</p>
                <div className={`answer-box ${answerOne? "answer" : "no-answer"}`}>
                  <p>Would you rather {optionOne.text}?</p>
                  <div className="progress-bar-bg">
                    <div className="progress-bar" style={ {width: `${votesOne * 100.0/ votesTotal}%`}}>
                      <span>{`${(votesOne * 100.0/ votesTotal).toFixed(2)}%`}</span>
                    </div>
                  </div>
                  <p>{`${votesOne} out of ${votesTotal} votes`}</p>
                </div>
                <div className={`answer-box ${answerTwo? "answer" : "no-answer"}`}>
                  <p>Would you rather {optionTwo.text}?</p>
                  <div className="progress-bar-bg">
                    <div className="progress-bar" style={ {width: `${votesTwo * 100.0/ votesTotal}%`}}>
                      <span>{`${(votesTwo * 100.0/ votesTotal).toFixed(2)}%`}</span>
                    </div>
                  </div>
                  <p>{`${votesTwo} out of ${votesTotal} votes`}</p>
                </div>
              </div>
            </div>
          : <div className="content">
              <div className="icon icon-big">
                <img src={avatar} alt={`Avatar of ${name}`} />
              </div>
              <div className="questionbox border-left">
                <p className="title-big">Would you rather</p>
                <form onSubmit={this.handleSubmit}>
                  <label>
                    <input type="radio" name="answer" value="optionOne"
                      checked = {answer === 'optionOne'} onChange = {this.handleChange}/>
                    {optionOne.text}
                  </label>
                  <label>
                    <input type="radio" name="answer" value="optionTwo"
                      checked = {answer === 'optionTwo'} onChange = {this.handleChange}/>
                    {optionTwo.text}
                  </label>
                  <button className="submit-btn" type='submit' disabled={submit_disabled}>Submit</button>
                </form>
              </div>
            </div>
        }
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, users, questions}, { id,display }) {
  const question = questions[id];
  const author = question? users[question['author']]:'';
  return {
    question: question
      ? formatQuestionInfo(question, author, authedUser)
      : null,
    authedUser
  }
}

export default withRouter(connect(mapStateToProps)(Question))
