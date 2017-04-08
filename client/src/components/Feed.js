import React, { Component } from 'react'
import rp from 'request-promise'
import { Link } from 'react-router-dom'

class User extends Component {
  state = {
    issues: [],
    etag: undefined
  }

  componentWillReceiveProps = async () => {
    this.refreshEvents()
  }

  refreshEvents = async () => {
    try {
      const userEvents = await rp(`https://api.github.com/users/${ this.props.username }/events`, {
        headers: {
          'If-None-Match': this.state.etag
        },
        json: true,
        resolveWithFullResponse: true
      })

      if (userEvents.headers.etag !== this.state.etag) {
        const newEvents = userEvents.body.filter(issue => {
          if (!this.state.issues.includes(issue)) {
            return issue
          }
        })

        this.setState({
          issues: [...this.state.issues, ...newEvents],
          etag: userEvents.headers.etag
        })
      }

      this.restart()
      
    } catch(e) {
      console.log(e)
      if (e.response.statusCode === 403 ) {
        return this.restart(this.timeLeft(e.response.headers['x-ratelimit-reset']))
      }

      this.refreshEvents()
    }
  }

  replaceEtag = etag => {
    
  }

  restart = (time = 60000) => {
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
