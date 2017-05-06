import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../../redux/map/map'
import Hat from './Hat'
import Avatar from './Avatar'

class AvatarCanvas extends Component {
  componentDidMount = () => {
    this.canvas = this.canvasReference
    this.ctx = this.canvas.getContext('2d')
    this.hat = new Hat(0, 0, this.ctx)
    this.avatar = new Avatar(0, 0, this.ctx, this.props.state.user.avatarUrl)
    this.width = 500
    this.height = 500
    this.update()
  }

  update = () => {
    this.clear()
    this.avatar.render()
    
    if (this.hat) {
      this.renderHat()
    }

    requestAnimationFrame(() => this.update())
  }

  clear = () => {
    this.ctx.clearRect(0, 0, this.width, this.height)
  }

  renderHat = () => {
    this.hat.render()
  }

  render() {
    return (
      <canvas
        ref={ canvas => this.canvasReference = canvas }
        width={ 500 }
        height={ 500 }
      />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AvatarCanvas)
