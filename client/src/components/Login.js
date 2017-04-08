import React, { Component } from 'react'
import rp from 'request-promise'

class Login extends Component {
  componentDidMount = () => {
    const token = this.props.location.query.token || localStorage.getItem('jwt')

    if (token) {
      localStorage.setItem('jwt', token)
      this.props.router.replace({
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
