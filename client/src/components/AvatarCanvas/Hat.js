import Konva from 'konva'
import Anchor from './Anchor'

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
      new Anchor(0, 0, 'topLeft', this.hatLayer, this.hatGroup, this.update),
      new Anchor(this.stage.attrs.width, 0, 'topRight', this.hatLayer, this.hatGroup, this.update),
      new Anchor(this.stage.attrs.width, this.stage.attrs.height, 'bottomRight', this.hatLayer, this.hatGroup, this.update),
      new Anchor(0, this.stage.attrs.height, 'bottomLeft', this.hatLayer, this.hatGroup, this.update),
      new Anchor(this.stage.attrs.width / 2, 0, 'rotate', this.hatLayer, this.hatGroup, this.update),
    ]

    anchors.forEach((anchor) => {
      this.hatGroup.add(anchor.getAnchor())
    })
  }

  update = (activeAnchor) => {
    const group = this.hatGroup
    const topLeft = group.get('.topLeft')[0]
    const topRight = group.get('.topRight')[0]
    const bottomRight = group.get('.bottomRight')[0]
    const bottomLeft = group.get('.bottomLeft')[0]
    const rotate = group.get('.rotate')[0]
    const image = group.get('Image')[0]
    const anchorX = activeAnchor.getX()
    const anchorY = activeAnchor.getY()

    switch (activeAnchor.getName()) {
      case 'topLeft':
        topRight.setY(anchorY)
        bottomLeft.setX(anchorX)
        break
      case 'topRight':
        topLeft.setY(anchorY)
        bottomRight.setX(anchorX)
        break
      case 'bottomRight':
        bottomLeft.setY(anchorY)
        topRight.setX(anchorX)
        break
      case 'bottomLeft':
        bottomRight.setY(anchorY)
        topLeft.setX(anchorX)
        break
      case 'rotate':
        this.layer.rotate(1)
        break
      default:
        break
    }

    const centerX = topLeft.getX() + image.width()
    const centerY = topLeft.getY() - image.height()

    rotate.setX(centerX / 2)
    rotate.setY(centerY / 5)

    image.position(topLeft.position())

    const width = topRight.getX() - topLeft.getX()
    const height = bottomLeft.getY() - topLeft.getY()

    if (width && height) {
      image.width(width)
      image.height(height)
    }
  }
}
