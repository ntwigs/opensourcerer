import React, { Component } from 'react'
import { History } from 'react-router-dom'

export default class extends Component {
  logout = () => {
    localStorage.removeItem('username')
    this.props.history.replace({
      pathname: `/`
    })
  }

  render() {
    return (
      <button onClick={ this.logout }>Logout</button>
    )
  }
}
