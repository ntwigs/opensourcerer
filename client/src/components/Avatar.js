import React, { Component } from 'react'
import styled from 'styled-components'

export default class extends Component {
  logout = () => {
    localStorage.removeItem('username')
    localStorage.removeItem('token')
    this.props.history.replace({
      pathname: `/`
    })
  }

  render() {
    return (
      <Avatar src={ this.props.url } onClick={ this.logout } />
    )
  }
}

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 100%;  
  margin-bottom: 30px;
  cursor: pointer;
`