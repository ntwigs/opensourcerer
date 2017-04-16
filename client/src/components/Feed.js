import React, { Component } from 'react'
import rp from 'request-promise'
import styled from 'styled-components'
import Event from './Event'
import { FOR_DEV } from '../secret'

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
          Authorization: `Bearer ${ FOR_DEV }`
        },
        json: true,
        resolveWithFullResponse: true
      })

      if (this.state.etag === undefined) {
        await this.fetchInitialEvents(userEvents.headers.etag)
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
      this.restart()
    }
  }

  fetchInitialEvents = async etag => {
    try {
      const events = await rp(`http://localhost:3001/events/${ this.props.username }`, {
        method: 'GET',
        json: true
      })

      this.setState({
        events: events.organizedEvents,
        etag
      })

    } catch(error) {
      console.log(error)
    }
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
        events: [...newEvents.events, ...this.state.events],
        etag
      })

      this.props.experienceGain()
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

  timeLeft = time => {
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
      <EventsWrapper>
        { this.displayEvents() }
      </EventsWrapper>
    )
  }
}



// const EventsWrapper = styled.div`
//   width: 35%;
//   display: inline-block;
//   align-self: center;
// `

const EventsWrapper = styled.div`
  column-count: 4;
  column-gap: 0;
  counter-reset: item-counter;
`