import React, { Component } from 'react'

export default class extends Component {
  state = {
    x: 0,
    y: 100
  }

  componentDidMount = () => {
    this.canvas = this.canvasReference
    this.ctx = this.canvas.getContext('2d')
    this.update()
  }

  clear = () => {
    this.ctx.clearRect(0, 0, 500, 500)
  }

  drawSquare = () => {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.95)'
    this.ctx.fillRect(this.state.x, this.state.y, 20, 20)
    this.setState({
      x: this.state.x + 0.5
    })
  }

  update = () => {
    this.clear()
    this.drawSquare()
    requestAnimationFrame(() => this.update())
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