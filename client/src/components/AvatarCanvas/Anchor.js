import Konva from 'konva'
import * as name from './classConstants'

export default class {
  constructor(x, y, positionName, layer, group) {
    this.x = x
    this.y = y
    this.positionName = positionName
    this.fill = '#666'
    this.stroke = '#ddd'
    this.layer = layer
    this.group = group
    this.anchor = this.createAnchor()
    this.addListeners()
  }

  createAnchor = () => new Konva.Circle({
    x: this.x,
    y: this.y,
    stroke: this.stroke,
    fill: this.fill,
    strokeWidth: 2,
    radius: 8,
    name: this.positionName,
    draggable: true,
    dragOnTop: false,
  })

  getAnchor = () => this.anchor

  addListeners = () => {
    this.dragMove()
    this.down()
    this.stop()
    this.hover()
    this.hoverLeave()
  }

  draw = () => {
    this.layer.draw()
  }

  dragMove = () => {
    this.anchor.on('dragmove', () => this.draw(this.update()))
  }

  down = () => {
    this.anchor.on('mousedown touchstart', () => this.draw(this.group.setDraggable(false)))
  }

  stop = () => {
    this.anchor.on('dragend', () => this.draw(this.group.setDraggable(true)))
  }

  hover = () => {
    this.anchor.on('mouseover', () => this.draw(this.anchor.setStrokeWidth(4)))
  }

  hoverLeave = () => {
    this.anchor.on('mouseout', () => this.draw(this.anchor.setStrokeWidth(2)))
  }

  update = () => {
    const group = this.group
    const topLeft = group.get(`.${ name.TOP_LEFT }`)[0]
    const topRight = group.get(`.${ name.TOP_RIGHT }`)[0]
    const bottomRight = group.get(`.${ name.BOTTOM_RIGHT }`)[0]
    const bottomLeft = group.get(`.${ name.BOTTOM_LEFT }`)[0]
    const image = group.get(name.IMAGE)[0]
    const anchorX = this.anchor.getX()
    const anchorY = this.anchor.getY()

    switch (this.anchor.getName()) {
      case name.TOP_LEFT:
        topRight.setY(anchorY)
        bottomLeft.setX(anchorX)
        break
      case name.TOP_RIGHT:
        topLeft.setY(anchorY)
        bottomRight.setX(anchorX)
        break
      case name.BOTTOM_RIGHT:
        bottomLeft.setY(anchorY)
        topRight.setX(anchorX)
        break
      case name.BOTTOM_LEFT:
        bottomRight.setY(anchorY)
        topLeft.setX(anchorX)
        break
      case name.ROTATE:
        this.layer.rotate(1)
        break
      default:
        break
    }

    image.position(topLeft.position())

    const width = topRight.getX() - topLeft.getX()
    const height = bottomLeft.getY() - topLeft.getY()

    if (width && height) {
      image.width(width)
      image.height(height)
    }
  }

}
