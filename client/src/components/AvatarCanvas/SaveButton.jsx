import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import propTypes from 'prop-types'
import { mapDispatchToProps, mapStateToProps } from '../../redux/map/map'

class SaveButton extends Component {
  saveImage = () => {
    const data = this.props.canvas.toDataURL()
    this.props.avatarUpdate(data)
  }

  render() {
    return (
      <SSaveButton onClick={ this.saveImage } />
    )
  }
}

SaveButton.propTypes = {
  avatarUpdate: propTypes.func.isRequired,
  canvas: {
    toDataURL: propTypes.func,
  }.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveButton)

const SSaveButton = styled.img`
  width: 100px;
  height: 100px;
  cursor: pointer;
  background-color: turquoise;
`
