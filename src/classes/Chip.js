import QueueEventEmitter from '@voxelful/queueeventemitter'
import { Pos } from './Pos'
import { ThreeDefaults } from './ThreeDefaults'
import { lerp } from './utils'
import { Vector3 } from 'three'

const getCenterPoint = (mesh) => {
  const geometry = mesh.geometry;
  geometry.computeBoundingBox();
  const center = new Vector3();
  geometry.boundingBox.getCenter( center );
  mesh.localToWorld( center );
  return center;
}

export class Chip extends QueueEventEmitter {
    constructor(model, parent) {
      super()
      this.parent = parent
      this.channel = parent.channel
      this.model = model
      this.chip_pos = new Pos((s, e) => {
        return lerp(s, e, 0.1)
      }, {
        top: 0,
        left: 0,
      })
      this.chip = document.createElement('div')
      this.chip.style.position = 'fixed'
      this.chip.style.top = '0'
      this.chip.style.left = '0'
      this.chip.style.transform = 'translate(-50%, -120%)'
      this.chip.style.visibility = 'hidden'
      document.body.appendChild(this.chip)
  
      new ThreeDefaults().on('update', this.update.bind(this))
  
      this.chip_pos.on('update', (vector) => {
        this.chip.style.top = vector.top + 'px'
        this.chip.style.left = vector.left + 'px'
      })
  
      this.channel.on('init', this.init.bind(this))
      this.channel.on('appear_right', this.appear_right.bind(this))
      this.channel.on('disappear_left', this.disappear_left.bind(this))
      this.channel.on('appear_left', this.appear_left.bind(this))
      this.channel.on('disappear_right', this.disappear_right.bind(this))
    }
    update() {
      this.sp_vector = getCenterPoint(this.model).project(new ThreeDefaults().camera)
      this.nsp_vector = new Vector3(
        (this.sp_vector.x + 1) * window.innerWidth / 2,
        -(this.sp_vector.y - 1) * window.innerHeight / 2,
        0
      )
      this.chip_pos.setTarget({
        top: this.nsp_vector.y,
        left: this.nsp_vector.x
      })
    }
    init() {
      this.chip.style.visibility = 'visible'
    }
    appear_left() {
      this.chip.style.visibility = 'visible'
    }
    disappear_left() {
      this.chip.style.visibility = 'hidden'
    }
    appear_right() {
      this.chip.style.visibility = 'visible'
    }
    disappear_right() {
      this.chip.style.visibility = 'hidden'
    }
  }