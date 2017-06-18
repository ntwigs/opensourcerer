import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import propTypes from 'prop-types'
import { mapDispatchToProps, mapStateToProps } from '../../redux/map/map'

class HatField extends Component {
  setHat = (e) => {
    this.props.state.avatarCanvas.hat === e.target.src ?
      this.props.toggleHatRender() :
      this.props.setHat(e.target.src) && this.props.toggleHatRender()
  }

  render() {
    return (
      <ItemSlot onClick={ this.setHat }>
        <Hat src={ this.props.hatImageSource } />
      </ItemSlot>
    )
  }
}

HatField.propTypes = {
  setHat: propTypes.func.isRequired,
  toggleHatRender: propTypes.func.isRequired,
  hatImageSource: propTypes.string.isRequired,
  state: {
    avatarCanvas: {
      src: propTypes.string,
    },
  }.isRequired,
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
