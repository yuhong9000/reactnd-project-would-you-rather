import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { updateNewQuestion } from '../actions/questions'

class NewQuestion extends Component{

  handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch, authedUser} = this.props;

    if(this.optionOneText.value === '' || this.optionTwoText.value === ''){
      alert('Do not leave input fields empty!');
      return;
    }else if (this.optionOneText.value === this.optionTwoText.value){
      alert('Options cannot be identical!');
      return;
    }

    dispatch(updateNewQuestion({
      author: authedUser,
      optionOneText: this.optionOneText.value,
      optionTwoText: this.optionTwoText.value,
    }));

    this.optionOneText.value = '';
    this.optionTwoText.value = '';

    this.props.history.push('/');

  }

  render(){
    return(
      <div className='container vertical margin-top'>
        <p className='title-center'>Create New Question</p>
        <div className='content vertical'>
            <div className='nq-box'>
              <p>Complete the question:</p>
            </div>
            <div className='nq-box'>
              <div>Would you rather...</div>
              <form onSubmit={this.handleSubmit}>
                <input type='text' placeholder='Enter Option One Text Here'
                  ref={input => this.optionOneText = input}/>
                <div className='flexbox'>
                  <div className='line flex-grow-1'></div>
                  <div>OR</div>
                  <div className='line flex-grow-1'></div>
                </div>
                <input type='text' placeholder='Enter Option Two Text Here'
                  ref={input => this.optionTwoText = input}/>
                <button className='submit-btn'>Submit</button>
              </form>
            </div>
          </div>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    authedUser,
  }
}

export default withRouter(connect(mapStateToProps)(NewQuestion))
