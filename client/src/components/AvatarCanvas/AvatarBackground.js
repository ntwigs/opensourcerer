import Konva from 'konva'

export default class {
  constructor(stage, src) {
    this.stage = stage

    this.backgroundLayer = new Konva.Layer()

    this.avatar = new Image()
    this.avatar.crossOrigin = 'anonymous'
    this.avatar.src = src
  }

  render() {
    this.avatar.addEventListener('load', () => {
      this.backgroundImage = new Konva.Image({
        x: 0,
        y: 0,
        image: this.avatar,
        width: this.stage.attrs.width,
        height: this.stage.attrs.height,
      })

      this.backgroundLayer.add(this.backgroundImage)
      this.stage.add(this.backgroundLayer)
    })
  }
}
