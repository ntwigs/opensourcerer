export default class {
  constructor(x, y, ctx, src) {
    this.x = x
    this.y = y
    this.displayTools = false
    this.ctx = ctx
    this.hat = new Image()
    this.hat.crossOrigin = 'anonymous'
    this.hat.src = src
    this.selected = false
  }

  render() {
    this.ctx.drawImage(this.hat, this.x, this.y)
  }
}
