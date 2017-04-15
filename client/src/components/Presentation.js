import React, { Component } from 'react'
import rp from 'request-promise'
import Logout from './Logout'

export default class extends Component {
  state = {
    username: '',
    experience: this.props.experience
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
      <section>
        <h1>{ this.state.username }</h1>
        { localStorage.getItem('username') && <Logout history={ this.props.history } /> }
        <h3>Experience: { this.state.experience }</h3>
      </section>
    )
  }
}