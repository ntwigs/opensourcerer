import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../redux/map/map'

class Backpack extends Component {
  render() {
    return (
      <BackpackIcon />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Backpack)

const BackpackIcon = styled.div`
  width: 35px;
  height: 35px;
  background-color: #6a93ff;
  border-radius: 100%;
`