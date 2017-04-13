import React, { Component } from 'react'
import rp from 'request-promise'
import { Link } from 'react-router-dom'

class User extends Component {
  URL = `https://api.github.com/users/${ this.props.username }/events`
  state = {
    issues: [],
    etag: undefined
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
      if (e.statusCode === 403) {
        return this.restart(this.timeLeft(e.headers['x-ratelimit-reset']))
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
      }
    })

    this.setState({
      issues: [...obtainedNewEvent, ...this.state.issues],
      etag: newEvents.headers.etag
    })
  }

  restart = (time = 60) => {
    setTimeout(() => {
      this.refreshEvents()
    }, time)
  }

  timeLeft = (time) => {
    const until = new Date(time * 1000).getTime()
    const current = new Date().getTime()
    return until - current
  }

  displayIssues = () => {
    return this.state.issues.map(issue => {
      return (
        <div key={ issue.id }>
          <h4>{ issue.type }</h4>
          <h5>{ issue.id }</h5>
          <h6>{ issue.created_at }</h6>
        </div>
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

export default User
