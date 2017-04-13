import React, { Component } from 'react'
import rp from 'request-promise'
import Feed from './Feed'

export default class extends Component {
  componentDidMount = async () => {
    const { username } = this.props.match.params
    const user = await rp(`http://localhost:3001/users/${ username }`, {
      json: true
    })
  }

  render() {

    return (
      <section>
        <h1>{ this.props.match.params.username }</h1>
        <Feed username={ this.props.match.params.username } />
      </section>
    )
  }
}