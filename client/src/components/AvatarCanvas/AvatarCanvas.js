import React, { Component } from 'react'

export default class extends Component {
  componentDidMount = () => {
    this.canvas = this.canvasReference
    this.ctx = this.canvas.getContext('2d')
    this.update()
  }

  clear = () => {
    this.ctx.clearRect(0, 0, 500, 500)
  }
  
  update = () => {
    this.clear()

    // Animation goes here

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