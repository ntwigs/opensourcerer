import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../../redux/map/map'
import Hat from './Hat'
import Avatar from './Avatar'

class AvatarCanvas extends Component {
  componentDidMount = () => {
    this.canvas = this.canvasReference
    this.ctx = this.canvas.getContext('2d')
    this.avatar = new Avatar(0, 0, this.ctx, this.props.state.user.avatarUrl)
    this.width = 500
    this.height = 500
    this.mx = 0
    this.my = 0
    this.update()
  }

  update = () => {
    this.clear()
    this.avatar.render()
    
    if (this.props.state.avatarCanvas.hat && !this.props.state.avatarCanvas.isHatRendered) {
      this.hat = new Hat(0, 0, this.ctx, this.props.state.avatarCanvas.hat)
      this.props.isHatRendered()
    }

    if (this.hat) {
      this.renderHat()
    }

    requestAnimationFrame(this.update)
  }

  clear = () => this.ctx.clearRect(0, 0, this.width, this.height)

  renderHat = () => this.hat.render()

  selectHat = e => {
    this.mx = e.nativeEvent.offsetX - this.hat.x
    this.my = e.nativeEvent.offsetY - this.hat.y
    const x = e.nativeEvent.offsetX
    const y = e.nativeEvent.offsetY 

    if (this.hat && this.isInField(x, y)) {
      this.hat.selected = true
    }
  }

  deselectHat = () => {
    this.hat.selected = false
  }

  isInField = (x, y) => {
    return x > this.hat.x && x < this.hat.x + this.hat.hat.width && y > this.hat.y && y < this.hat.y + this.hat.hat.height 
  }

  moveHat = e => {

    const x = e.nativeEvent.offsetX
    const y = e.nativeEvent.offsetY

    if (this.hat && this.hat.selected) {
      this.hat.x = x - this.mx
      this.hat.y = y - this.my
    } 
  }

  render() {
    return (
      <canvas
        ref={ canvas => this.canvasReference = canvas }
        width={ 500 }
        height={ 500 }
        onMouseDown={ this.selectHat }
        onMouseMove={ this.moveHat }
        onMouseUp={ this.deselectHat }
      />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AvatarCanvas)
