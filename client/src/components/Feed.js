import React, { Component } from 'react'
import rp from 'request-promise'
import Issue from './Issue'

export default class extends Component {
  URL = `https://api.github.com/users/${ this.props.username }/events`
  POLL_TIME = 1000 // How often to poll GitHub
  state = {
    issues: [],
    etag: undefined
  }

  componentDidMount = async () => {
    this.refreshEvents()
  }

  componentWillReceiveProps = async () => {
    this.refreshEvents()
  }

  refreshEvents = async () => {
    try {
      const userEvents = await rp(this.URL, {
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
      console.log(e)
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
    const newEvents = await rp(this.URL, {
      method: 'GET',
      json: true,
      resolveWithFullResponse: true
    })

    const obtainedNewEvent = newEvents.body.filter(issue => {
      if (!this.state.issues.includes(issue)) {
        return issue
      } else {
        return undefined
      }
    })

    this.setState({
      issues: [...obtainedNewEvent, ...this.state.issues],
      etag: newEvents.headers.etag
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

  displayIssues = () => {
    return this.state.issues.map(issue => {
      return (
        <Issue key={ issue.id } issue={ issue }/>
      )
    })
  }

  render() {
    return (
      <div>
        { this.displayIssues() }
      </div>
    )
  }
}
