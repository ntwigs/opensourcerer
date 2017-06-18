import React, { Component } from 'react'
import styled from 'styled-components'

export default class extends Component {
  render() {
    return (
      <img src={ this.props.url } onClick={ this.logout } />
    )
  }
}
