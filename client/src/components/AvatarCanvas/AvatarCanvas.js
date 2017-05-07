import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../../redux/map/map'
import Hat from './Hat'
import SaveButton from './SaveButton'
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
    
    if (this.props.state.avatarCanvas.hat && this.props.state.avatarCanvas.shouldRenderHat) {
      this.placeHat()
      this.props.toggleHatRender()
    }

    if (this.hat) {
      this.renderHat()
    }

    requestAnimationFrame(this.update)
  }

  placeHat = () => {
    this.hat ?
      this.hat = new Hat(this.hat.x, this.hat.y, this.ctx, this.props.state.avatarCanvas.hat) : 
      this.hat = new Hat(0, 0, this.ctx, this.props.state.avatarCanvas.hat)
  }

  clear = () => this.ctx.clearRect(0, 0, this.width, this.height)

  renderHat = () => this.hat.render()

  selectHat = e => {
    const x = e.nativeEvent.offsetX
    const y = e.nativeEvent.offsetY 

    if (this.hat && this.isInField(x, y)) {
      this.mx = e.nativeEvent.offsetX - this.hat.x
      this.my = e.nativeEvent.offsetY - this.hat.y
      this.hat.selected = true
    }
  }

  deselectHat = () => {
    if (this.hat)
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

  getSave = () => {
    if (this.canvasReference) 
      return <SaveButton canvas={ this.canvasReference } />
    
  }

  render() {
    return (
      <div>
        <canvas
          ref={ canvas => this.canvasReference = canvas }
          width={ 500 }
          height={ 500 }
          onMouseDown={ this.selectHat }
          onMouseMove={ this.moveHat }
          onMouseUp={ this.deselectHat }
        />
        { this.getSave() }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AvatarCanvas)
