import Konva from 'konva'

export default class {
  constructor(stage, src) {
    this.stage = stage

    this.hatLayer = new Konva.Layer()

    this.hat = new Image()
    this.hat.crossOrigin = 'anonymous'
    this.hat.src = src
  }

  destroy = () => {
    this.hatLayer.remove()
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

    // update anchor positions
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
      default:
        break;
    }

    rotate.setX(topLeft.getX() + image.width() / 2)
    rotate.setY(topLeft.getY() - image.height() / 5)
    image.position(topLeft.position())
    const width = topRight.getX() - topLeft.getX()
    const height = bottomLeft.getY() - topLeft.getY()
    if (width && height) {
      image.width(width)
      image.height(height)
    }
  }

  addAnchor = (x, y, name) => {
    const anchor = new Konva.Circle({
      x,
      y,
      stroke: '#666',
      fill: '#ddd',
      strokeWidth: 2,
      radius: 8,
      name,
      draggable: true,
      dragOnTop: false,
    })

    anchor.on('dragmove', () => {
      this.update(anchor)
      this.hatLayer.draw()
    })

    anchor.on('mousedown touchstart', () => {
      this.hatGroup.setDraggable(false)
      anchor.moveToTop()
    })

    anchor.on('dragend', () => {
      this.hatGroup.setDraggable(true)
      this.hatLayer.draw()
    })

    anchor.on('mouseover', () => {
      anchor.setStrokeWidth(4)
      this.hatStage
      this.hatLayer.draw()
    })

    anchor.on('mouseout', () => {
      anchor.setStrokeWidth(2)
      this.hatLayer.draw()
    })

    this.hatGroup.add(anchor)
  }

  render() {
    this.hatImage = new Konva.Image({
      width: this.stage.attrs.width,
      height: this.stage.attrs.height,
    })

    this.hatGroup = new Konva.Group({
      x: 0,
      y: 0,
      draggable: true,
    })

    this.hatLayer.add(this.hatGroup)
    this.hatGroup.add(this.hatImage)
    this.addAnchor(0, 0, 'topLeft')
    this.addAnchor(this.stage.attrs.width, 0, 'topRight')
    this.addAnchor(this.stage.attrs.width, this.stage.attrs.height, 'bottomRight')
    this.addAnchor(0, this.stage.attrs.height, 'bottomLeft')
    this.addAnchor(this.stage.attrs.width / 2, 0, 'rotate')

    this.hat.addEventListener('load', () => {
      this.hatImage.image(this.hat)
      this.hatLayer.draw()
    })

    this.stage.add(this.hatLayer)
  }
}
