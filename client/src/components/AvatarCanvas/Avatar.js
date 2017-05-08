export default class {
  constructor(x, y, height, width, ctx, src) {
    this.x = x
    this.y = y
    this.height = height
    this.width = width
    this.ctx = ctx
    this.avatar = new Image()
    this.avatar.crossOrigin = 'anonymous'
    this.avatar.src = src
    this.render()
  }

  render() {
    this.ctx.drawImage(this.avatar, this.x, this.y, this.height, this.width)
  }
}