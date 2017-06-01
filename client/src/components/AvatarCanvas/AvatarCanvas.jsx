import React, { Component } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import Konva from 'konva'
import { mapDispatchToProps, mapStateToProps } from '../../redux/map/map'
import Hat from './Hat'
import SaveButton from './SaveButton'
import AvatarBackground from './AvatarBackground'

class AvatarCanvas extends Component {
  componentWillMount = () => {
    this.width = 400
    this.height = 400
    this.mx = 0
    this.my = 0
    this.hat = null
  }

  componentDidMount = () => {
    this.stage = new Konva.Stage({
      container: 'stageDiv',
      width: this.width,
      height: this.height,
    })

    new AvatarBackground(this.stage, this.props.state.user.avatarUrl).render()
  }

  componentWillReceiveProps = (props) => {
    const { hat, shouldRenderHat } = props.state.avatarCanvas
    if (shouldRenderHat) {
      console.log('CREATE')
      this.hat = new Hat(this.stage, hat)
      this.hat.render()
    } else {
      console.log('DESTROY')
      this.hat.destroy()
    }
  }

  render() {
    return (
      <div id='stageDiv' />
    )
  }
}

AvatarCanvas.propTypes = {
  state: {
    avatarCanvas: {
      hat: propTypes.string,
      shouldRenderHat: propTypes.bool,
    },
  }.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(AvatarCanvas)
