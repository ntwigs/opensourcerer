import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../redux/map/map'

class Inventory extends Component {
  getSection = () => {
    if (this.props.state.inventory.open) {
      return (
        <InventorySection>
          <InventorySection  />
        </InventorySection>
      )
    }

    return <div></div>
  }


  render() {



    return this.getSection()
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Inventory)

const InventorySection = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); 
  z-index: 1;
`