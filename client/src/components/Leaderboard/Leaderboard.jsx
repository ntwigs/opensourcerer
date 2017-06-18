import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../../redux/map/map'

class Leaderboard extends Component {
  componentDidMount = () => {
    this.props.setLeaderboard()
  }

  getLeaderboard = (user, index) =>
    <PlaceContainer>
      <h1>{ index + 1 }</h1>
      <ContentContainer>
        <Section>
          <img alt='avatar' src={ user.avatar } />
          <h5>{ user.username }</h5>
          <p>I have issues</p>
        </Section>
        <Section>
          <p>{ `Level ${ user.level }` }</p>
          <p>{ `Experience ${ user.experience }` }</p>
        </Section>
      </ContentContainer>
    </PlaceContainer>

  render() {
    const { positions } = this.props.state.leaderboard

    return (
      <MainContainer>
        <h1>Leaderboard</h1>
        { positions.map(this.getLeaderboard) }
      </MainContainer>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard)


const MainContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`

const PlaceContainer = styled.div`
  margin-top: 30px;
  width: 80%;
  height: 50px;
  display: flex;
  background: #282840;
  align-items: center;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);

  & :first-child {
    margin: 0 13px;
  }
`

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  margin: 0 25px;
`

const Section = styled.section`
  display: flex;
  align-items: center;

  & img {
    width: 40px;
    border-radius: 100%;
  }

  & > img, p {
    margin: 0 30px;
  }
`
