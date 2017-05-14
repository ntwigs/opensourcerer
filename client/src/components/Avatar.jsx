import React, { Component } from 'react'
import propTypes from 'prop-types'
import styled from 'styled-components'

class AvatarComponent extends Component {
  logout = () => {
    localStorage.removeItem('username')
    localStorage.removeItem('token')
    this.props.history.replace({
      pathname: '/',
    })
  }

  render() {
    return (
      <Avatar src={ this.props.url } onClick={ this.logout } />
    )
  }
}


AvatarComponent.propTypes = {
  history: ({
    replace: propTypes.func,
  }).isRequired,
  url: propTypes.string.isRequired,
}

export default AvatarComponent

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 100%;  
  margin-bottom: 30px;
  cursor: pointer;
`
