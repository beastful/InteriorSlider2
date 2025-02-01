import { Chip } from './Chip'

export class HideChip extends Chip {
    constructor(...args) {
      super(...args)
      this.invisible_icon = '<svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#000"><path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/></svg>'
      this.visible_icon = '<svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#000"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/></svg>'
  
      this.body = document.createElement('div')
      this.angle = document.createElement('div')
      this.chip.appendChild(this.body)
      this.chip.appendChild(this.angle)
  
      {
        this.chip.style.display = 'flex'
        this.chip.style.flexDirection = 'column'
        this.chip.style.alignItems = 'center'
  
        this.body.style.width = '50px'
        this.body.style.height = '50px'
        this.body.style.background = '#fff'
        this.body.style.borderRadius = '5px'
        this.body.style.display = 'flex'
        this.body.style.justifyContent = 'center'
        this.body.style.alignItems = 'center'
  
        this.angle.style.borderTop = '15px solid #fff'
        this.angle.style.borderLeft = '15px solid #fff0'
        this.angle.style.borderRight = '15px solid #fff0'
        this.angle.style.borderBottom = '15px solid #fff0'
        this.angle.style.width = '1px'
        this.angle.style.height = '1px'
        this.angle.style.marginTop = '10px'
      }
  
      this.body.addEventListener('click', this.click.bind(this))
  
      this.hidden = false
      this.body.innerHTML = this.visible_icon
  
      this.channel.on('disappear_right', this.cleanup.bind(this))
      this.channel.on('disappear_left', this.cleanup.bind(this))
  
  
    }
    click() {
      this.toggle()
    }
    toggle() {
      if (!this.hidden) {
        this.parent.model_opacity.setTarget({
          opacity: 0,
        })
        this.body.innerHTML = this.invisible_icon
        this.hidden = !this.hidden
        return
      }
      this.parent.model_opacity.setTarget({
        opacity: 1,
      })
      this.body.innerHTML = this.visible_icon
      this.hidden = !this.hidden
    }
    cleanup() {
      if (this.hidden == true) {
        this.body.innerHTML = this.visible_icon
        this.hidden = false
      }
    }
  }