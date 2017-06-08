import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import propTypes from 'prop-types'
import { mapDispatchToProps, mapStateToProps } from '../redux/map/map'
import Avatar from './Avatar'
import Backpack from './Backpack'
import { getUserInformation } from '../lib/http'

class Presentation extends Component {
  state = {
    username: '',
  }

  componentDidMount = async () => {
    const user = await getUserInformation(this.props.username)

    if (user) {
      this.setState({
        username: user.username,
        experience: user.experience,
      })
    } else {
      this.setState({
        username: `${ this.props.username }`,
      })
    }
  }

  getExperienceBarWidth = () => {
    const percentage = (this.props.state.user.level * 2000) * 100
    const experience = this.props.state.user.experience
    return experience / percentage
  }

  render() {
    const { avatarUrl, experience, level, title } = this.props.state.user

    return (
      <Header>
        <Card>
          <Top>
            <Left>
              <UserContainer>
                <Avatar url={ avatarUrl } />
                <Hat alt='hat' src='http://localhost:3001/static/hats/0.png' />
              </UserContainer>
              <TextContainer>
                <Text big>NorthernTwig</Text>
                <Text light>{ title }</Text>
              </TextContainer>
            </Left>
            <Right>
              <Icon className='fa fa-suitcase fa-2x' aria-hidden='true' />
              <Icon className='fa fa-trophy fa-2x' aria-hidden='true' />
            </Right>
          </Top>
          <Bottom>
            <Text>Level { level }</Text>
            <ExperienceBar experience={ experience }>
              <div />
            </ExperienceBar>
          </Bottom>
        </Card>
      </Header>
    )
  }
}

Presentation.propTypes = {
  state: {
    user: {
      level: propTypes.number,
      experience: propTypes.number,
      title: propTypes.string,
      avatarUrl: propTypes.string,
    },
  }.isRequired,
  username: propTypes.string.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Presentation)

const Header = styled.header`
  height: 40%;
  min-height: 250px;
  width: 100%;
  background-color: #282840;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.07), 0 1px 5px 0 rgba(0,0,0,0.06), 0 3px 1px -2px rgba(0,0,0,0.1);
  padding: 77px 0 10px 0;
  margin-bottom: 10px;
`

const Card = styled.div`
  width: 500px;
  height: 200px;
  background-color: #282840;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  border-radius: 2px;
`

const Top = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
`

const Left = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
`

const Right = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 20px;
  width: 100%;
  flex-direction: column;
`

const Text = styled.h6`
  color: ${ props => props.light ? 'rgba(222, 221, 237, 0.55)' : 'rgba(222, 221, 237, 0.85)' };
  font-size: ${ props => props.big ? 1.5 : 1 }rem;
  font-weight: 200;
`

const TextContainer = styled.div`
  margin: 10px;
`

const UserContainer = styled.div`
  position: relative;
`

const Hat = styled.img`
  position: absolute;
  left: Calc(50% - 50px);
  bottom: 80px;
  width: 100px;
`

const Bottom = styled.div`
  height: 50%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const ExperienceBar = styled.div`
  width: 90%;
  height: 7px;
  background-color: #1e202f;
  border-radius: 2px;
  overflow: hidden;
  margin-top: 10px;

  & div {
    width: ${ props => props.experience ? props.experience : 0 }%;
    height: 100%;
    background-color: #6a93ff;
  }
`

const Icon = styled.i`
  color: rgba(222, 221, 237, 0.55);
  transition: all 50ms;
  margin: 10px;
  
  &:hover {
    color: rgba(222, 221, 237, 0.85);
    cursor: pointer;
    transition: all 200ms;
  }
`
