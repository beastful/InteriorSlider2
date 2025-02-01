import QueueEventEmitter from '@voxelful/queueeventemitter'

export class UIElement extends QueueEventEmitter {
    constructor() {
        super()
        if (UIElement.instance != null) return UIElement.instance
        UIElement.instance = this
        this.dom = document.createElement('div')
        this.dom.style.position = 'fixed'
        this.dom.style.zIndex = '2'
        this.dom.style.top = 0
        this.dom.style.left = 0
        this.dom.style.width = '100%'
        this.dom.style.height = '100vh'
        // this.dom.style.background = '#0000FF11'
        this.dom.style.pointerEvents = 'none'
        
        document.body.appendChild(this.dom)
    }
}