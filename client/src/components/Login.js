import React, { Component } from 'react'
import queryString from 'query-string'

export default class extends Component {
  componentDidMount = () => {
    const parsedUsername = queryString.parse(this.props.location.search).username
    const username = parsedUsername || localStorage.getItem('username')

    if (username) {
      localStorage.setItem('username', username)
      this.props.history.replace({
        pathname: `/users/${ username }` 
      })
    }
  }

  render() {
    return (
      <a href='http://localhost:3001/login'>Login</a>
    )
  }
}
