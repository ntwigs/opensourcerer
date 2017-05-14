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
        <div>
          <Avatar url={ avatarUrl } history={ this.props.history } />
          <Backpack />
        </div>
        <h1>{ this.state.username }</h1>
        <h5>{ title }</h5>
        <ExperienceBarContainer>
          <h5>{ level }</h5>
          <ExperienceBar>
            <ExperiencePercentage percentage={ this.getExperienceBarWidth } />
          </ExperienceBar>
          <h5>{ level + 1 }</h5>
        </ExperienceBarContainer>
        <h3>Experience: { experience }</h3>
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
  history: propTypes.func.isRequired,
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
  padding: 25px 0;
  margin-bottom: 10px;
`

const ExperienceBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: white;
  margin: 10px 0;
`

const ExperienceBar = styled.div`
  height: 10px;
  width: 200px;
  background-color: #1e202f;
  margin: 0 10px;
  border-radius: 10px;
  overflow: hidden;
`

const ExperiencePercentage = styled.div`
  width: ${ props => props.percentage ? props.percentage : '0' }%;
  transition: width 1s;
  height: 100%;
  background-color: #6a93ff;
`