import { ThreeDefaults } from "./ThreeDefaults"
import QueueEventEmitter from '@voxelful/queueeventemitter'

export class Pos extends QueueEventEmitter {
  constructor(fun, vector) {
    super()
    this.fps = new ThreeDefaults()
    this.target = Object.assign({}, vector)
    this.pos = Object.assign({}, vector)
    this.fun = fun
    this.correction = {}
    for (let key in this.pos) {
      this.correction[key] = 0
    }
    this.fps.on('update', this.update.bind(this))
  }
  setTarget(vector) {
    this.target = Object.assign({}, vector)
  }
  setImmidiate(vector) {
    this.pos = Object.assign({}, vector)
    this.target = vector
  }
  setFunction(fun) {
    this.fun = fun
  }
  setCorrection(vector) {
    this.correction = Object.assign({}, vector)
  }
  update() {
    for (let key in this.pos) {
      this.pos[key] = this.fun(this.pos[key], this.target[key]) + this.correction[key]
    }
    // if (this.target != this.pos) this.emit('change', this.pos)
    this.emit('update', this.pos)
  }
}
