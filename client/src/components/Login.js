import React, { Component } from 'react'
import queryString from 'query-string'

export default class extends Component {
  componentDidMount = () => {
    const { username, token } = queryString.parse(this.props.location.search)

    if (username && token) {
      localStorage.setItem('username', username)
      localStorage.setItem('token', token)
      
      this.props.history.replace({
        pathname: `/users/${ username }`
      })
    }
  }

  render() {
    return (
      <a href='http://localhost:3001/login'>Become a Sourcerer</a>
    )
  }
}
