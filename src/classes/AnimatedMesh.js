import { Model } from './Model'
import { ThreeDefaults } from './ThreeDefaults'
import { Pos } from './Pos'
import { lerp } from './utils'

export class AnimatedMesh extends Model {
    constructor(mediator) {
      super(mediator)
      this.settings = {
        right: {
          x: 30000,
          y: 0,
          z: 0,
        },
        top: {
          x: 0,
          y: 30000,
          z: 0,
        },
        left: {
          x: -30000,
          y: 0,
          z: 0,
        },
        default: {
          x: 0,
          y: 0,
          z: 0,
        },
        transparent: {
          opacity: 0,
        },
        visible: {
          opacity: 1
        }
      }
    }
    config(config) {
      this.settings = config
    }
    useModel(model) {
      // new ThreeDefaults().scene.add(model)
      this.model_position = new Pos((s, e) => {
        return lerp(s, e, 0.1)
      }, this.settings.top)
  
     
      this.model_opacity = new Pos((s, e) => {
        return lerp(s, e, 0.1)
      }, {
        opacity: 0
      })

      if(this.model.name.split('_').includes('glass')) {
        this.settings.visible.opacity = 0.5
      }
  
      this.model_position.on('update', (vector) => {
        model.position.x = vector.x
        model.position.y = vector.y
        model.position.z = vector.z
      })
  
      this.model_opacity.on('update', (vector) => {
        // model.material.opacity = vector.opacity
        if(vector.opacity <= 0.1) {
          if( model.visible ) model.visible = false
        } else {
          if( !model.visible ) model.visible = true
        }
      })
  
      this.hideImmidiate()
      
      this.on('show_initial', () => {
        this.fadeInTop()
      })
    }
    init() {
      this.emit('show_initial')
    }
    fadeInLeft() {
      this.model_opacity.setFunction((s, e) => {
        return lerp(s, e, 0.1)
      })
      this.model_position.setFunction((s, e) => {
        return lerp(s, e, 0.1)
      })
      this.model_position.setImmidiate(this.settings.left)
      this.model_position.setTarget(this.settings.default)
      this.model_opacity.setImmidiate(this.settings.transparent)
      this.model_opacity.setTarget(this.settings.visible)
    }
    fadeInRight() {
      this.model_opacity.setFunction((s, e) => {
        return lerp(s, e, 0.1)
      })
      this.model_position.setFunction((s, e) => {
        return lerp(s, e, 0.1)
      })
      this.model_position.setImmidiate(this.settings.right)
      this.model_position.setTarget(this.settings.default)
      this.model_opacity.setImmidiate(this.settings.transparent)
      this.model_opacity.setTarget(this.settings.visible)
    }
    fadeOutLeft() {
      this.model_opacity.setFunction((s, e) => {
        return lerp(s, e, 0.1)
      })
      this.model_position.setFunction((s, e) => {
        return lerp(s, e, 0.1)
      })
      this.model_position.setTarget(this.settings.left)
      this.model_opacity.setTarget(this.settings.transparent)
    }
    fadeOutRight() {
      this.model_opacity.setFunction((s, e) => {
        return lerp(s, e, 0.1)
      })
      this.model_position.setFunction((s, e) => {
        return lerp(s, e, 0.1)
      })
      this.model_position.setTarget(this.settings.right)
      this.model_opacity.setTarget(this.settings.transparent)
    }
    fadeInTop() {
      this.model_opacity.setFunction((s, e) => {
        return lerp(s, e, 0.1)
      })
      this.model_position.setFunction((s, e) => {
        return lerp(s, e, 0.1)
      })
      this.model_position.setImmidiate(this.settings.top)
      this.model_opacity.setImmidiate(this.settings.transparent)
      this.model_position.setTarget(this.settings.default)
      this.model_opacity.setTarget(this.settings.visible)
    }
    shake() {}
    hideImmidiate() {
      this.model_position.setImmidiate(this.settings.top)
      this.model_opacity.setImmidiate(this.settings.transparent)
    }
  }
  