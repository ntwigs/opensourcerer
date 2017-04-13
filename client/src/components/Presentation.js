import React, { Component } from 'react'
import rp from 'request-promise'

export default class extends Component {
  state = {
    username: ''
  }

  componentDidMount = async () => {
    const user = await rp(`http://localhost:3001/users/${ this.props.username }`, {
      json: true
    })

    if (this.props.exists) {
      this.setState({ username: `The user ${ this.props.username } does not exist` })
    } else if (user) {
      this.setState({ username: user.username })
    } else {
      this.setState({ username: `The user ${ this.props.username } is not a Sourcerer` })
    }
  }

  render() {
    return (
      <section>
        <h1>{ this.state.username }</h1>
      </section>
    )
  }
}