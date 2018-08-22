import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import Select from 'react-select'

const colourStyles = {
  option: (styles, { value }) => {
    const { avatarURL } = value
    return {
      background: `url(${process.env.PUBLIC_URL + avatarURL}) no-repeat`,
      backgroundSize: '32px',
      backgroundPosition: '15px 3px',

      height: '38px',
      ...styles,
      paddingLeft: '60px',
      paddingTop: '10px',
      margin: '3px 0'
    };
  },
};

class Login extends Component {
  state = {
    signedInUser: ''
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { dispatch } = this.props;
    const { signedInUser } = this.state;

    if(signedInUser !== '') {
      dispatch(setAuthedUser(signedInUser))
    }
  }

  handleChange = (selectedOption) => {
    this.setState({
      signedInUser: selectedOption.value.id
    })
  }

  render() {
    const { users } = this.props;

    return (
      <div className='container vertical'>
        <div className='title'>
          <p>Welcome to the Would You Rather App!</p>
          <p>Please sign in to continue</p>
        </div>
        <div className='content vertical padding-10'>
          <div className='logo'>
            <img src={process.env.PUBLIC_URL +'/favicon.ico'} alt='logo'/>
          </div>
          <div className='text'>
            <p className='center dark-mint'>Sign in</p>
            <form onSubmit={this.handleSubmit}>
              <Select
                onChange={this.handleChange}
                placeholder={'Select User'}
                styles={colourStyles}
                options={
                  Object.keys(users).map((id)=>(
                    {
                      value: users[id],
                      label: users[id].name,
                    }
                  ))
                }
              />
              <button className='submit-btn'>Sign In</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps ({ users }) {
  return {
    users
  }
}


export default connect(mapStateToProps)(Login);
