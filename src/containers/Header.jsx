import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class Header extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      return [
        <li className='nav-item' key={1}>
          <Link className='nav-link' to='/inwards'>Inwards</Link>
        </li>,
        <li className='nav-item' key={2}>
          <Link className='nav-link' to='/admin'>Admin</Link>
        </li>,
        <li className='nav-item' key={3}>
          <Link className='nav-link' to='/sign-out'>Sign Out</Link>
        </li>
      ]
    } else {
      return [
        <li className='nav-item' key={1}>
          <Link className='nav-link' to='/sign-in'>Sign In</Link>
        </li>,
        <li className='nav-item' key={2}>
          <Link className='nav-link' to='/sign-up'>Sign Up</Link>
        </li>
      ]
    }
  }

  render() {
    return (

      <nav className="navbar navbar-toggleable-md navbar-light bg-faded ">
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link to='/' className='navbar-brand'>Medicare+</Link>
        <div className="collapse navbar-collapse">
          <ul className='navbar-nav '>
            { this.renderLinks() }
          </ul>
        </div>
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps)(Header)
