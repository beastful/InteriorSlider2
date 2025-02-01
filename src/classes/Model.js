import QueueEventEmitter from '@voxelful/queueeventemitter'

export class Model extends QueueEventEmitter {
    constructor(channel, ...units) {
        super()
        this.channel = channel
        this.units = units
        this.channel.on('init', this.init.bind(this))
        this.channel.on('appear_right', this.appear_right.bind(this))
        this.channel.on('disappear_left', this.disappear_left.bind(this))
        this.channel.on('appear_left', this.appear_left.bind(this))
        this.channel.on('disappear_right', this.disappear_right.bind(this))
        this.channel.on('blocking_right', this.blocking_right.bind(this))
        this.channel.on('blocking_left', this.blocking_left.bind(this))
    }
    init() {
        console.log('init')
    }
    appear_right() {
        console.log('appear right')
    }
    disappear_left() {
        console.log('disappear left')
    }
    appear_left() {
        console.log('appear left')
    }
    disappear_right() {
        console.log('disappear left')
    }
    blocking_right() {
        console.log('blocking right')
    }
    blocking_left() {
        console.log('blocking left')
    }
}
