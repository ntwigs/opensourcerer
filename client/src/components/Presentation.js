import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../redux/map/map'
import rp from 'request-promise'
import styled from 'styled-components'
import Logout from './Logout'

class Presentation extends Component {
  state = {
    username: ''
  }

  componentDidMount = async () => {
    const user = await rp(`http://localhost:3001/users/${ this.props.username }`, {
      json: true
    })

    if (!this.props.userExists) {
      this.setState({
        username: `The user ${ this.props.username } does not exist`
      })
    } else if (user) {
      this.setState({
        username: user.username,
        experience: user.experience
      })
    } else {
      this.setState({
        username: `The user ${ this.props.username } is not a Sourcerer`,
      })
    }
  }

  render() {
    return (
      <Header>
        <Avatar src='https://avatars2.githubusercontent.com/u/14088342?v=3&u=ea614e5e818df01226059095a1708b57c387284b&s=400'></Avatar>
        <h1>{ this.state.username }</h1>
        <h5>Sourcerer</h5>
        { localStorage.getItem('username') && <Logout history={ this.props.history } /> }
        <ExperienceBarContainer>
          <ExperienceBar>
            <ExperiencePercentage></ExperiencePercentage>
          </ExperienceBar>
        </ExperienceBarContainer>
        <h3>Experience: { this.props.state.user.experience }</h3>
      </Header>
    )
  }
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
`

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 100%;  
  margin-bottom: 30px;
`

const ExperienceBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: white;
`

const ExperienceBar = styled.div`
  height: 10px;
  width: 200px;
  background-color: #1e202f;
  margin: 0 10px;
`

const ExperiencePercentage = styled.div`
  width: 75%;
  height: 100%;
  background-color: #6a93ff;
`