import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import propTypes from 'prop-types'
import { mapDispatchToProps, mapStateToProps } from '../redux/map/map'
import Event from './Event'
import { getEtag, getNewEvents, getInitialEvents } from '../lib/http'

class Feed extends Component {
  state = {
    events: [],
    etag: undefined,
  }

  componentDidMount = () => {
    this.POLL_TIME = 10000 // How often to poll GitHub
    this.refreshEvents()
  }

  refreshEvents = async () => {
    try {
      const userHeader = await getEtag(this.props.username, this.state.etag)
      const { etag } = userHeader.headers

      if (this.state.etag === undefined) {
        await this.fetchInitialEvents(etag)
        if (this.props.state.user.level !== 0) {
          await this.fetchNewEvents(etag)
        }
      }

      if (etag !== this.state.etag) {
        await this.fetchNewEvents(etag)
      }

      return this.restart()
    } catch (e) {
      if (e.statusCode === 404) {
        return this.props.setUserDoesNotExists()
      } else if (e.statusCode === 403) {
        return this.restart(e)
      } else if (e.statusCode === 304) {
        return this.restart()
      }
      return this.restart()
    }
  }

  fetchInitialEvents = async (etag) => {
    await this.props.updateUserData(this.props.username, etag)
      .catch(e => console.log(e))
  }

  fetchNewEvents = async (etag) => {
    try {
      const newEvents = await getNewEvents(this.props.username)

      this.setState({
        events: [...newEvents.newEvents, ...this.state.events],
        etag,
      })

      this.props.experienceUpdate(newEvents.experience)
    } catch (error) {
      console.log(error)
    }
  }

  restart = (error) => {
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

  displayEvents = () => this.state.events.map(event => (
    <Event key={ event.id } event={ event } />
  ))

  render() {
    return (
      <EventsWrapper>
        { this.displayEvents() }
      </EventsWrapper>
    )
  }
}

Feed.propTypes = {
  experienceUpdate: propTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed)

const EventsWrapper = styled.div`
  column-count: 4;
  column-gap: 0;
  counter-reset: item-counter;
`
