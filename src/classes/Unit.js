import MultiMediator from '@voxelful/multimediator'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export class Unit {
    constructor(fun, tag) {
        this.mediator = new MultiMediator('unit')
        this.url = url
        this.tag = tag
        this.mediator.emit('existance')
        this.loaded = null
        fun((obj) => {
            this.loaded = obj
            this.mediator.emit('load', obj)
        })
    }
}