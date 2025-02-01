import QueueEventEmitter from '@voxelful/queueeventemitter'
import MultiMediator from '@voxelful/multimediator'

export class Slider extends QueueEventEmitter {
    constructor() {
        super()
        this.controls = new MultiMediator('controls')
        this.slides = [
            new MultiMediator('slide_1'),
            new MultiMediator('slide_2'),
            new MultiMediator('slide_3'),
            new MultiMediator('slide_4'),
            new MultiMediator('slide_5'),
        ]
        this.current = 0;
        this.controls.on('next_slide', this.next.bind(this))
        this.controls.on('prev_slide', this.prev.bind(this))
        this.init()
    }
    init() {
        this.slides[this.current].emit('init')
    }
    next() {
        const cs = this.slides[this.current]
        if (this.current + 1 >= this.slides.length) {
            cs.emit('blocking_right')
            return
        }
        this.current++
        const ns = this.slides[this.current]
        ns.emit('appear_right')
        cs.emit('disappear_left')
        console.log(ns)
        console.log(this.current)
    }
    prev() {
        const cs = this.slides[this.current] 
        if (this.current - 1 <= -1) {
            cs.emit('blocking_left')
            return
        }
        console.log(cs)  
        this.current--
        const ns = this.slides[this.current]
        ns.emit('appear_left')
        cs.emit('disappear_right')
        console.log(ns)
        console.log(this.current)
    }
}