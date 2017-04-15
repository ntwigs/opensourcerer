import React, { Component } from 'react'

export default class extends Component {
  render() {
    const { id, repo, type, created_at } = this.props.event

    return (
      <div>
        <h4>{ type }</h4>
        <h6>{ repo }</h6>
        <h5>{ id }</h5>
        <h6>{ created_at }</h6>
      </div>
    )
  }
}