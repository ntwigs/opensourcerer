export default class {
  constructor(x, y, ctx) {
    this.x = x
    this.y = y
    this.ctx = ctx
  }

  render() {
    this.ctx.fillStyle = '#FF00FF'
    this.ctx.fillRect(this.x, this.y, 100, 100)
  }
}