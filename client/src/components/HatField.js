import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../redux/map/map'
import styled, { keyframes } from 'styled-components'

class HatField extends Component {
  setHat = e => this.props.setHat(e.target.src)

  render() {
    console.log(this.props)
    return (
      <ItemSlot onClick={ this.setHat }>
        <Hat src={ this.props.hatImageSource } />
      </ItemSlot>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HatField)

const Hat = styled.img`
  height: 90%;
`

const ItemSlot = styled.div`
  width: 7rem;
  height: 7rem;
  border-radius: 2px;
  background-color: papayawhip;
  margin: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`