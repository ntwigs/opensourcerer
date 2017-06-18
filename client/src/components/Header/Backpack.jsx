import React, { Component } from 'react'
import propTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../../redux/map/map'
import { getInventory } from '../../lib/http'

class Backpack extends Component {
  openInventory = async () => {
    try {
      const inventory = await getInventory()
      this.props.openInventory(inventory)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <BackpackIcon onClick={ this.openInventory } />
    )
  }
}

Backpack.propTypes = {
  openInventory: propTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Backpack)

const BackpackIcon = styled.div`
  width: 35px;
  height: 35px;
  background-color: #6a93ff;
  border-radius: 100%;
  cursor: pointer;
`
