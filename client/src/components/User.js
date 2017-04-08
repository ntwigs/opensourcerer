import React, { Component } from 'react'
import rp from 'request-promise'
import { Link } from 'react-router-dom'

class User extends Component {
  render() {
    return (
      <Link to='http://localhost:3001/login'>Login</Link>
    )
  }
}

export default User
