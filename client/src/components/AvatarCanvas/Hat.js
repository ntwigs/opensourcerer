import Konva from 'konva'
import Anchor from './Anchor'
import * as name from './classConstants'

export default class {
  constructor(stage, src) {
    this.stage = stage
    this.createHatLayer()
    this.setHat(src)
  }

  createHatLayer = () => {
    this.hatLayer = new Konva.Layer({
      offset: {
        x: 200,
        y: 200,
      },
    })
  }

  setHat = (src) => {
    this.hat = new Image()
    this.hat.crossOrigin = 'anonymous'
    this.hat.src = src
  }

  destroy = () => {
    this.hatLayer.remove()
  }

  render() {
    this.createHatImage()
    this.createHatGroup()
    this.hatLayer.add(this.hatGroup)
    this.hatGroup.add(this.hatImage)
    this.createAnchors()
    this.stage.add(this.hatLayer)
  }

  createHatImage = () => {
    this.hatImage = new Konva.Image({
      width: this.stage.attrs.width,
      height: this.stage.attrs.height,
    })

    this.hat.addEventListener('load', () => {
      this.hatImage.image(this.hat)
      this.hatLayer.draw()
    })
  }

  createHatGroup = () => {
    this.hatGroup = new Konva.Group({
      x: 0,
      y: 0,
      draggable: true,
    })
  }

  createAnchors = () => {
    const anchors = [
      new Anchor(0, 0, name.TOP_LEFT, this.hatLayer, this.hatGroup),
      new Anchor(this.stage.attrs.width, 0, name.TOP_RIGHT, this.hatLayer, this.hatGroup),
      new Anchor(this.stage.attrs.width, this.stage.attrs.height, name.BOTTOM_RIGHT, this.hatLayer, this.hatGroup),
      new Anchor(0, this.stage.attrs.height, name.BOTTOM_LEFT, this.hatLayer, this.hatGroup),
      new Anchor(this.stage.attrs.width / 2, 0, name.ROTATE, this.hatLayer, this.hatGroup),
    ]

    anchors.forEach((anchor) => {
      this.hatGroup.add(anchor.getAnchor())
    })
  }

}
