import QueueEventEmitter from '@voxelful/queueeventemitter'
import { UIElement } from './UIElement';
import MultiMediator from '@voxelful/multimediator'
import { ThreeDefaults } from './ThreeDefaults';

export class UI extends QueueEventEmitter {
    constructor() {
        super()
        this.element = new UIElement()
    }
    append(el) {
        this.element.dom.appendChild(el)
    }
}

export class ButtonLeft extends UI {
    constructor() {
        super()
        this.el = document.createElement('button')
        this.el.innerHTML = `
      <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 18L9 12L15 6" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `
        new ThreeDefaults().on('update', this.update.bind(this))

        this.el.className = 'slider_btn_left'
        this.el.style.position = 'fixed'
        this.el.style.top = '50%'
        this.el.style.left = '50px'
        this.el.style.transform = 'translate(0, -50%)'
        this.el.style.padding = '10px'
        this.el.style.height = '60px'
        this.el.style.width = '60px'
        this.el.style.border = '2px solid #fff'
        this.el.style.borderRadius = '100px'
        this.el.style.background = '#fff0'
        this.el.style.pointerEvents = 'auto'

        this.append(this.el)
        this.el.addEventListener('click', this.click.bind(this))
    }
    click() {
        new MultiMediator('controls').emit('prev_slide')
    }
    update() {
        if (window.innerWidth < 800) {
            this.el.style.left = '10px'
        } else {
            this.el.style.left = '50px'
        }
    }
}

export class ButtonRight extends UI {
    constructor() {
        super()
        this.el = document.createElement('button')
        this.el.innerHTML = `
      <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 18L15 12L9 6" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `
        new ThreeDefaults().on('update', this.update.bind(this))

        this.el.className = 'slider_btn_right'
        this.el.style.position = 'fixed'
        this.el.style.top = '50%'
        this.el.style.right = '50px'
        this.el.style.transform = 'translate(0, -50%)'
        this.el.style.padding = '10px'
        this.el.style.height = '60px'
        this.el.style.width = '60px'
        this.el.style.border = '2px solid #fff'
        this.el.style.borderRadius = '100px'
        this.el.style.background = '#fff0'
        this.el.style.pointerEvents = 'auto'

        this.append(this.el)
        this.el.addEventListener('click', this.click.bind(this))
    }
    click() {
        new MultiMediator('controls').emit('next_slide')
    }
    update() {
        if (window.innerWidth < 800) {
            this.el.style.right = '10px'
        } else {
            this.el.style.right = '50px'
        }
    }
}

