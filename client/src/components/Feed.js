import React, { Component } from 'react'
import rp from 'request-promise'
import Event from './Event'

export default class extends Component {
  POLL_TIME = 1000 // How often to poll GitHub
  state = {
    events: [],
    etag: undefined
  }

  // For leveling up test
  componentDidMount = async () => {
    const newEvents = await rp(`http://localhost:3001/levelup`, {
      method: 'POST',
      json: true,
      body: {
        username: this.props.username
      }
    })
  }

  componentWillReceiveProps = async () => {
    this.refreshEvents()
  }

  refreshEvents = async () => {
    try {
      const userEvents = await rp(`https://api.github.com/users/${ this.props.username }/events`, {
        method: 'HEAD',
        headers: {
          'If-None-Match': this.state.etag
        },
        json: true,
        resolveWithFullResponse: true
      })

      if (userEvents.headers.etag !== this.state.etag) {
        await this.fetchNewEvents(userEvents.headers.etag)
      }

      this.restart()
    } catch(e) {
      if (e.statusCode === 404) {
        return this.props.setUserDoesNotExists()
      } else if (e.statusCode === 403) { 
        return this.restart(e)
      } else if (e.statusCode === 304) {
        return this.restart()
      }
      this.refreshEvents()
    }
  }

  fetchNewEvents = async etag => {
    const newEvents = await rp(`http://localhost:3001/levelup`, {
      method: 'POST',
      body: {
        username: this.props.username
      },
      json: true,
      resolveWithFullResponse: true
    })
    console.log(newEvents)
    const obtainedNewEvent = newEvents.body.filter(event => {
      if (!this.state.events.includes(event)) {
        return event
      } else {
        return undefined
      }
    })

    this.setState({
      issues: [...obtainedNewEvent, ...this.state.events],
      etag
    })
  }

  restart = error => {
    const timeUntilRequest = error ?
      error.response.headers['x-ratelimit-reset'] :
      this.POLL_TIME 

    setTimeout(() => {
      this.refreshEvents()
    }, timeUntilRequest)
  }

  timeLeft = (time) => {
    const until = new Date(time * 1000).getTime() // To milliseconds
    const current = new Date().getTime()
    return until - current
  }

  displayEvents = () => {
    return this.state.events.map(event => {
      return (
        <Event key={ event.id } issue={ event }/>
      )
    })
  }

  render() {
    return (
      <div>
        { this.displayEvents() }
      </div>
    )
  }
}
