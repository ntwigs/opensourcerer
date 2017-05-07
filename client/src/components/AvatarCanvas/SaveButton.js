import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../../redux/map/map'
import styled from 'styled-components'

class SaveButton extends Component {
  saveImage = () => {
    console.log(this.props.canvas)
    const data = this.props.canvas.toDataURL()
    this.props.avatarUpdate(data)
  }

  render() {
    return (
      <SSaveButton onClick={ this.saveImage }/>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveButton)

const SSaveButton = styled.img`
  width: 100px;
  height: 100px;
  cursor: pointer;
  background-color: turquoise;
`