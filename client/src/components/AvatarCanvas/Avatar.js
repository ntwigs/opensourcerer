export default class {
  constructor(x, y, ctx, src) {
    this.x = x
    this.y = y
    this.ctx = ctx
    this.avatar = new Image()
    this.avatar.src = src
    this.render()
  }

  render() {
    this.ctx.drawImage(this.avatar, this.x, this.y)
  }
}