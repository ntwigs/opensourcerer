import Konva from 'konva'

export default class {
  constructor(x, y, name, layer, group, update) {
    this.x = x
    this.y = y
    this.name = name
    this.update = update
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
    name: this.name,
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
    this.anchor.on('dragmove', () => this.draw(this.update(this.anchor)))
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
}
