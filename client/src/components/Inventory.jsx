import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../redux/map/map'
import HatField from './HatField'

class Inventory extends Component {
  getUsername = () => (localStorage.getItem('username'))

  getSection = () => {
    if (this.props.state.inventory.open) {
      return (
        <InventorySection>
          <Items>
            <LeftSection>
              <h1>{ this.getUsername() }</h1>
            </LeftSection>
            <RightSection>
              <TrophyShelf />
              <ItemShelf>
                <HatField hatImageSource={ 'http://localhost:3001/static/hats/0.png' } />
                <HatField hatImageSource={ 'http://vignette3.wikia.nocookie.net/fallout/images/5/5e/Pre-War_hat.png/revision/latest?cb=20110326175739' } />
              </ItemShelf>
            </RightSection>
          </Items>
        </InventorySection>
      )
    }
    return <div />
  }

  render() {
    return this.getSection()
  }
}

Inventory.propTypes = {
  state: {
    inventory: {
      open: propTypes.bool.isRequired,
    },
  }.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Inventory)

const ItemShelf = styled.div`
  width: 100%;
  background-color: rebeccapurple;
  display: flex;
  flex-wrap: wrap;
`

const TrophyShelf = styled.div`
  width: 100%;
  height: 100%;
  max-height: 120px;
  margin-bottom: 10px;
  background-color: yellow;
`

const Avatar = styled.img`
  width: 100%;
  background-color: green;
`

const LeftSection = styled.div`
  width: 100%;
  height: 100%;
  background-color: red;
  display: flex;
  flex-direction: column;
  padding: 10px;
`

const RightSection = styled.div`
  width: 100%;
  height: 100%;
  background-color: blue;
  display: flex;
  flex-direction: column;
  padding: 10px;
`

const fadeIn = keyframes`
  from {
    background-color: rgba(0, 0, 0, 0.0); 
  }

  to {
    background-color: rgba(0, 0, 0, 0.5); 
  }
`

const flyIn = keyframes`
  from {
    transform: translateY(-100vh);
  }

  to {
    transform: translateY(0vh);
  }
`

const InventorySection = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${ fadeIn } 700ms ease-in-out 1 forwards;
`

const Items = styled.section`
  width: 75%;
  height: 40rem;
  background-color: white;
  animation: ${ flyIn } 400ms ease-out 1 forwards;
  display: flex;
  flex-direction: row;
  border-radius: 2px;
  overflow: hidden;
`
