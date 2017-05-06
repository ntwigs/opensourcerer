import React, { Component } from 'react'
import Hat from './Hat'

export default class extends Component {
  componentDidMount = () => {
    this.canvas = this.canvasReference
    this.ctx = this.canvas.getContext('2d')
    this.hat = new Hat(0, 0, this.ctx)
    this.update()
  }

  clear = () => {
    this.ctx.clearRect(0, 0, 500, 500)
  }
  
  update = () => {
    this.clear()

    if (this.hat) {
      this.renderHat()
    }

    requestAnimationFrame(() => this.update())
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