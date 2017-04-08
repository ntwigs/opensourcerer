import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import rp from 'request-promise'
import queryString from 'query-string'

class Login extends Component {
  componentDidMount = () => {
    const parsedToken = queryString.parse(this.props.location.search).token
    const token = parsedToken || localStorage.getItem('jwt')
    
    if (token) {
      localStorage.setItem('jwt', token)
      this.props.history.replace({
        pathname: `/users/northerntwig` 
      })
    }
  }

  render() {
    return (
      <a href='http://localhost:3001/login'>Login</a>
    )
  }
}

export default Login
