import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../redux/map/map'

class Inventory extends Component {
  render() {
    console.log(this.props.state.inventory.open)
    return (
      <section>
        { this.props.state.inventory.open && <InventorySection  /> }
      </section>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Inventory)

const InventorySection = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: red;
`