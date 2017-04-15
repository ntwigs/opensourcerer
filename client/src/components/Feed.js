import React, { Component } from 'react'
import rp from 'request-promise'
import Event from './Event'

export default class extends Component {
  POLL_TIME = 1000 // How often to poll GitHub
  state = {
    events: [],
    etag: undefined
  }

  componentDidMount = () => {
    this.refreshEvents()
  }

  refreshEvents = async () => {
    try {
      const userEvents = await rp(`https://api.github.com/users/${ this.props.username }/events`, {
        method: 'HEAD',
        headers: {
          'If-None-Match': this.state.etag,
        },
        json: true,
        resolveWithFullResponse: true
      })



      if (this.state.etag === undefined) {
        this.fetchInitialEvents()
      }

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

  fetchInitialEvents = async () => {
    const events = await rp(`http://localhost:3001/events/${ this.props.username }`, {
      method: 'GET',
      json: true
    })
    this.setState({
      events: events.organizedEvents
    })
  }

  fetchNewEvents = async etag => {
    try {
      const newEvents = await rp(`http://localhost:3001/levelup`, {
        method: 'POST',
        body: {
          username: this.props.username
        },
        json: true
      })

      this.setState({
        events: [...newEvents.newEvents, ...this.state.events],
        etag
      })

    } catch(error) {
      console.log(error)
    }
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
        <Event key={ event.id } event={ event }/>
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
