import React, { Component } from 'react'
import Presentation from './Presentation'
import Feed from './Feed'

export default class extends Component {
  state = {
    userExists: true
  }
  
  setUserDoesNotExists = () => {
    this.setState({
      userExists: false
    })
  }

  render() {
    return (
      <section>
        <Presentation userExists={ this.state.userExists } username={ this.props.match.params.username } />
        <Feed setUserDoesNotExists={ this.setUserDoesNotExists } username={ this.props.match.params.username } />
      </section>
    )
  }
}