import React, { Component } from 'react'
import Presentation from './Presentation'
import Feed from './Feed'

export default class extends Component {
  state = {
    userExists: true,
    experience: 0
  }
  
  setUserDoesNotExists = () => {
    this.setState({
      userExists: false
    })
  }

  setExperience = experience => {
    this.setState({
      experience
    })
  }

  setText = () => {
    if (this.state.userExists) {
      return <Presentation 
        userExists={ this.state.userExists }
        username={ this.props.match.params.username }
        experience={ this.state.experience }
      />
    }
    return (<h1>Hey, that name is available for usage!</h1>)
  }

  render() {
    return (
      <section>
        { this.setText() }
        <Feed 
          setUserDoesNotExists={ this.setUserDoesNotExists }
          username={ this.props.match.params.username }
          experienceGain={ this.setExperience }
        />
      </section>
    )
  }
}