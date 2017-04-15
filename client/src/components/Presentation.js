import React, { Component } from 'react'
import rp from 'request-promise'

export default class extends Component {
  state = {
    username: '',
    level: undefined
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
        level: user.level  
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
        <h3>Level: { this.state.level }</h3>
      </section>
    )
  }
}