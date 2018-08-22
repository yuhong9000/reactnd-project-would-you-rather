import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'
import { withRouter } from 'react-router-dom'

class Nav extends Component {

  handleLogout = ()=> {
    const { history, dispatch } = this.props;
    dispatch(setAuthedUser(''));
    history.push('/');
  }

  render(){
    const { avatar, name } = this.props;

    return (
      <nav className='nav'>
        <ul>
          <li>
            <NavLink to='/' exact activeClassName='active' className='inactive'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/add'  activeClassName='active' className='inactive'>
              New Question
            </NavLink>
          </li>
          <li>
            <NavLink to='/leaderboard' activeClassName='active' className='inactive'>
              Leader Board
            </NavLink>
          </li>
          <li>
            <div className="icon">
              <span>{name}</span>
              <img src={avatar} alt={`Avatar of ${name}`} />
            </div>
          </li>
          <li>
            <a className='inactive' onClick={this.handleLogout}>
              Log out
            </a>
          </li>
        </ul>

        <hr />
      </nav>
    )
  }
}

export default withRouter(connect()(Nav));
