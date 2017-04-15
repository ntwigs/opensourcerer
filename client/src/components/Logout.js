import React, { Component } from 'react'

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
