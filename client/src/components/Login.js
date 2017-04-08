import React, { Component } from 'react'
import FeedParser from 'feedparser'
import rp from 'request-promise'
import { Link } from 'react-router-dom'

class Login extends Component {
  render() {
    return (
      <Link to='http://localhost:3000/login'>Login</Link>
    )
  }
}

export default Login
