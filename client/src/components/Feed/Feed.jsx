import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import propTypes from 'prop-types'
import { mapDispatchToProps, mapStateToProps } from '../../redux/map/map'
import Event from './Event'
import { getEtag } from '../../lib/http'
import { joinRoom } from '../../lib/connect'

class Feed extends Component {
  state = {
    events: [],
    etag: undefined,
  }

  componentWillMount = () => {
    joinRoom()
  }

  displayEvents = ({ events, id }) => {
    return <Event key={ id } event={ events } />
  }

  render() {
    const { events } = this.props.state.user

    return (
      <EventsWrapper>
        { events.map(this.displayEvents) }
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
