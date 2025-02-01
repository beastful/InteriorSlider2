import { AnimatedMesh } from "./AnimatedMesh"

export class ConfiguredMesh extends AnimatedMesh {
    constructor(mediator) {
      super(mediator)
    }
    appear_right() {
      this.fadeInRight()
      console.log('Forom configured mesh')
    }
    disappear_left() {
      this.fadeOutLeft()
      console.log('Forom configured mesh')
    }
    appear_left() {
      this.fadeInLeft()
      console.log('Forom configured mesh')
    }
    disappear_right() {
      this.fadeOutRight()
      console.log('Forom configured mesh')
    }
    blocking_right() {
      console.log('blocking right')
    }
    blocking_left() {
      console.log('blocking left')
    }
  }
  